import styles from './TabBar.module.css';

export type TabKey = 'all' | 'sub';
export type ViewerKey = 'list' | 'grid';

type TabBarProps = {
  activeTab: TabKey;
  subCount: number;
  viewer: ViewerKey;
  onTabChange: (tab: TabKey) => void;
  onViewerChange: (viewer: ViewerKey) => void;
};

export function TabBar({
  activeTab,
  subCount,
  viewer,
  onTabChange,
  onViewerChange,
}: TabBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.left} role="tablist" aria-label="언론사 탭">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sub'}
          className={`${styles.tab} ${activeTab === 'sub' ? styles.tabActive : ''}`}
          onClick={() => onTabChange('sub')}
        >
          <span>내가 구독한 언론사</span>
          {subCount > 0 && (
            <span
              className={styles.badge}
              aria-label={`구독 중인 언론사 ${subCount}곳`}
            >
              {subCount}
            </span>
          )}
        </button>
      </div>

      <div className={styles.right} role="group" aria-label="보기 형식">
        <button
          type="button"
          aria-label="리스트 보기"
          aria-pressed={viewer === 'list'}
          className={`${styles.viewerButton} ${viewer === 'list' ? styles.viewerButtonActive : ''}`}
          onClick={() => onViewerChange('list')}
        >
          <ListIcon className={styles.viewerIcon} />
        </button>
        <button
          type="button"
          aria-label="그리드 보기"
          aria-pressed={viewer === 'grid'}
          className={`${styles.viewerButton} ${viewer === 'grid' ? styles.viewerButtonActive : ''}`}
          onClick={() => onViewerChange('grid')}
        >
          <GridIcon className={styles.viewerIcon} />
        </button>
      </div>
    </div>
  );
}

/** 리스트 보기 아이콘 — 좌측 dot + 우측 line × 3 */
function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="5" cy="6" r="0.8" fill="currentColor" />
      <circle cx="5" cy="12" r="0.8" fill="currentColor" />
      <circle cx="5" cy="18" r="0.8" fill="currentColor" />
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
    </svg>
  );
}

/** 그리드 보기 아이콘 — 6 small squares (2 rows × 3) */
function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="4" width="5" height="5" rx="0.5" />
      <rect x="11" y="4" width="5" height="5" rx="0.5" />
      <rect x="18" y="4" width="3" height="5" rx="0.5" />
      <rect x="4" y="11" width="5" height="5" rx="0.5" />
      <rect x="11" y="11" width="5" height="5" rx="0.5" />
      <rect x="18" y="11" width="3" height="5" rx="0.5" />
      <rect x="4" y="18" width="5" height="3" rx="0.5" />
      <rect x="11" y="18" width="5" height="3" rx="0.5" />
      <rect x="18" y="18" width="3" height="3" rx="0.5" />
    </svg>
  );
}
