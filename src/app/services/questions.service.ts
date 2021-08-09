import { Injectable } from '@angular/core';
import {Question} from "../interfaces/question.interface";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  questions: Question[] = [];

  saveQuestion(question: Question) {
    this.questions.push(question);
    localStorage.setItem("questions", JSON.stringify(this.questions))
  }
}
