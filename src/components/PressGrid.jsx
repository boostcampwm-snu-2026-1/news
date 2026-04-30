import PressCell from './PressCell';
import styles from './PressGrid.module.css';

export default function PressGrid({ items }) {
  if (items.length === 0) {
    return <div className={styles.empty}>구독한 언론사가 없습니다.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.arrow} disabled aria-label="이전 페이지">
        &#8249;
      </button>
      <div className={styles.grid}>
        {items.map((press) => (
          <PressCell key={press.id} press={press} />
        ))}
      </div>
      <button className={styles.arrow} disabled aria-label="다음 페이지">
        &#8250;
      </button>
    </div>
  );
}
