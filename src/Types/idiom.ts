export interface IdiomItem {
  idiom: string
  meaning: string
}

export interface IdiomData {
    id: number
    category: string
    idioms: IdiomItem[]
}
