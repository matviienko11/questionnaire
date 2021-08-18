import { Injectable } from '@angular/core';
import {Answer, Question} from "../interfaces/question.interface";
import {v4 as uuidv4} from 'uuid';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  questions: Question[] = [];
  questionToEdit!: Question;

  saveQuestion(question: Question) {
    let questionArr = localStorage.getItem("questions");
    const newQuestion = {
      ...question,
      id: uuidv4(),
      isAnswered: false,
      createdAt: new Date()
    }
    if(questionArr) {
      const parsedArr = JSON.parse(questionArr);
      parsedArr.push(newQuestion);
      localStorage.setItem("questions", JSON.stringify(parsedArr))
    } else {
      this.questions.push(newQuestion);
      localStorage.setItem("questions", JSON.stringify(this.questions))
    }

  }

  getQuestions(): Observable<Question[]> {
    let questionArr = localStorage.getItem("questions");
    if(questionArr) {
      return of(JSON.parse(questionArr));
    } else {
      throw Error("Sorry, no questions")
    }
  }

  getQuestionById(id: string) {
    let questionArr = localStorage.getItem("questions");
    if(questionArr) {
      const parsedArr = JSON.parse(questionArr);
      return parsedArr.find((i: Question) => i.id === id)
    } else {
      throw Error("Sorry, such question does not exist")
    }
  }

  deleteQuestion(id: string) {
    const questionArr = localStorage.getItem("questions");
    if(questionArr) {
      console.log("hello")
      const parsedArr = JSON.parse(questionArr);
      const newArr = parsedArr.filter((i: any) => i.id !== id)
      localStorage.setItem("questions", JSON.stringify(newArr))
      // this.getQuestions();
    }
  }

  answerQuestion(id: string, question: Question) {
    const questionArr = localStorage.getItem("questions");
    if(questionArr) {
      const parsedArr = JSON.parse(questionArr);
      const parsedQuestion = parsedArr.find((i: any) => i.id === question.id);
      const answer = parsedQuestion.answers.find((i: any) => i.id === id)
      if(answer.isCorrect) {
        const newArr = parsedArr.filter((i: any) => i.id !== question.id)
        const newQuestion = {
          ...question,
          isAnswered: true
        }
        newArr.push(newQuestion);
        localStorage.setItem("questions", JSON.stringify(newArr))
      }

    }
  }

}
