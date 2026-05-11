import { useNewsstandStore } from '../store/useNewsstandStore';

export default function TabBar() {
  const { tab, setTab, viewMode, setViewMode, subscribed } = useNewsstandStore();

  return (
    <nav className="flex items-center justify-between h-[48px] mb-6">
      {/* 탭 영역 */}
      <div className="flex items-center gap-6 font-bold text-lg">
        <button 
          onClick={() => setTab('all')}
          className={`transition-colors outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 ${tab === 'all' ? 'text-ink' : 'text-mute hover:text-sub'}`}
        >
          전체 언론사
        </button>
        <button 
          onClick={() => setTab('sub')}
          className={`flex items-center gap-2 transition-colors outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 ${tab === 'sub' ? 'text-ink' : 'text-mute hover:text-sub'}`}
        >
          내가 구독한 언론사
          {subscribed.length > 0 && (
            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-accent text-card text-xs rounded-full font-mono">
              {subscribed.length}
            </span>
          )}
        </button>
      </div>

      {/* 보기 모드 토글 영역 */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setViewMode('list')}
          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            viewMode === 'list' ? 'bg-accent text-card' : 'bg-line text-card hover:bg-sub'
          }`}
          aria-label="리스트 보기"
        >
          {/* 리스트 아이콘 (햄버거 메뉴 유사) */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3H13M1 7H13M1 11H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={() => setViewMode('grid')}
          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            viewMode === 'grid' ? 'bg-accent text-card' : 'bg-line text-card hover:bg-sub'
          }`}
          aria-label="그리드 보기"
        >
          {/* 그리드 아이콘 (2x2 창문) */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H5V5H1V1ZM9 1H13V5H9V1ZM1 9H5V13H1V9ZM9 9H13V13H9V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
