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
  idToEdit: string = '';
  @Input() isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log(this.isEdit)
    if(!this.isEdit) {
      this.form = this.fb.group({
        body: ['', Validators.required],
        type: ['', Validators.required],
        answers: this.fb.array([], minLength(2))
      })
    } else {
      this.activatedRoute.params.subscribe(data => this.idToEdit = data.id)
      const editableQuestion = this.questionService.getQuestionById(this.idToEdit);
      this.form = this.fb.group({
        body: [editableQuestion.body],
        type: [editableQuestion.type],
        answers: this.fb.array(editableQuestion.answers)
      })
    }
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    this.questionService.saveQuestion(formData);
    this.form.reset()
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
    this.questionService.editQuestion(this.idToEdit, formData);
  }

}
