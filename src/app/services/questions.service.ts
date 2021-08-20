import { Injectable } from '@angular/core';
import {Answer, Question} from "../interfaces/question.interface";
import {v4 as uuidv4} from 'uuid';
import {BehaviorSubject, Observable, of} from "rxjs";
import {editQuestion} from "../store/questions.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private store: Store) { }

  questions: Question[] = [];
  questionToEdit!: Question;
  questionArr = localStorage.getItem("questions");


  saveQuestion(question: Question) {
    const newQuestion = {
      ...question,
      id: uuidv4(),
      isAnswered: false,
      createdAt: new Date()
    }
    if(this.questionArr) {
      const parsedArr = JSON.parse(this.questionArr);
      parsedArr.push(newQuestion);
      localStorage.setItem("questions", JSON.stringify(parsedArr))
    } else {
      this.questions.push(newQuestion);
      localStorage.setItem("questions", JSON.stringify(this.questions))
    }

  }

  getQuestions(): Observable<Question[]> {
    if(this.questionArr) {
      return of(JSON.parse(this.questionArr));
    } else {
      throw Error("Sorry, no questions")
    }
  }

  getQuestionById(id: string) {
    if(this.questionArr) {
      const parsedArr = JSON.parse(this.questionArr);
      return parsedArr.find((i: Question) => i.id === id)
    } else {
      throw Error("Sorry, such question does not exist")
    }
  }

  deleteQuestion(id: string) {
    if(this.questionArr) {
      console.log("hello")
      const parsedArr = JSON.parse(this.questionArr);
      const newArr = parsedArr.filter((i: any) => i.id !== id)
      localStorage.setItem("questions", JSON.stringify(newArr))
    }
  }

  editQuestion(id: string, questiontoEdit: any) {
    if(this.questionArr) {
      const parsedArr = JSON.parse(this.questionArr);
      const parsedQuestion = parsedArr.find((i: any) => i.id === id);
      const newArr = parsedArr.filter((i: any) => i.id !== id)
      const question = {
        ...parsedQuestion,
        body: questiontoEdit.body,
        type: questiontoEdit.type,
        isAnswered: questiontoEdit.isAnswered,
        answers: questiontoEdit.answers
      }
      newArr.push(question);
      this.store.dispatch(editQuestion({question}))

      localStorage.setItem("questions", JSON.stringify(newArr))
    }
  }

  answerQuestion(id: string, questionToAnswer: Question) {
    if(this.questionArr) {
      const parsedArr = JSON.parse(this.questionArr);
      const parsedQuestion = parsedArr.find((i: any) => i.id === questionToAnswer.id);
      const answer = parsedQuestion.answers.find((i: any) => i.id === id)
      if(answer.isCorrect) {
        const newArr = parsedArr.filter((i: any) => i.id !== questionToAnswer.id)
        const question = {
          ...questionToAnswer,
          isAnswered: true
        }
        newArr.push(question);
        this.store.dispatch(editQuestion({question}))
        localStorage.setItem("questions", JSON.stringify(newArr))
      }
    }
  }
  answerOpenQuestion(questionToAnswer: Question, answer: string) {
    if(this.questionArr) {
      const parsedArr = JSON.parse(this.questionArr);
      const parsedQuestion = parsedArr.find((i: any) => i.id === questionToAnswer.id);
      const correctAnswer = parsedQuestion.answers[0].answer;
      if(correctAnswer === answer) {
        const newArr = parsedArr.filter((i: any) => i.id !== questionToAnswer.id)
        const question = {
          ...questionToAnswer,
          isAnswered: true
        }
        newArr.push(question);
        this.store.dispatch(editQuestion({question}))
        localStorage.setItem("questions", JSON.stringify(newArr))
      }
    }

  }

}
