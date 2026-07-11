export interface GeoNicknameItem {
  id: number
  nickname: string
  place: string
}

export interface GeoNicknameData {
  title: string
  item: GeoNicknameItem[]
}
