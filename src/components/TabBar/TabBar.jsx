import styles from './TabBar.module.css'

export default function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }) {
  return (
    <div className={styles.tabbar} role="tablist">
      <div className={styles.tabs}>
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'sub'}
          className={`${styles.tab} ${activeTab === 'sub' ? styles.active : ''}`}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          {subCount > 0 && (
            <span className={styles.badge} aria-label={`구독 중인 언론사 ${subCount}곳`}>
              {subCount}
            </span>
          )}
        </button>
      </div>

      <div className={styles.viewerToggle}>
        <button
          className={`${styles.viewBtn} ${viewer === 'list' ? styles.viewActive : ''}`}
          onClick={() => onViewerChange('list')}
          aria-label="리스트 보기"
        >
          <ListIcon active={viewer === 'list'} />
        </button>
        <button
          className={`${styles.viewBtn} ${viewer === 'grid' ? styles.viewActive : ''}`}
          onClick={() => onViewerChange('grid')}
          aria-label="그리드 보기"
        >
          <GridIcon active={viewer === 'grid'} />
        </button>
      </div>
    </div>
  )
}

function ListIcon({ active }) {
  const color = active ? '#14212B' : '#879298'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function GridIcon({ active }) {
  const color = active ? '#14212B' : '#879298'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" stroke={color} strokeWidth="1.5"/>
      <rect x="13" y="4" width="7" height="7" stroke={color} strokeWidth="1.5"/>
      <rect x="4" y="13" width="7" height="7" stroke={color} strokeWidth="1.5"/>
      <rect x="13" y="13" width="7" height="7" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}
