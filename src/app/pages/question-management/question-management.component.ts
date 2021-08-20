import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {Question} from "../../interfaces/question.interface";
import {Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectQuestions} from "../../store/questions.selectors";
import {loadQuestions} from "../../store/questions.actions";

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
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    try {
      this.store.dispatch(loadQuestions())
      this.store.select(selectQuestions).subscribe(res => {
        this.length = res.length;
        this.questions = res.slice(0, this.pageSize);
      })
    } catch (e) {
      console.log(e)
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
          this.questions = data.slice(start, end)
        }
      )
    )
      .subscribe()
  }

  private get Questions$() {
    return this.store.select(selectQuestions)
  }


}
