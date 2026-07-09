export interface PunctuationCategoryCount {
  category: string
  count: number
}

export interface PunctuationMarkRow {
  name: string
  symbol: string
  pause: string
}

export interface PunctuationRule {
  rule: string
  example?: string
}

export interface PunctuationBracketType {
  name: string
  symbol: string
}

export interface PunctuationSection {
  id: string
  title: string
  content?: string
  definition?: string
  source_note?: string
  categories?: PunctuationCategoryCount[]
  table?: PunctuationMarkRow[]
  rules?: PunctuationRule[]
  examples?: string[]
  insight?: string
  types?: PunctuationBracketType[]
  key_points?: string[]
}

export interface Punctuation {
  topic: string
  subject: string
  description: string
  sections: PunctuationSection[]
}
