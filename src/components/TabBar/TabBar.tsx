import { useNewsstand } from '../../context/NewsstandContext'
import styles from './TabBar.module.css'

export default function TabBar() {
  const { activeTab, setActiveTab, viewMode, setViewMode, subscribed } = useNewsstand()

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => setActiveTab('all')}
        >
          전체 언론사
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'subscribed' ? styles.active : ''}`}
          onClick={() => setActiveTab('subscribed')}
        >
          내가 구독한 언론사
          {subscribed.size > 0 && (
            <span className={styles.badge}>{subscribed.size}</span>
          )}
        </button>
      </div>
      <div className={styles.viewToggle}>
        <button
          className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.activeToggle : ''}`}
          onClick={() => setViewMode('list')}
          title="리스트 뷰"
          aria-label="리스트 뷰"
        >
          ☰
        </button>
        <button
          className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
          onClick={() => setViewMode('grid')}
          title="그리드 뷰"
          aria-label="그리드 뷰"
        >
          ⊞
        </button>
      </div>
    </div>
  )
}
