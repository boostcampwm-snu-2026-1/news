import type { TabKind, ViewKind } from '../types';

interface Props {
  tab: TabKind;
  view: ViewKind;
  subscribedCount: number;
  onTabChange: (tab: TabKind) => void;
  onViewChange: (view: ViewKind) => void;
}

export default function TabBar({ tab, view, subscribedCount, onTabChange, onViewChange }: Props) {
  return (
    <div className="max-w-[1080px] mx-auto px-4 border-b border-[#e0e0e0]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => onTabChange('all')}
            className={`py-3 mr-5 text-sm border-b-2 transition-colors ${
              tab === 'all'
                ? 'font-bold text-black border-black'
                : 'text-gray-400 border-transparent'
            }`}
          >
            전체 언론사
          </button>
          <button
            onClick={() => onTabChange('subscribed')}
            className={`py-3 flex items-center gap-1.5 text-sm border-b-2 transition-colors ${
              tab === 'subscribed'
                ? 'font-bold text-black border-black'
                : 'text-gray-400 border-transparent'
            }`}
          >
            내가 구독한 언론사
            {subscribedCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4169e1] text-white text-xs font-bold">
                {subscribedCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewChange('list')}
            className={`p-1 transition-opacity ${view === 'list' ? 'opacity-100' : 'opacity-30'}`}
            aria-label="리스트 뷰"
          >
            <ListViewIcon />
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={`p-1 transition-opacity ${view === 'grid' ? 'opacity-100' : 'opacity-30'}`}
            aria-label="그리드 뷰"
          >
            <GridViewIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ListViewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="3" width="12" height="2" rx="0.5" fill="currentColor" />
      <rect x="1" y="8" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="8" width="12" height="2" rx="0.5" fill="currentColor" />
      <rect x="1" y="13" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="13" width="12" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function GridViewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="7" height="7" rx="0.5" fill="currentColor" />
      <rect x="10" y="1" width="7" height="7" rx="0.5" fill="currentColor" />
      <rect x="1" y="10" width="7" height="7" rx="0.5" fill="currentColor" />
      <rect x="10" y="10" width="7" height="7" rx="0.5" fill="currentColor" />
    </svg>
  );
}
