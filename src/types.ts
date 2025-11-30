export interface Diary {
  id: number
  date: string
  weather: 'Sunny' | 'Rainy' | 'Cloudy' | 'Windy' | 'Stormy'
  visibility: 'Great' | 'Good' | 'Ok' | 'Poor'
  comment: string
}

export interface Diaries {
  diaries: Diary[]
}

export type NewEntry = Omit<Diary, 'id'>;