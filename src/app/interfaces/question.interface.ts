export interface Question {
  id: string,
  body: string,
  type: string,
  answers: Array<Answer>,
  isAnswered: boolean,
  createdAt: Date
}

interface Answer {
  answer: string
}
