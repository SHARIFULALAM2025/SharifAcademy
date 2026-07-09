export interface SayingExamplePair {
  sentence: string
  form: string
  breakdown: Record<string, string>
}

export interface SayingFormation {
  rule: string
  examples: string[]
}

export interface SayingNoPluralNote {
  rule: string
  examples: string[]
  exception_case?: string
}

export interface SayingMethod {
  no: number
  method: string
  detail?: string
  examples: string[]
  note?: string
}

export interface SayingRulePoint {
  point: string
  text: string
  examples?: string[]
  wrong_usage_note?: string
}

export interface SayingRuleGroup {
  group: string
  points: SayingRulePoint[]
}

export interface SayingCollectiveCategory {
  category: string
  words: string[]
  examples: string[]
}

export interface SayingConversionPair {
  singular: string
  plural: string
}

export interface SayingType {
  name: string
  meaning: string
}

export interface SayingSection {
  id: string
  title: string
  content?: string
  note?: string
  examples?: string[]
  types?: SayingType[]
  example_pairs?: SayingExamplePair[]
  insight?: string
  definition?: string
  formation?: SayingFormation
  additional_note?: string
  no_plural_note?: SayingNoPluralNote
  methods?: SayingMethod[]
  rules?: SayingRuleGroup[]
  table?: SayingCollectiveCategory[]
  conversion_table?: SayingConversionPair[]
  key_points?: string[]
}

export interface SayingInterface {
  topic: string
  subject: string
  description: string
  sections: SayingSection[]
}
