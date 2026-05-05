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
  const subCount = 8

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
      <PressGrid items={PRESS_LIST.slice(0, 24)} />
    </div>
  )
}

export default App
