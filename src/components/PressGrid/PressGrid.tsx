import { mockPressData } from '../../data/pressData';
import GridCell from './GridCell';
import styles from './PressGrid.module.css';

const PressGrid = () => {
  const cells = Array.from({ length: 24 }, (_, i) => mockPressData[i] || null);

  return (
    <main className={styles.gridContainer}>
      <div className={styles.grid}>
        {cells.map((press, index) => (
          <GridCell key={index} press={press} />
        ))}
      </div>
      
      {/* 좌우 화살표 버튼 (페이지네이션) */}
      <button className={`${styles.chevron} ${styles.left}`} aria-label="이전 페이지">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M18 34L6 20L18 6" />
        </svg>
      </button>
      <button className={`${styles.chevron} ${styles.right}`} aria-label="다음 페이지">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M6 34L18 20L6 6" />
        </svg>
      </button>
    </main>
  );
};

export default PressGrid;
