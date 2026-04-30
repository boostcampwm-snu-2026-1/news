import PressCell from './PressCell';
import styles from './PressGrid.module.css';

export default function PressGrid({ items, currentPage, totalPages, onPageChange, direction, isEmpty }) {
  if (isEmpty) {
    return <div className={styles.empty}>구독한 언론사가 없습니다.</div>;
  }

  const slideClass = direction === 'next'
    ? styles.slideFromRight
    : direction === 'prev'
    ? styles.slideFromLeft
    : '';

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button
          className={styles.arrow}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="이전 페이지"
        >
          &#8249;
        </button>

        <div className={styles.gridWrap}>
          <div key={currentPage} className={`${styles.grid} ${slideClass}`}>
            {items.map((press) => (
              <PressCell key={press.id} press={press} />
            ))}
          </div>
        </div>

        <button
          className={styles.arrow}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          aria-label="다음 페이지"
        >
          &#8250;
        </button>
      </div>

      <div className={styles.pageIndicator}>
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
}
