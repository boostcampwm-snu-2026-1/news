export const DEFAULT_TAB = 'ALL' as const
export const DEFAULT_VIEW_MODE = 'GRID' as const

export const LEFT_HEADLINE_CATEGORIES = ['ECONOMY', 'IT', 'LOCAL'] as const
export const RIGHT_HEADLINE_CATEGORIES = [
  'BROADCAST',
  'SPORTS',
  'MAGAZINE',
] as const

export type ViewMode = 'LIST' | 'GRID'
