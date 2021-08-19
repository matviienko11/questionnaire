import {Component, Input, OnInit} from '@angular/core';
import {Answer, Question} from "../../interfaces/question.interface";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {

  @Input() question!: Question;
  @Input() isAnswerable: boolean = false;
  @Input() isManagement: boolean = false;

  constructor(
    private questionService: QuestionsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    this.questionService.deleteQuestion(id)
  }

  onEdit(question: Question) {
    this.questionService.questionToEdit = question;
    this.router.navigate([`edit/${question.id}`])
  }

  onAnswerSelect(question: any, id: string) {
    const answer = question.answers.find((i: Answer) => i.id === id);

    this.questionService.answerQuestion(answer.id, question);
  }

  showMe(q: any) {
    console.log(q)
  }

  move(question: Question) {
    question.isAnswered = false;
    this.questionService.editQuestion(question.id, question)
  }

}
