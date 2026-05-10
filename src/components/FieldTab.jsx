export default function FieldTab({ tabs, activeKey, progress, onTabChange }) {
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeKey))

  const handleKeyDown = (event) => {
    let nextIndex = activeIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (activeIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (activeIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    onTabChange(tabs[nextIndex].key)
    requestAnimationFrame(() => {
      document.getElementById(`field-tab-${nextIndex}`)?.focus()
    })
  }

  return (
    <div className="field-tabs" role="tablist" aria-label="기사 분야">
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeKey
        const progressWidth = isActive ? `${Math.round(progress * 100)}%` : '0%'

        return (
          <button
            className="field-tabs__tab"
            id={`field-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="press-open-panel"
            tabIndex={isActive ? 0 : -1}
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            onKeyDown={handleKeyDown}
          >
            <span className="field-tabs__label">{tab.label}</span>
            <span className="field-tabs__track" aria-hidden="true">
              <span className="field-tabs__progress" style={{ width: progressWidth }} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
