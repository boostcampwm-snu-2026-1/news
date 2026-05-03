export type News = {
  id: string
  title: string
  thumbnail: string | null
  content: string
}

export type MediaCategory =
  | 'ECONOMY'
  | 'BROADCAST'
  | 'IT'
  | 'SPORTS'
  | 'MAGAZINE'
  | 'LOCAL'

export type Media = {
  id: string
  title: string
  image: string
  category: MediaCategory
  news: News[]
}

export type User = {
  id: string
  name: string
  subscribingMediaList: string[]
}
