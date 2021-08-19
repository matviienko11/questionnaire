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
  length: number;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2, 5, 10];
  pageIndex: number = 0;

  constructor(
    private questionService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    try {
      this.Questions$.subscribe(data => {
        this.length = data.length;
        this.questions = [...data].slice(0, this.pageSize)
      });
    } catch (e) {
      this.isError = true;
      this.errorMessage = e.message;
    }
  }

  toCreate() {
    this.router.navigate(['create'])
  }

  handlePagination(e: any) {
    if(this.pageSize !== e.pageSize){
      this.pageIndex = 0;
    } else {
      this.pageIndex = e.index;
    }
    this.pageSize = e.pageSize
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.Questions$.pipe(
      map(
        data => {
          this.pageIndex = 0;
          this.questions = [...data].slice(start, end)
        }
      )
    )
      .subscribe()
  }

  private get Questions$() {
    return this.questionService.getQuestions()
  }


}
