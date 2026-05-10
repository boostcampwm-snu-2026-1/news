import type { PressData, PressId } from '../types';
import GridCell from './GridCell';
import styles from './PressGrid.module.css';

type Props = {
  items: PressData[];
  subscribedIds: Set<PressId>;
  onSubscribe: (id: PressId) => void;
  onUnsubscribe: (id: PressId) => void;
  onOpen: (id: PressId) => void;
};

const CELLS_PER_PAGE = 24;

export default function PressGrid({
  items,
  subscribedIds,
  onSubscribe,
  onUnsubscribe,
  onOpen,
}: Props) {
  const cells: Array<PressData | null> = [...items];
  while (cells.length < CELLS_PER_PAGE) cells.push(null);
  cells.length = CELLS_PER_PAGE;

  return (
    <div className={styles.root}>
      {cells.map((press, idx) =>
        press ? (
          <GridCell
            key={press.id}
            press={press}
            isSubscribed={subscribedIds.has(press.id)}
            onOpen={onOpen}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
          />
        ) : (
          <div key={`empty-${idx}`} className={styles.cellEmpty} />
        ),
      )}
    </div>
  );
}
