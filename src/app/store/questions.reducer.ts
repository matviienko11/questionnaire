import {createReducer, on} from "@ngrx/store";
import {addQuestion, editQuestion, loadedQuestions, removeQuestion} from "./questions.actions";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

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
