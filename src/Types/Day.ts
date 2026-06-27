export interface DayEntry {
  date: string
  name: string
  importance: string
  note?: string
}

export interface MonthEntry {
  month: string
  days: DayEntry[]
}

export interface AllDayType {
  id: number
  title: string
  note: string
  months: MonthEntry[]
}
export interface ExamQuestion {
  id: number
  ques: string
  ans: string[]
  correct_answer: string
}
export interface AttendExam {
  id: number
  title: string
  category: string
  sub_Category: string
  total_Question: string
  total_Marks: string
  total_time: string
  examiner: string
  package: string
  question: ExamQuestion[]
}