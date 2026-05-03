import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar from './components/TabBar'
import PressGrid from './components/PressGrid'
import Chevron from './components/Chevron'
import { PRESS_DATA, PRESS_PAGE_SIZE, PRESS_TOTAL_PAGES } from './data/pressData'

export default function App() {
  const [state, setState] = useState({
    tab: 'all',
    viewMode: 'grid',
    page: 0,
    subscribed: new Set()
  })

  const subscribedItems = PRESS_DATA.filter(p => state.subscribed.has(p.id))
  const maxPages = state.tab === 'all'
    ? PRESS_TOTAL_PAGES
    : Math.ceil(subscribedItems.length / PRESS_PAGE_SIZE) || 1

  const handleTabChange = (newTab) => {
    setState(prev => ({ ...prev, tab: newTab, page: 0 }))
  }

  const handleViewChange = (newViewMode) => {
    setState(prev => ({ ...prev, viewMode: newViewMode }))
  }

  const handlePageChange = (direction) => {
    setState(prev => ({
      ...prev,
      page: direction === 'next' 
        ? Math.min(prev.page + 1, maxPages - 1)
        : Math.max(prev.page - 1, 0)
    }))
  }

  const handleSubscribe = (pressId, action = 'toggle') => {
    setState(prev => {
      const newSubscribed = new Set(prev.subscribed)

      if (action === 'subscribe') {
        newSubscribed.add(pressId)
      } else if (action === 'unsubscribe') {
        newSubscribed.delete(pressId)
      } else {
        if (newSubscribed.has(pressId)) {
          newSubscribed.delete(pressId)
        } else {
          newSubscribed.add(pressId)
        }
      }

      return { ...prev, subscribed: newSubscribed }
    })
  }

  const currentPage = Math.min(state.page, maxPages - 1)

  const getPressItems = () => {
    let items = state.tab === 'all' ? PRESS_DATA : subscribedItems
    const startIdx = currentPage * PRESS_PAGE_SIZE
    return items.slice(startIdx, startIdx + PRESS_PAGE_SIZE)
  }

  const pressItems = getPressItems()

  return (
    <div className="newsstand-container">
      <Header />
      <Ticker />
      <TabBar 
        activeTab={state.tab}
        activeView={state.viewMode}
        subscribedCount={state.subscribed.size}
        onTabChange={handleTabChange}
        onViewChange={handleViewChange}
      />
      <div className="content-area">
        <Chevron 
          direction="left" 
          disabled={currentPage === 0}
          currentPage={currentPage + 1}
          totalPages={maxPages}
          onClick={() => handlePageChange('prev')}
        />
        <PressGrid 
          items={pressItems}
          subscribed={state.subscribed}
          mode={state.tab}
          onSubscribe={handleSubscribe}
        />
        <p className="visually-hidden" aria-live="polite">
          {currentPage + 1} / {maxPages} 페이지
        </p>
        <Chevron 
          direction="right"
          disabled={currentPage === maxPages - 1}
          currentPage={currentPage + 1}
          totalPages={maxPages}
          onClick={() => handlePageChange('next')}
        />
      </div>
    </div>
  )
}
