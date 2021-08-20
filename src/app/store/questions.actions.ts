import {createAction, props} from "@ngrx/store";
import {Question} from "../interfaces/question.interface";

export const loadQuestions = createAction(
  '[QUESTIONS] Load questions'
)

export const loadedQuestions = createAction(
  '[QUESTIONS] Loaded questions',
  props<{questions: any}>()
)

export const errorQuestions = createAction(
  '[QUESTIONS] Error questions',
  props<{error: string}>()
)

export const removeQuestion = createAction(
  '[QUESTIONS] Remove question',
  props<{id: string}>()
)

export const addQuestion = createAction(
  '[QUESTION] Add question',
  props<{question: any}>()
)

export const editQuestion = createAction(
  '[QUESTION] Edit question',
  props<{question: any}>()
)
