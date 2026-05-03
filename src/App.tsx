import { useState } from 'react'
import type { Tab, Viewer } from './types'
import { useSubscribe } from './hooks/useSubscribe'
import { usePagination } from './hooks/usePagination'
import { usePress } from './hooks/usePress'
import { Header } from './components/Header'
import { TabBar } from './components/TabBar'
import { PressGrid } from './components/PressGrid'
import { Chevron } from './components/Chevron'
import { MOCK_PRESSES } from './data/mockData'

const TOTAL_PAGES_ALL = 3
const PAGE_SIZE = 24

function App() {
  const [tab, setTab] = useState<Tab>('all')
  const [viewer, setViewer] = useState<Viewer>('grid')

  const { subscribed, handleSubscribe, handleUnsubscribe } = useSubscribe()
  const { page, handlePrev, handleNext } = usePagination(
    tab === 'all' ? TOTAL_PAGES_ALL : Math.ceil(subscribed.size / PAGE_SIZE) || 1
  )
  const { opened, tabKey, handleOpen, handleTabKey } = usePress()

  const handleTabChange = (next: Tab) => setTab(next)
  const handleViewerChange = (next: Viewer) => setViewer(next)

  const pageItems =
    tab === 'all'
      ? MOCK_PRESSES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
      : MOCK_PRESSES.filter((p) => subscribed.has(p.id))

  const totalPages =
    tab === 'all' ? TOTAL_PAGES_ALL : Math.ceil(subscribed.size / PAGE_SIZE) || 1

  return (
    <div>
      <Header date={new Date()} />
      {/* Ticker — 추후 구현 */}
      <TabBar
        activeTab={tab}
        subCount={subscribed.size}
        viewer={viewer}
        onTabChange={handleTabChange}
        onViewerChange={handleViewerChange}
      />
      {opened === null && (
        <PressGrid
          items={pageItems}
          activeTab={tab}
          subscribedIds={subscribed}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
          onOpen={handleOpen}
        />
      )}
      {/* PressOpen (리스트뷰) — 추후 구현 */}
      <Chevron dir="left" disabled={page === 0} onClick={handlePrev} />
      <Chevron dir="right" disabled={page === totalPages - 1} onClick={handleNext} />
    </div>
  )
}

export default App
