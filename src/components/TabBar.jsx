const VIEW_OPTIONS = [
  {
    id: 'grid',
    label: '그리드 보기',
    iconClassName: 'tabbar__view-icon--grid',
  },
  {
    id: 'list',
    label: '리스트 보기',
    iconClassName: 'tabbar__view-icon--list',
  },
]

export default function TabBar({
  activeTab,
  activeView,
  subscribedCount,
  onTabChange,
  onViewChange,
}) {
  return (
    <div className="tabbar">
      <div className="tabbar__tabs" role="tablist" aria-label="언론사 범위">
        <button
          className="tabbar__tab"
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          className="tabbar__tab"
          type="button"
          role="tab"
          aria-selected={activeTab === 'sub'}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          <span className="tabbar__badge" aria-label={`구독 중인 언론사 ${subscribedCount}곳`}>
            {subscribedCount}
          </span>
        </button>
      </div>

      <div className="tabbar__views" role="group" aria-label="보기 방식">
        {VIEW_OPTIONS.map((option) => {
          const isActive = activeView === option.id

          return (
            <button
              className="tabbar__view-button"
              type="button"
              aria-label={option.label}
              aria-pressed={isActive}
              key={option.id}
              onClick={() => onViewChange(option.id)}
            >
              <span className={`tabbar__view-icon ${option.iconClassName}`} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
