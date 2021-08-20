import {createReducer, on} from "@ngrx/store";
import {addQuestion, editQuestion, loadedQuestions, removeQuestion} from "./questions.actions";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {Question} from "../interfaces/question.interface";

export function sortByDate(a: Question, b: Question): number {
  return +new Date(b.createdAt) - +new Date(a.createdAt);
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  sortComparer: sortByDate
});

const initialQuestionState: any = adapter.getInitialState({});

export const questionsReducer = createReducer(
  initialQuestionState,
  on(loadedQuestions, (state, {questions}) => {
    return adapter.setAll(questions, state);
  }),
  on(removeQuestion, (state, {id}) => {
    return adapter.removeOne(id, state);
  }),
  on(addQuestion, (state, {question}) => {
    return adapter.addOne(question, state);
  }),
  on(editQuestion, (state, {question}) => {
    return adapter.upsertOne(question, state);
  })
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
