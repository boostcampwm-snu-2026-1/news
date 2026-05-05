import './TabBar.css'

export type TabType = 'all' | 'subscribed'
export type ViewType = 'grid' | 'list'

interface TabBarProps {
  activeTab: TabType
  activeView: ViewType
  subCount: number
  onTabChange: (tab: TabType) => void
  onViewChange: (view: ViewType) => void
}

export default function TabBar({ activeTab, activeView, subCount, onTabChange, onViewChange }: TabBarProps) {
  return (
    <div className="tabbar" role="tablist">
      <div className="tabbar__tabs">
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`tabbar__tab ${activeTab === 'all' ? 'tabbar__tab--active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'subscribed'}
          className={`tabbar__tab ${activeTab === 'subscribed' ? 'tabbar__tab--active' : ''}`}
          onClick={() => onTabChange('subscribed')}
        >
          내가 구독한 언론사
          {subCount > 0 && (
            <span className="tabbar__badge" aria-label={`구독 중인 언론사 ${subCount}곳`}>
              {subCount}
            </span>
          )}
        </button>
      </div>

      <div className="tabbar__views">
        <button
          className={`tabbar__view-btn ${activeView === 'list' ? 'tabbar__view-btn--active' : ''}`}
          onClick={() => onViewChange('list')}
          aria-label="리스트 뷰"
        >
          <ListIcon />
        </button>
        <button
          className={`tabbar__view-btn ${activeView === 'grid' ? 'tabbar__view-btn--active' : ''}`}
          onClick={() => onViewChange('grid')}
          aria-label="그리드 뷰"
        >
          <GridIcon />
        </button>
      </div>
    </div>
  )
}

function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="14" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
