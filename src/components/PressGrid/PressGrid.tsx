import type { Press } from '@/types/press';
import { CELLS_PER_PAGE } from '@/lib/pagination';
import { PressCell } from '@/components/PressCell/PressCell';
import styles from './PressGrid.module.css';

type PressGridProps = {
  /** 현재 페이지의 셀들 — 길이 ≤24. 부족한 자리는 빈 셀(sparse) 처리. */
  items: Press[];
  isSubscribed: (id: string) => boolean;
  onSubscribe: (id: string) => void;
  onUnsubscribe: (id: string) => void;
  onOpen: (id: string) => void;
};

export function PressGrid({
  items,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  onOpen,
}: PressGridProps) {
  // 항상 24 슬롯 렌더 (sparse 그리드 — 디자인 시스템 §7).
  const slots: (Press | undefined)[] = Array.from(
    { length: CELLS_PER_PAGE },
    (_, i) => items[i],
  );

  return (
    <div className={styles.grid} role="grid" aria-label="언론사 그리드">
      {slots.map((press, i) =>
        press ? (
          <PressCell
            key={press.id}
            press={press}
            subscribed={isSubscribed(press.id)}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
            onOpen={onOpen}
          />
        ) : (
          <div
            key={`empty-${i}`}
            className={`${styles.cell} ${styles.cellEmpty}`}
            role="gridcell"
            aria-hidden="true"
          />
        ),
      )}
    </div>
  );
}
