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

const TAB_OPTIONS = [
  {
    id: 'all',
    label: '전체 언론사',
  },
  {
    id: 'sub',
    label: '내가 구독한 언론사',
  },
]

export default function TabBar({
  activeTab,
  activeView,
  subscribedCount,
  onTabChange,
  onViewChange,
}) {
  const handleTabKeyDown = (event) => {
    const currentIndex = TAB_OPTIONS.findIndex((option) => option.id === activeTab)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % TAB_OPTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + TAB_OPTIONS.length) % TAB_OPTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = TAB_OPTIONS.length - 1
    } else {
      return
    }

    const nextTabId = TAB_OPTIONS[nextIndex].id

    event.preventDefault()
    onTabChange(nextTabId)
    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextTabId}`)?.focus()
    })
  }

  return (
    <div className="tabbar">
      <div className="tabbar__tabs" role="tablist" aria-label="언론사 범위">
        {TAB_OPTIONS.map((option) => {
          const isActive = activeTab === option.id

          return (
            <button
              className="tabbar__tab"
              id={`tab-${option.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="press-panel"
              tabIndex={isActive ? 0 : -1}
              key={option.id}
              onClick={() => onTabChange(option.id)}
              onKeyDown={handleTabKeyDown}
            >
              {option.label}
              {option.id === 'sub' && (
                <span className="tabbar__badge" aria-label={`구독 중인 언론사 ${subscribedCount}곳`}>
                  {subscribedCount}
                </span>
              )}
            </button>
          )
        })}
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
