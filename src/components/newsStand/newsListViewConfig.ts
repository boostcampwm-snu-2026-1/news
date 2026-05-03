import type { MediaCategory } from '../../type/types'

export const CATEGORY_TABS = [
  {
    value: 'general-economy',
    label: '종합/경제',
    categories: ['ECONOMY'] as MediaCategory[],
  },
  {
    value: 'broadcast-telecom',
    label: '방송/통신',
    categories: ['BROADCAST'] as MediaCategory[],
  },
  { value: 'it', label: 'IT', categories: ['IT'] as MediaCategory[] },
  {
    value: 'sports-entertainment',
    label: '스포츠/연예',
    categories: ['SPORTS'] as MediaCategory[],
  },
  {
    value: 'magazine-specialty',
    label: '매거진/전문지',
    categories: ['MAGAZINE'] as MediaCategory[],
  },
  {
    value: 'local',
    label: '지역',
    categories: ['LOCAL'] as MediaCategory[],
  },
] as const

export const AUTO_ADVANCE_DELAY = 6000
export const DEFAULT_CATEGORY_TAB = CATEGORY_TABS[0].value

export type CategoryTabValue = (typeof CATEGORY_TABS)[number]['value']
export type CategoryMediaIndexMap = Record<CategoryTabValue, number>
export type CategoryTabState = {
  value: CategoryTabValue
  label: string
  currentIndex: number
  totalCount: number
  activeMediaId: string | null
  isActive: boolean
}

export const INITIAL_CATEGORY_MEDIA_INDEX_MAP: CategoryMediaIndexMap = {
  'general-economy': 0,
  'broadcast-telecom': 0,
  it: 0,
  'sports-entertainment': 0,
  'magazine-specialty': 0,
  local: 0,
}
