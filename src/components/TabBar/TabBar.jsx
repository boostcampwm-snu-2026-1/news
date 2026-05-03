import styles from './TabBar.module.css';

const TabBar = ({ activeTab, onTabChange, viewMode, onViewModeChange, subscribedCount }) => {
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
          className={`${styles.iconButton} ${viewMode === 'grid' ? styles.activeIcon : ''}`}
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
