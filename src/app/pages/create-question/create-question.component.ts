import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {minLength} from "../../../utils/validators";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  form!: FormGroup;
  answer!: string;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      body: ['', Validators.required],
      type: ['', Validators.required],
      answers: this.fb.array([], minLength(2))
    })
  }



  onSubmit() {
    const formData = this.form.getRawValue();
    this.questionService.saveQuestion(formData);
  }

  addAnswer() {
    const answers = this.form.controls.answers as FormArray;
    if(this.form.controls.answers.value.length >= 4) {
      window.alert('You cannot add more answers')
    } else {
      answers.push(this.fb.group({
        answer: this.answer
      }))
    }
    this.answer = '';
  }

  removeAnswer(index: number) {
    const answersArr = this.form.controls.answers as FormArray;
    answersArr.removeAt(index)
  }

  toManagement() {
    this.router.navigate(['management'])
  }


}
