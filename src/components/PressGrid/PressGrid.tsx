import type { Press, PressId } from "../../state/types";
import { GridCell, type CellTab } from "../GridCell/GridCell";
import styles from "./PressGrid.module.css";

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
  return (
    <div className={styles.grid}>
      {items.map((press) => (
        <GridCell
          key={press.id}
          press={press}
          tab={tab}
          subscribed={subscribedIds.includes(press.id)}
          onOpen={() => onOpen(press)}
          onSubscribe={() => onSubscribe(press.id)}
          onUnsubscribe={() => onUnsubscribe(press.id)}
        />
      ))}
    </div>
  );
}
