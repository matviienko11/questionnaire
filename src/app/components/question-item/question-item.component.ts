import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../interfaces/question.interface";
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

  constructor(
    private questionService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    this.questionService.deleteQuestion(id)
  }

  onEdit(question: Question) {
    this.questionService.questionToEdit = question;
    this.router.navigate([`edit/${question.id}`])
  }

  onAnswerSelect(answer: any) {
    console.log(answer)
  }

}
