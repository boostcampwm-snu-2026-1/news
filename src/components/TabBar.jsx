import styles from './TabBar.module.css';

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabBar}>
      <button
        className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
        onClick={() => onTabChange('all')}
      >
        전체 언론사
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'subscribed' ? styles.active : ''}`}
        onClick={() => onTabChange('subscribed')}
      >
        내가 구독한 언론사
      </button>
    </div>
  );
}
