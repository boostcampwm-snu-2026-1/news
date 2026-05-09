import type { TabType } from '../../types';

interface GlobalHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function GlobalHeader({ activeTab, onTabChange }: GlobalHeaderProps) {
  return (
    <header className="h-14 bg-bg border-b border-border flex items-center px-4">
      {/* 로고 */}
      <span className="text-lg font-bold tracking-tight text-text-primary select-none">
        NEWSSTAND
      </span>

      {/* MY뉴스 / 전체언론사 토글 */}
      <div className="flex mx-auto border border-border rounded text-sm font-bold overflow-hidden">
        {(['MY뉴스', '전체언론사'] as const).map((label) => {
          const value: TabType = label === 'MY뉴스' ? 'subscribed' : 'all';
          return (
            <button
              key={label}
              onClick={() => onTabChange(value)}
              className={
                activeTab === value
                  ? 'bg-tab-active text-white px-4 py-1.5 transition-colors duration-150'
                  : 'text-text-secondary hover:text-text-primary px-4 py-1.5 transition-colors duration-150'
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 우측 아이콘 버튼 */}
      <div className="flex gap-3 text-text-secondary">
        <button aria-label="새로고침" className="hover:text-text-primary transition-colors duration-150">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8" /><path d="M3 3v5h5" />
          </svg>
        </button>
        <button aria-label="설정" className="hover:text-text-primary transition-colors duration-150">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
