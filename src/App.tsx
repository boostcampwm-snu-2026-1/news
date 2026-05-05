import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar, { type TabType, type ViewType } from './components/TabBar'
import './components/Header.css'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [activeView, setActiveView] = useState<ViewType>('grid')
  const subCount = 8 // 나중에 실제 구독 상태로 교체

  return (
    <div className="newsstand">
      <Header />
      <Ticker />
      <TabBar
        activeTab={activeTab}
        activeView={activeView}
        subCount={subCount}
        onTabChange={setActiveTab}
        onViewChange={setActiveView}
      />
    </div>
  )
}

export default App
