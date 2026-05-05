import { useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import TabBar, { type TabType, type ViewType } from './components/TabBar'
import PressGrid from './components/PressGrid'
import Chevron from './components/Chevron'
import FieldTab, { type Category, CATEGORIES } from './components/FieldTab'
import PressOpen from './components/PressOpen'
import { PRESS_LIST } from './data/pressData'
import './components/Header.css'
import './components/PressGrid.css'
import './components/Chevron.css'
import './components/FieldTab.css'
import './components/PressOpen.css'
import './App.css'

const PAGE_SIZE = 24

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [activeView, setActiveView] = useState<ViewType>('grid')
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set())
  const [allPage, setAllPage] = useState(0)
  const [subPage, setSubPage] = useState(0)
  const [openedPressId, setOpenedPressId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0])

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

  function handleTabChange(tab: TabType) {
    setActiveTab(tab)
    setAllPage(0)
    setSubPage(0)
    setOpenedPressId(null)
  }

  function handleOpenPress(id: string) {
    setOpenedPressId(id)
    setActiveCategory(CATEGORIES[0])
  }

  const sourceList = activeTab === 'subscribed'
    ? PRESS_LIST.filter(p => subscribedIds.has(p.id))
    : PRESS_LIST

  const page = activeTab === 'subscribed' ? subPage : allPage
  const setPage = activeTab === 'subscribed' ? setSubPage : setAllPage
  const lastPage = Math.max(0, Math.ceil(sourceList.length / PAGE_SIZE) - 1)
  const displayItems = sourceList.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const openedPress = openedPressId ? PRESS_LIST.find(p => p.id === openedPressId) ?? null : null

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
      {openedPress ? (
        <>
          <FieldTab
            activeCategory={activeCategory}
            articleCount={81}
            currentIndex={1}
            onCategoryChange={setActiveCategory}
          />
          <PressOpen
            press={openedPress}
            isSubscribed={subscribedIds.has(openedPress.id)}
            onSubscribe={() => handleSubscribe(openedPress.id)}
            onUnsubscribe={() => handleUnsubscribe(openedPress.id)}
          />
        </>
      ) : (
        <>
          <PressGrid
            items={displayItems}
            activeTab={activeTab}
            subscribedIds={subscribedIds}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            onOpen={handleOpenPress}
          />
          <Chevron dir="left"  disabled={page === 0}       onClick={() => setPage(p => p - 1)} />
          <Chevron dir="right" disabled={page === lastPage} onClick={() => setPage(p => p + 1)} />
        </>
      )}
    </div>
  )
}

export default App
