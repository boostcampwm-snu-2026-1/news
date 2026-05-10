import { useNewsstandStore } from '../../../store/NewsstandContext';

const TabBar = () => {
  const { activeTab, setActiveTab, viewMode, setViewMode, subscribedIds } = useNewsstandStore();
  const subscribedCount = subscribedIds.size;
  return (
    <div className="flex justify-between items-center w-[var(--width-content)] h-[24px] mt-[var(--spacing-48)]">
      <div className="flex gap-[var(--spacing-24)]" role="tablist" aria-label="언론사 보기 옵션">
        <button 
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`flex items-center gap-[var(--spacing-4)] text-[16px] p-0 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
            activeTab === 'all' 
              ? 'font-bold text-[var(--color-ink)]' 
              : 'font-medium text-[var(--color-mute)]'
          }`}
          onClick={() => setActiveTab('all')}
        >
          전체 언론사
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'sub'}
          className={`flex items-center gap-[var(--spacing-4)] text-[16px] p-0 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
            activeTab === 'sub' 
              ? 'font-bold text-[var(--color-ink)]' 
              : 'font-medium text-[var(--color-mute)]'
          }`}
          onClick={() => setActiveTab('sub')}
        >
          내가 구독한 언론사
          {activeTab === 'sub' && (
            <span 
              className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[var(--color-accent)] text-[var(--color-badge-ink)] text-[12px] font-medium"
              aria-label={`구독 중인 언론사 ${subscribedCount}개`}
            >
              {subscribedCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-[var(--spacing-8)]" role="group" aria-label="뷰 모드 선택">
        <button 
          aria-label="리스트 뷰로 보기"
          aria-pressed={viewMode === 'list'}
          className={`flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
            viewMode === 'list' ? 'text-[var(--color-ink)]' : 'text-[var(--color-mute)]'
          }`}
          onClick={() => setViewMode('list')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <button 
          aria-label="그리드 뷰로 보기"
          aria-pressed={viewMode === 'grid'}
          className={`flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${
            viewMode === 'grid' ? 'text-[var(--color-ink)]' : 'text-[var(--color-mute)]'
          }`}
          onClick={() => setViewMode('grid')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TabBar;
