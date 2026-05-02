import styles from './TabBar.module.css'

export type TabKey = 'all' | 'sub'
export type ViewerKey = 'grid' | 'list'

interface TabBarProps {
  activeTab: TabKey
  subCount: number
  viewer: ViewerKey
  onTabChange: (tab: TabKey) => void
  onViewerChange: (viewer: ViewerKey) => void
}

export function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: TabBarProps) {
  return (
    <div className={styles.bar}>
      <div role="tablist" className={styles.tabs}>
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          className={styles.tab}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'sub'}
          className={styles.tab}
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

      <div className={styles.viewToggle}>
        <button
          aria-pressed={viewer === 'grid'}
          aria-label="그리드 보기"
          className={styles.viewBtn}
          onClick={() => onViewerChange('grid')}
        >
          <GridIcon />
        </button>
        <button
          aria-pressed={viewer === 'list'}
          aria-label="리스트 보기"
          className={styles.viewBtn}
          onClick={() => onViewerChange('list')}
        >
          <ListIcon />
        </button>
      </div>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="12" width="14" height="2" rx="1" />
    </svg>
  )
}
