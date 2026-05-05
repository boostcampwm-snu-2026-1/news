import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar, { type TabType, type ViewType } from './components/TabBar'
import PressGrid from './components/PressGrid'
import { PRESS_LIST } from './data/pressData'
import './components/Header.css'
import './components/PressGrid.css'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [activeView, setActiveView] = useState<ViewType>('grid')
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set())

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

  const displayItems = activeTab === 'subscribed'
    ? PRESS_LIST.filter(p => subscribedIds.has(p.id))
    : PRESS_LIST.slice(0, 24)

  return (
    <div className="newsstand">
      <Header />
      <Ticker />
      <TabBar
        activeTab={activeTab}
        activeView={activeView}
        subCount={subscribedIds.size}
        onTabChange={setActiveTab}
        onViewChange={setActiveView}
      />
      <PressGrid
        items={displayItems}
        activeTab={activeTab}
        subscribedIds={subscribedIds}
        onSubscribe={handleSubscribe}
        onUnsubscribe={handleUnsubscribe}
      />
    </div>
  )
}

export default App
