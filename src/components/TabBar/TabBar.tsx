import { TabType, ViewMode } from '../../App';
import styles from './TabBar.module.css';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  subscribedCount: number;
}

const TabBar = ({ activeTab, onTabChange, viewMode, onViewModeChange, subscribedCount }: TabBarProps) => {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabSection}>
        <button 
          className={`${styles.tabItem} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => onTabChange('all')}
        >
          전체 언론사
        </button>
        <button 
          className={`${styles.tabItem} ${activeTab === 'sub' ? styles.active : ''}`}
          onClick={() => onTabChange('sub')}
        >
          내가 구독한 언론사
          <span className={styles.countBadge}>{subscribedCount}</span>
        </button>
      </div>

      <div className={styles.toggleSection}>
        <button 
          className={`${styles.iconButton} ${viewMode === 'list' ? styles.activeIcon : ''}`}
          onClick={() => onViewModeChange('list')}
          aria-label="리스트 보기"
        >
          {/* List View Icon */}
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
          className={`${styles.iconButton} ${viewMode === 'grid' ? styles.activeIcon : ''}`}
          onClick={() => onViewModeChange('grid')}
          aria-label="그리드 보기"
        >
          {/* Grid View Icon */}
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
