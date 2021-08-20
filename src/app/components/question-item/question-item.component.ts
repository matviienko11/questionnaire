import {Component, Input, OnInit} from '@angular/core';
import {Answer, Question} from "../../interfaces/question.interface";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {editQuestion, removeQuestion} from "../../store/questions.actions";

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {

  @Input() question!: Question;
  @Input() isAnswerable: boolean = false;
  @Input() isManagement: boolean = false;
  answerToOpenQ: string;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    this.store.dispatch(removeQuestion({id}));
    this.questionService.deleteQuestion(id);
  }

  onEdit(question: Question) {
    this.questionService.questionToEdit = question;
    this.router.navigate([`edit/${question.id}`])
  }

  onAnswerSelect(question: any, id: string) {
    const answer = question.answers.find((i: Answer) => i.id === id);
    this.questionService.answerQuestion(answer.id, question);
  }

  move(questionToMove: Question) {
    const question = {...questionToMove, isAnswered: false}
    this.questionService.editQuestion(question.id, question)
  }

  handleAnswerToOpenQ(question: Question) {
    this.questionService.answerOpenQuestion(question, this.answerToOpenQ);
  }

}
