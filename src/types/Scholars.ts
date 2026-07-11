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
  specialization: string[]
  imageUrl: string
  followers: number
  questionsAnswered: number
  rating: number
  bio: string
  education: string[]
  recentAnswers: Answer[]
}

export type Specialization = 'All' | 'Fiqh' | 'Muamalat' | 'Ibadaat' 