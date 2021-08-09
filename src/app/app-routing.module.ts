import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionManagementComponent} from "./pages/question-management/question-management.component";
import {CreateQuestionComponent} from "./pages/create-question/create-question.component";
import {QuestionEditComponent} from "./pages/question-edit/question-edit.component";
import {QuestionListComponent} from "./pages/question-list/question-list.component";

const routes: Routes = [
  {
    path: 'management',
    component: QuestionManagementComponent
  },
  {
    path: 'create',
    component: CreateQuestionComponent
  },
  {
    path: 'edit/:id',
    component: QuestionEditComponent
  },
  {
    path: 'list',
    component: QuestionListComponent
  },
  {
    path: '',
    redirectTo: '/management',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
