import type { Press, PressId } from "../../state/types";
import { GridCell, type CellTab } from "../GridCell/GridCell";
import styles from "./PressGrid.module.css";

const SLOT_COUNT = 24;

export interface PressGridProps {
  items: Press[];
  tab: CellTab;
  subscribedIds: PressId[];
  onOpen: (press: Press) => void;
  onSubscribe: (id: PressId) => void;
  onUnsubscribe: (id: PressId) => void;
}

export function PressGrid({
  items,
  tab,
  subscribedIds,
  onOpen,
  onSubscribe,
  onUnsubscribe,
}: PressGridProps) {
  const slots: (Press | null)[] = items.slice(0, SLOT_COUNT);
  while (slots.length < SLOT_COUNT) slots.push(null);

  return (
    <div className={styles.grid}>
      {slots.map((press, i) =>
        press ? (
          <GridCell
            key={press.id}
            press={press}
            tab={tab}
            subscribed={subscribedIds.includes(press.id)}
            onOpen={() => onOpen(press)}
            onSubscribe={() => onSubscribe(press.id)}
            onUnsubscribe={() => onUnsubscribe(press.id)}
          />
        ) : (
          <div key={`empty-${i}`} className={styles.cellEmpty} aria-hidden="true" />
        ),
      )}
    </div>
  );
}
