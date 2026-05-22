export interface Article {
  id: number
  title: string
  content: string
  category_id: number
}

export interface ArticleCategory {
  id: number
  name: string
  group_id: number
}

export interface Exercise {
  id: number
  title: string
  content: string
  img_path: string
  during: number
  created_at: string
  deleted_at: string | null
}

export interface ExerciseCategory {
  id: number
  exercise_id: number
  category_id: number
}

export interface Category {
  id: number
  name: string
  group_id: number
}

export interface Group {
  id: number
  name: string
}
