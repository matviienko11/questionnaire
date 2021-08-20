import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {errorQuestions, loadedQuestions, loadQuestions, removeQuestion} from "./questions.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {QuestionsService} from "../services/questions.service";
import {of} from "rxjs";

@Injectable()
export class QuestionsEffects {
  loadQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      switchMap(() => {
        return this.questionsService.getQuestions()
          .pipe(
            map(questions => {
              return loadedQuestions({questions})
            })
          )
      }),
      catchError(err => of(errorQuestions(err)))
    )
  })
  // deleteQuestion$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(removeQuestion),
  //     switchMap(({id}) => {
  //       return this.questionsService.deleteQuestion(id)
  //     })
  //   )
  // })


  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) {}
}
