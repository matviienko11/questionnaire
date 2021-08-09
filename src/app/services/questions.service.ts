import { Injectable } from '@angular/core';
import {Question} from "../interfaces/question.interface";
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
    const newQuestion = {
      ...question,
      id: uuidv4(),
      isAnswered: false,
      createdAt: new Date()
    }
    this.questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(this.questions))
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
      const parsedArr = JSON.parse(questionArr);
      const newArr = parsedArr.filter((i: any) => i.id !== id)
      localStorage.setItem("questions", JSON.stringify(newArr))
      this.getQuestions();
    }
  }

}
