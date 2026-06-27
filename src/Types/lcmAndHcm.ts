
 export interface McqCardProps {
   question: lcmAndHcmMcq
   questionNumber: number
   mode: 'readonly' | 'practice' | null
   onAnswer?: (isCorrect: boolean) => void
 }
 // Types/lcmAndHcm.ts

export interface lcmAndHcmMcq {
  id: number
  ques: string
  answer: string[]
  correct: string
  description?: string
  views?: number
  likes?: number
  dislikes?: number
}

