export interface Question {
  body: string,
  type: string,
  answers: Array<string>,
  isAnswered: boolean,
  createdAt: Date
}

