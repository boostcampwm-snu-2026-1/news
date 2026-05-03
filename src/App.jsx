jsx
import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar from './components/TabBar'
import PressGrid from './components/PressGrid'
import Chevron from './components/Chevron'
import { PRESS_DATA } from './data/pressData'

export default function App() {
  const [state, setState] = useState({
    tab: 'all',           // 'all' | 'sub'
    page: 0,              // 현재 페이지 (0, 1, 2)
    subscribed: new Set() // 구독한 언론사 ID
  })

  const handleTabChange = (newTab) => {
    setState(prev => ({ ...prev, tab: newTab, page: 0 }))
  }

  const handlePageChange = (direction) => {
    const maxPages = state.tab === 'all' ? 3 : Math.ceil(state.subscribed.size / 24) || 1
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

  // 현재 페이지에 표시할 언론사 필터링
  const getPressItems = () => {
    let items = state.tab === 'all' ? PRESS_DATA : PRESS_DATA.filter(p => state.subscribed.has(p.id))
    const startIdx = state.page * 24
    return items.slice(startIdx, startIdx + 24)
  }

  const pressItems = getPressItems()
  const maxPages = state.tab === 'all' ? 3 : Math.ceil(state.subscribed.size / 24) || 1

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