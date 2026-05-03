import { useState } from 'react'
import Header from './components/Header/Header'
import NewsTicker from './components/NewsTicker/NewsTicker'
import TabBar from './components/TabBar/TabBar'
import PublisherGrid from './components/PublisherGrid/PublisherGrid'
import { useSubscriptions } from './hooks/useSubscriptions'
import { publishers } from './data/publishers'
import { tickerItems } from './data/articles'
import styles from './App.module.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('all')
  const [viewer, setViewer] = useState('grid')
  const { subscribed, subscribe, unsubscribe } = useSubscriptions()

  const visiblePublishers = activeTab === 'sub'
    ? publishers.filter(p => subscribed.has(p.id))
    : publishers

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Header />
        <div className={styles.tickerWrap}>
          <NewsTicker items={tickerItems.slice(0, 2)} />
        </div>
        <div className={styles.tabWrap}>
          <TabBar
            activeTab={activeTab}
            subCount={subscribed.size}
            viewer={viewer}
            onTabChange={setActiveTab}
            onViewerChange={setViewer}
          />
        </div>
        <div className={styles.gridWrap}>
          <PublisherGrid
            publishers={visiblePublishers}
            subscribedIds={subscribed}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
        </div>
      </div>
    </div>
  )
}
