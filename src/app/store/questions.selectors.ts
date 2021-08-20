import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectAll} from "./questions.reducer";

const feature = createFeatureSelector<any>('questions');

export const selectQuestions = createSelector(
  feature,
  selectAll
)
