import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {Question} from "../../interfaces/question.interface";
import {Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  questions!: Question[];
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private questionService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('onInit')
    try {
      this.questionService.getQuestions().subscribe(data => this.questions = data)
    } catch (e) {
      this.isError = true;
      this.errorMessage = e.message;
    }
  }

  toCreate() {
    this.router.navigate(['create'])
  }


}
