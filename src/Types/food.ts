interface CropItem {
  id: number
  name: string
  division: string
  district: string
}

export interface CropData {
  food: string
  item: CropItem[]
}
