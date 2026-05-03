export type Tab = 'all' | 'sub'
export type Viewer = 'grid' | 'list'
export type PressId = string
export type CategoryKey = string

export interface PressWordmark {
  name: string
  color: string
  bg?: string
  weight: 400 | 500 | 700
  family: 'sans' | 'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string
  accent?: string
  accentChar?: number
  accentUnder?: number[]
  accentBg?: boolean
  flag?: boolean
  latin?: boolean
  small?: boolean
}

export interface Press {
  id: PressId
  wordmark: PressWordmark
  categories: CategoryKey[]
}

export interface TickerItem {
  pressName: string
  title: string
}
