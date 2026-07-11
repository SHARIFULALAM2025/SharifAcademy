export interface NarrationData {
  topic: {
    bangla: string
    english: string
    unit_reference: string
  }

  objectives: string[]

  definition: {
    general: string
    types: SpeechType[]
  }

  conversion_rules: ConversionRule[]

  summary_points: string[]
}

export interface SpeechType {
  name: string
  english: string
  definition: string
  identifying_mark?: string
  examples: string[]
}

export interface DirectIndirectPair {
  direct: string
  indirect: string
}

export interface WordChangeEntry {
  pratyakkho: string
  porokkho: string
}

export interface QuestionCategoryExample {
  category: string
  examples: DirectIndirectPair[]
}

export interface ConversionRule {
  rule_no: number
  title: string
  explanation: string


  example?: DirectIndirectPair


  word_change_table?: WordChangeEntry[]


  examples?: DirectIndirectPair[]

 
  subtypes?: QuestionCategoryExample[]
}
