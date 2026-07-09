export interface PoetWorks {
  poetry?: string[]
  novels?: string[]
  shortStory?: string[]
  drama?: string[]
  essay?: string[]
  essayCollection?: string[]
  travelogue?: string[]
  story?: string[]
  famousPoems?: string[]
  magazines?: string[]
  other?: string[]
  essaysAndOther?: string[]
  songCollection?: string
  shortStoryCollection?: string
}

export interface PoetFamily {
  father?: string
  mother?: string
  grandfather?: string
  birthOrder?: string
  wife?: string
  notableSiblings?: string[]
}

export interface PoetEducation {
  summary?: string
  englandVisit?: string
}

export interface PoetTimelineItem {
  year: string
  event: string
}

export interface PoetWorksCount {
  poetryBooks?: string
  plays?: string
  novels?: string
  essayBooks?: string
  shortStories?: string
  songs?: string
  paintings?: string
  completeWorks?: string
}

export interface PoetNobelPrize {
  year?: string
  book?: string
  significance?: string
}

export interface PoetVisvaBharati {
  founded?: string
  location?: string
  background?: string
}

export interface PoetNationalAnthem {
  country: string
  song: string
}

export interface PoetExamTips {
  commonlyAskedDates?: string[]
  commonlyAskedNames?: string[]
  mustRememberBooks?: string[]
}

export interface PoetData {
  id: number
  name: string
  pseudonym: string
  titles?: string[]
  image: string
  dateOfBirth: string
  dateOfDeath: string
  shortDes: string
  family?: PoetFamily
  education?: PoetEducation
  lifeTimeline?: PoetTimelineItem[]
  works: PoetWorks
  worksCount?: PoetWorksCount
  nobelPrize?: PoetNobelPrize
  visvaBharati?: PoetVisvaBharati
  nationalAnthems?: PoetNationalAnthem[]
  honorsAndTitles?: string[]
  importantFacts: string[]
  examImportantFacts?: string[]
  examTips?: PoetExamTips
}

export interface PoetDataset {
  description: string
  writers: PoetData[]
}
