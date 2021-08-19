import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionsService} from "../../services/questions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {minLength} from "../../../utils/validators";
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  form: FormGroup;
  answer: string;
  openAnswer: string;
  idToEdit: string = '';
  @Input() isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.isEdit) {
      this.form = this.fb.group({
        body: ['', Validators.required],
        type: ['', Validators.required],
        answers: this.fb.array([])
      })
    } else {
      this.activatedRoute.params.subscribe(data => this.idToEdit = data.id)
      const editableQuestion = this.questionService.getQuestionById(this.idToEdit);
      if(editableQuestion.type === "Open question") {
        this.openAnswer = editableQuestion.answers[0].answer;
        this.form = this.fb.group({
          body: [editableQuestion.body],
          type: [editableQuestion.type],
          answers: this.fb.array([{
            id: editableQuestion.answers[0].id,
            answer: editableQuestion.answers[0].answer,
            isCorrect: editableQuestion.answers[0].isCorrect
          }])
        })
        return;

      }
      this.form = this.fb.group({
        body: [editableQuestion.body],
        type: [editableQuestion.type],
        answers: this.fb.array(editableQuestion.answers)
      })
    }
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    if(this.openAnswer) {
      const answer = {
        id: uuidv4(),
        answer: this.openAnswer,
        isCorrect: false
      }
      formData.answers.push(answer)
    }
    this.questionService.saveQuestion(formData);
    this.form.reset();
    this.router.navigate(['management'])
  }

  addAnswer() {
    if(!this.answer) return;
    const answers = this.form.controls.answers as FormArray;
    if(this.form.controls.answers.value.length >= 4) {
      window.alert('You cannot add more answers')
    } else {
      const answerControl = new FormControl({
        id: uuidv4(),
        answer: this.answer,
        isCorrect: false
      })
      answers.push(this.fb.group(answerControl.value))
    }
    this.answer = '';
  }

  removeAnswer(index: number) {
    const answersArr = this.form.controls.answers as FormArray;
    answersArr.removeAt(index)
  }

  makeCorrect(i: any) {
    const answersArr = this.form.controls.answers as FormArray;
    const ansItem = answersArr.at(i).value
    answersArr.at(i).patchValue({isCorrect: !ansItem.isCorrect})
  }

  show(item: any) {
    console.log(item)
  }

  onQuestionEdit() {
    const formData = this.form.getRawValue();
    if(formData.type === "Open question") {
      formData.answers[0].answer = this.openAnswer
      return this.questionService.editQuestion(this.idToEdit, formData);
    }
    this.questionService.editQuestion(this.idToEdit, formData);
  }

}
