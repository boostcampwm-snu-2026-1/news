import type { Press } from '@/types/press';
import { PressWordmark } from '@/components/PressWordmark/PressWordmark';
import { CELLS_PER_PAGE } from '@/data/presses';
import styles from './PressGrid.module.css';

type PressGridProps = {
  /** 현재 페이지의 셀 — 길이 24. undefined는 sparse grid의 빈 셀 (§7 내가 구독한 언론사). */
  items: (Press | undefined)[];
};

export function PressGrid({ items }: PressGridProps) {
  // 항상 24 슬롯이 표시되도록 보정 (sparse 그리드 대비).
  const slots: (Press | undefined)[] = Array.from(
    { length: CELLS_PER_PAGE },
    (_, i) => items[i],
  );

  return (
    <div className={styles.grid} role="grid" aria-label="언론사 그리드">
      {slots.map((press, i) => (
        <div
          key={i}
          className={`${styles.cell} ${press ? '' : styles.cellEmpty}`}
          role="gridcell"
        >
          {press && <PressWordmark name={press.name} style={press.wordmark} />}
        </div>
      ))}
    </div>
  );
}
