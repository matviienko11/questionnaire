export interface Question {
  id: string,
  body: string,
  type: string,
  answers: Array<Answer>,
  isAnswered: boolean,
  createdAt: Date
}

export interface Answer {
  id: string
  answer: string,
  isCorrect: boolean
}
