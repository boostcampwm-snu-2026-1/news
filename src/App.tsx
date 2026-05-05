import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar, { type TabType, type ViewType } from './components/TabBar'
import PressWordmark from './components/PressWordmark'
import { PRESS_LIST } from './data/pressData'
import './components/Header.css'
import './components/PressWordmark.css'
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
      {/* #5 워드마크 확인용 — #6 그리드 작업 시 교체 예정 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
        {PRESS_LIST.slice(0, 12).map(press => (
          <PressWordmark key={press.id} press={press} />
        ))}
      </div>
    </div>
  )
}

export default App
