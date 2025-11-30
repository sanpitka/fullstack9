export interface Diary {
  id: number
  date: string
  weather: string 
  visibility: string
  comment: string
}

export interface Diaries {
  diaries: Diary[]
}

export type NewEntry = Omit<Diary, 'id'>;