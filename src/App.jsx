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
    page: 0,
    subscribed: new Set()
  })

  const handleTabChange = (newTab) => {
    setState(prev => ({ ...prev, tab: newTab, page: 0 }))
  }

  const handlePageChange = (direction) => {
    const maxPages = state.tab === 'all'
      ? PRESS_TOTAL_PAGES
      : Math.ceil(state.subscribed.size / PRESS_PAGE_SIZE) || 1

    setState(prev => ({
      ...prev,
      page: direction === 'next' 
        ? Math.min(prev.page + 1, maxPages - 1)
        : Math.max(prev.page - 1, 0)
    }))
  }

  const handleSubscribe = (pressId) => {
    setState(prev => {
      const newSubscribed = new Set(prev.subscribed)
      if (newSubscribed.has(pressId)) {
        newSubscribed.delete(pressId)
      } else {
        newSubscribed.add(pressId)
      }
      return { ...prev, subscribed: newSubscribed }
    })
  }

  const getPressItems = () => {
    let items = state.tab === 'all' ? PRESS_DATA : PRESS_DATA.filter(p => state.subscribed.has(p.id))
    const startIdx = state.page * PRESS_PAGE_SIZE
    return items.slice(startIdx, startIdx + PRESS_PAGE_SIZE)
  }

  const pressItems = getPressItems()
  const maxPages = state.tab === 'all'
    ? PRESS_TOTAL_PAGES
    : Math.ceil(state.subscribed.size / PRESS_PAGE_SIZE) || 1

  return (
    <div className="newsstand-container">
      <Header />
      <Ticker />
      <TabBar 
        activeTab={state.tab}
        subscribedCount={state.subscribed.size}
        onTabChange={handleTabChange}
      />
      <div className="content-area">
        <Chevron 
          direction="left" 
          disabled={state.page === 0}
          onClick={() => handlePageChange('prev')}
        />
        <PressGrid 
          items={pressItems}
          subscribed={state.subscribed}
          mode={state.tab}
          onSubscribe={handleSubscribe}
        />
        <Chevron 
          direction="right"
          disabled={state.page === maxPages - 1}
          onClick={() => handlePageChange('next')}
        />
      </div>
    </div>
  )
}
