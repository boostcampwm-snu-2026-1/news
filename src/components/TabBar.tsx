import './TabBar.css';

export type TabType = 'all' | 'sub';
export type ViewType = 'grid' | 'list';

interface TabBarProps {
  activeTab: TabType;
  subCount: number;
  viewer: ViewType;
  onTabChange: (tab: TabType) => void;
  onViewerChange: (viewer: ViewType) => void;
}

function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: TabBarProps) {
  return (
    <div className="tabbar">
      <div className="tabbar__left" role="tablist" aria-label="언론사 탭">
        <button
          className={`tabbar__tab ${activeTab === 'all' ? 'tabbar__tab--active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          className={`tabbar__tab ${activeTab === 'sub' ? 'tabbar__tab--active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'sub'}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          {subCount > 0 && (
            <span className="tabbar__badge" aria-label={`구독 중인 언론사 ${subCount}곳`}>
              {subCount}
            </span>
          )}
        </button>
      </div>
      <div className="tabbar__right">
        <button
          className={`tabbar__view ${viewer === 'list' ? 'tabbar__view--active' : ''}`}
          onClick={() => onViewerChange('list')}
          aria-label="리스트 보기"
          aria-pressed={viewer === 'list'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="14" y2="18" />
          </svg>
        </button>
        <button
          className={`tabbar__view ${viewer === 'grid' ? 'tabbar__view--active' : ''}`}
          onClick={() => onViewerChange('grid')}
          aria-label="그리드 보기"
          aria-pressed={viewer === 'grid'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TabBar;
