interface TabBarProps {
  activeTab: 'all' | 'sub';
  onTabChange: (tab: 'all' | 'sub') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  subscribedCount: number;
}

const TabBar = ({ activeTab, onTabChange, viewMode, onViewModeChange, subscribedCount }: TabBarProps) => {
  return (
    <div className="flex justify-between items-center w-[var(--width-content)] h-[24px] mt-[var(--spacing-48)]">
      <div className="flex gap-[var(--spacing-24)]">
        <button 
          className={`flex items-center gap-[var(--spacing-4)] text-[16px] p-0 ${
            activeTab === 'all' 
              ? 'font-bold text-[var(--color-ink)]' 
              : 'font-medium text-[var(--color-mute)]'
          }`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button 
          className={`flex items-center gap-[var(--spacing-4)] text-[16px] p-0 ${
            activeTab === 'sub' 
              ? 'font-bold text-[var(--color-ink)]' 
              : 'font-medium text-[var(--color-mute)]'
          }`}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          {activeTab === 'sub' && (
            <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[var(--color-accent)] text-[var(--color-badge-ink)] text-[12px] font-medium">
              {subscribedCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-[var(--spacing-8)]">
        <button 
          className={`flex items-center justify-center ${
            viewMode === 'list' ? 'text-[var(--color-ink)]' : 'text-[var(--color-mute)]'
          }`}
          onClick={() => onViewModeChange('list')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <button 
          className={`flex items-center justify-center ${
            viewMode === 'grid' ? 'text-[var(--color-ink)]' : 'text-[var(--color-mute)]'
          }`}
          onClick={() => onViewModeChange('grid')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
