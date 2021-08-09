import { Injectable } from '@angular/core';
import {Question} from "../interfaces/question.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  questions: Question[] = [];

  saveQuestion(question: Question) {
    const newQuestion = {
      ...question,
      isAnswered: false,
      createdAt: new Date()
    }
    this.questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(this.questions))
  }

  getQuestions() {
    const questionArr = localStorage.getItem("questions");
    if(questionArr) {
      return JSON.parse(questionArr);
    } else {
      throw Error("Sorry, no questions")
    }

  }
}
