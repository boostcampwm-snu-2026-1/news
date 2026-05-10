export const PUBLISHER_CATEGORIES = [
  'general-economy',
  'broadcast-telecom',
  'it-science',
  'sports-entertainment',
  'magazine-specialty',
  'local',
] as const

export type PublisherCategory = (typeof PUBLISHER_CATEGORIES)[number]

export type WordmarkFamily = 'sans' | 'serif'

export type WordmarkWeight = 400 | 500 | 700

export type HexColor = `#${string}`

export interface CategoryMeta {
  key: PublisherCategory
  label: string
}

export interface WordmarkStyle {
  color?: HexColor
  backgroundColor?: HexColor
  weight?: WordmarkWeight
  family?: WordmarkFamily
  italic?: boolean
  underline?: boolean
  tracking?: string
  accent?: HexColor
  accentChar?: number
  accentUnder?: readonly number[]
  accentBackground?: boolean
  flag?: boolean
  latin?: boolean
  small?: boolean
}

export interface Article {
  id: string
  title: string
  isLead?: boolean
}

export interface Publisher {
  id: string
  name: string
  category: PublisherCategory
  wordmark: WordmarkStyle
  editedAt: string
  articles: readonly Article[]
}

export interface TickerItem {
  id: string
  publisherId: Publisher['id']
  publisherName: Publisher['name']
  headline: string
}

export interface NewsstandPayload {
  categories: readonly CategoryMeta[]
  publishers: readonly Publisher[]
  tickerItems: readonly TickerItem[]
}
