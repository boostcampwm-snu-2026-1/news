import { createContext, useContext, useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Category } from '../types'
import { getTotalPages } from '../data/outlets'

type ViewMode = 'grid' | 'list'
type ActiveTab = 'all' | 'subscribed'

interface NewsstandState {
  activeTab: ActiveTab
  viewMode: ViewMode
  currentPage: number
  subscribed: Set<string>
  activeCategory: Category
  currentOutletIndex: number
  setActiveTab: (tab: ActiveTab) => void
  setViewMode: (mode: ViewMode) => void
  setCurrentPage: (page: number) => void
  toggleSubscription: (outletId: string) => void
  setActiveCategory: (category: Category) => void
  setCurrentOutletIndex: (index: number) => void
  totalPages: number
}

const NewsstandContext = createContext<NewsstandState | null>(null)

export function NewsstandProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<Category>('종합/경제')
  const [currentOutletIndex, setCurrentOutletIndex] = useState(0)

  const totalPages = useMemo(() => getTotalPages(), [])

  function toggleSubscription(outletId: string) {
    setSubscribed(prev => {
      const next = new Set(prev)
      if (next.has(outletId)) {
        next.delete(outletId)
      } else {
        next.add(outletId)
      }
      return next
    })
  }

  const value: NewsstandState = {
    activeTab,
    viewMode,
    currentPage,
    subscribed,
    activeCategory,
    currentOutletIndex,
    setActiveTab,
    setViewMode,
    setCurrentPage,
    toggleSubscription,
    setActiveCategory,
    setCurrentOutletIndex,
    totalPages,
  }

  return (
    <NewsstandContext.Provider value={value}>
      {children}
    </NewsstandContext.Provider>
  )
}

export function useNewsstand(): NewsstandState {
  const ctx = useContext(NewsstandContext)
  if (!ctx) throw new Error('useNewsstand must be used within NewsstandProvider')
  return ctx
}
