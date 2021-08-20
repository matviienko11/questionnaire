import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {Question} from "../../interfaces/question.interface";
import {loadQuestions} from "../../store/questions.actions";
import {selectQuestions} from "../../store/questions.selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  allQuestions!: Question[];
  unanswered: Question[] = [];
  answered: Question[] = []

  constructor(
    private questionService: QuestionsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    // try {
      this.store.dispatch(loadQuestions())
      this.store.select(selectQuestions).subscribe(res => {
        this.unanswered = res.filter(q => !q.isAnswered);
        this.answered = res.filter(q => q.isAnswered)
      })
      // this.questionService.getQuestions().subscribe(data => this.allQuestions = data);
      // this.unanswered = this.allQuestions.filter(q => !q.isAnswered);
      // this.answered = this.allQuestions.filter(q => q.isAnswered)
    // } catch (e) {
    //   console.log(e);
    // }
  }

}
