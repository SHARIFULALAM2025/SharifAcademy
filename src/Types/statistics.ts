export interface StatisticsQuestion {
  id: number
  type: string
  ques: string
  answer: string[]
  correct: string
  description: string
}

export interface StatisticsType {
  topic: string
  note: string
  questions: StatisticsQuestion[]
}
