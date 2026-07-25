export interface Answer {
  id: string
  category: string
  title: string
  preview: string
  date: string
}

export interface Scholar {
  id: string
  name: string
  qualification: string
  specialization: string | string[]  // Can be string or array from DB
  imageUrl: string
  followers: number
  questionsAnswered: number
  rating: number
  bio: string
  education: string[]
  recentAnswers: Answer[]
}

export interface ScholarsApiResponse {
  success: boolean
  scholars: Scholar[]
  total: number
  message?: string
}

export type Specialization = 'All' | 'Fiqh' | 'Muamalat' | 'Ibadaat'