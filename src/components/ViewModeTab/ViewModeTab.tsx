import React from 'react';
import { useView } from '@/contexts/ViewContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import styles from './ViewModeTab.module.css';

const ViewModeTab: React.FC = () => {
  const { viewMode, setViewMode, tabMode, setTabMode } = useView();
  const { subscribedIds } = useSubscription();

  return (
    <div className={styles.container}>
      <div className={styles.tabGroup}>
        <button 
          className={`${styles.tab} ${tabMode === 'all' ? styles.active : ''}`}
          onClick={() => setTabMode('all')}
        >
          전체 언론사
        </button>
        <button 
          className={`${styles.tab} ${tabMode === 'subs' ? styles.active : ''}`}
          onClick={() => setTabMode('subs')}
        >
          {`내가 구독한 언론사(${subscribedIds.length})`}
        </button>
      </div>
      
      <div className={styles.toggleGroup}>
        <button 
          className={`${styles.iconButton} ${viewMode === 'list' ? styles.activeIcon : ''}`}
          onClick={() => setViewMode('list')}
          aria-label="리스트 보기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        </button>
        <button 
          className={`${styles.iconButton} ${viewMode === 'grid' ? styles.activeIcon : ''}`}
          onClick={() => setViewMode('grid')}
          aria-label="그리드 보기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewModeTab;