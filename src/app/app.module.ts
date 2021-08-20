import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionManagementComponent} from './pages/question-management/question-management.component';
import {CreateQuestionComponent} from './pages/create-question/create-question.component';
import {QuestionEditComponent} from './pages/question-edit/question-edit.component';
import {QuestionListComponent} from './pages/question-list/question-list.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {QuestionItemComponent} from './components/question-item/question-item.component';
import {QuestionFormComponent} from './components/question-form/question-form.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {PaginatorTransformPipe} from "./pipes/paginator-transform.pipe";
import {MatIconModule} from "@angular/material/icon";
import {StoreModule} from '@ngrx/store';
import {questionsReducer} from "./store/questions.reducer";
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {QuestionsEffects} from "./store/questions.effects";

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    CreateQuestionComponent,
    QuestionEditComponent,
    QuestionListComponent,
    QuestionItemComponent,
    QuestionFormComponent,
    PaginatorComponent,
    PaginatorTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    FormsModule,
    MatDividerModule,
    MatIconModule,
    StoreModule.forRoot({questions: questionsReducer}, {}),
    EffectsModule.forRoot([QuestionsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
