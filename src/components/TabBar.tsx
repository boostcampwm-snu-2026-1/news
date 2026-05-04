import type { Tab, Viewer } from '../types';
import styles from './TabBar.module.css';

type Props = {
  activeTab: Tab;
  viewer: Viewer;
  subCount: number;
  onTabChange: (t: Tab) => void;
  onViewerChange: (v: Viewer) => void;
};

export default function TabBar({
  activeTab,
  viewer,
  subCount,
  onTabChange,
  onViewerChange,
}: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist">
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
          내가 구독한 언론사
          <span
            className={styles.badge}
            aria-label={`구독 중인 언론사 ${subCount}곳`}
          >
            {subCount}
          </span>
        </button>
      </div>

      <div className={styles.viewerToggle}>
        <button
          type="button"
          aria-label="리스트 보기"
          aria-pressed={viewer === 'list'}
          className={`${styles.iconBtn} ${viewer === 'list' ? styles.iconBtnActive : ''}`}
          onClick={() => onViewerChange('list')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
            <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
            <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
            <circle cx="2.5" cy="7" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="2.5" cy="12" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="2.5" cy="17" r="0.7" fill="currentColor" stroke="none" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="그리드 보기"
          aria-pressed={viewer === 'grid'}
          className={`${styles.iconBtn} ${viewer === 'grid' ? styles.iconBtnActive : ''}`}
          onClick={() => onViewerChange('grid')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
