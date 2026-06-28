import { useState } from 'react'
import Header from './components/Header/Header'
import NewsTicker from './components/NewsTicker/NewsTicker'
import TabBar from './components/TabBar/TabBar'
import PublisherGrid from './components/PublisherGrid/PublisherGrid'
import ListView from './components/ListView/ListView'
import { useSubscriptions } from './hooks/useSubscriptions'
import { publishers } from './data/publishers'
import { tickerItems, articles } from './data/articles'
import styles from './App.module.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('all')
  const [viewer, setViewer] = useState('grid')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const { subscribed, subscribe, unsubscribe } = useSubscriptions()

  const visiblePublishers = activeTab === 'sub'
    ? publishers.filter(p => subscribed.has(p.id))
    : publishers

  const handleCellClick = (press) => {
    const idx = visiblePublishers.findIndex(p => p.id === press.id)
    setSelectedIdx(Math.max(0, idx))
    setViewer('list')
  }

  const handleViewerChange = (v) => {
    setViewer(v)
    if (v === 'list') setSelectedIdx(0)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedIdx(0)
    setViewer('grid')
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Header />
        <div className={styles.tickerWrap}>
          <NewsTicker items={tickerItems} />
        </div>
        <div className={styles.tabWrap}>
          <TabBar
            activeTab={activeTab}
            subCount={subscribed.size}
            viewer={viewer}
            onTabChange={handleTabChange}
            onViewerChange={handleViewerChange}
          />
        </div>
        <div className={styles.gridWrap}>
          {viewer === 'grid' ? (
            <PublisherGrid
              publishers={visiblePublishers}
              subscribedIds={subscribed}
              onSubscribe={subscribe}
              onUnsubscribe={unsubscribe}
              onCellClick={handleCellClick}
              activeTab={activeTab}
            />
          ) : (
            <ListView
              publishers={visiblePublishers.length > 0 ? visiblePublishers : publishers}
              selectedIdx={selectedIdx}
              onPublisherChange={setSelectedIdx}
              articles={articles}
            />
          )}
        </div>
      </div>
    </div>
  )
}
