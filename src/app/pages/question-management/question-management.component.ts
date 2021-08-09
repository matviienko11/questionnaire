import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {Question} from "../../interfaces/question.interface";
import {Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  questions: Question[] = [];
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private questionService: QuestionsService
  ) { }

  ngOnInit(): void {
    try {
      this.questions = this.questionService.getQuestions();
    } catch (e) {
      this.isError = true;
      this.errorMessage = e.message;
    }


  }

}
