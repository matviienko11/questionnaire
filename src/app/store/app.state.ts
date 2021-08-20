import {Question} from "../interfaces/question.interface";

export interface AppState {
  questions: Array<Question>,
  error: string
}
