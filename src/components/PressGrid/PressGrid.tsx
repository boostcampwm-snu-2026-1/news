import styles from './PressGrid.module.css';

const PressGrid = () => {
  // 우선 24개의 빈 셀을 만듭니다. (나중에 데이터를 넣을 예정)
  const cells = Array.from({ length: 24 });

  return (
    <main className={styles.gridContainer}>
      <div className={styles.grid}>
        {cells.map((_, index) => (
          <div key={index} className={styles.gridCell}>
            {/* 여기에 언론사 로고(Wordmark)가 들어갈 예정입니다. */}
          </div>
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
