export interface Question {
  id: string,
  body: string,
  type: string,
  answers: Array<string>,
  isAnswered: boolean,
  createdAt: Date
}

