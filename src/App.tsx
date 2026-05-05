import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar, { type TabType, type ViewType } from './components/TabBar'
import PressGrid from './components/PressGrid'
import Chevron from './components/Chevron'
import { PRESS_LIST } from './data/pressData'
import './components/Header.css'
import './components/PressGrid.css'
import './components/Chevron.css'
import './App.css'

const PAGE_SIZE = 24

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [activeView, setActiveView] = useState<ViewType>('grid')
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set())
  const [allPage, setAllPage] = useState(0)
  const [subPage, setSubPage] = useState(0)

  function handleSubscribe(id: string) {
    setSubscribedIds(prev => new Set(prev).add(id))
  }

  function handleUnsubscribe(id: string) {
    setSubscribedIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  // 탭이 바뀌면 페이지를 0으로 초기화
  function handleTabChange(tab: TabType) {
    setActiveTab(tab)
    setAllPage(0)
    setSubPage(0)
  }

  const sourceList = activeTab === 'subscribed'
    ? PRESS_LIST.filter(p => subscribedIds.has(p.id))
    : PRESS_LIST

  const page = activeTab === 'subscribed' ? subPage : allPage
  const setPage = activeTab === 'subscribed' ? setSubPage : setAllPage
  const lastPage = Math.max(0, Math.ceil(sourceList.length / PAGE_SIZE) - 1)
  const displayItems = sourceList.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div className="newsstand" style={{ position: 'relative' }}>
      <Header />
      <Ticker />
      <TabBar
        activeTab={activeTab}
        activeView={activeView}
        subCount={subscribedIds.size}
        onTabChange={handleTabChange}
        onViewChange={setActiveView}
      />
      <PressGrid
        items={displayItems}
        activeTab={activeTab}
        subscribedIds={subscribedIds}
        onSubscribe={handleSubscribe}
        onUnsubscribe={handleUnsubscribe}
      />
      <Chevron dir="left"  disabled={page === 0}        onClick={() => setPage(p => p - 1)} />
      <Chevron dir="right" disabled={page === lastPage}  onClick={() => setPage(p => p + 1)} />
    </div>
  )
}

export default App
