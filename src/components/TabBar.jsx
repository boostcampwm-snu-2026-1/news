export default function TabBar({ activeTab, subscribedCount, onTabChange }) {
  return (
    <div className="tabbar" role="tablist" aria-label="언론사 보기">
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
  )
}
