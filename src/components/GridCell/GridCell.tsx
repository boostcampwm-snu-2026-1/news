import type { KeyboardEvent } from "react";
import type { Press } from "../../state/types";
import { PressWordmark } from "../PressWordmark/PressWordmark";
import { SubscribePill } from "../SubscribePill/SubscribePill";
import styles from "./GridCell.module.css";

export type CellTab = "all" | "sub";

export interface GridCellProps {
  press: Press;
  /** Tab context — kept on the prop for caller compat though pill mode now derives from `subscribed`. */
  tab: CellTab;
  subscribed: boolean;
  onOpen: () => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

export function GridCell({
  press,
  subscribed,
  onOpen,
  onSubscribe,
  onUnsubscribe,
}: GridCellProps) {
  const pillMode = subscribed ? "unsubscribe" : "subscribe";
  const onPill = subscribed ? onUnsubscribe : onSubscribe;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      className={styles.cell}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={onKey}
      aria-label={press.wordmark.name}
    >
      <div className={styles.face}>
        <PressWordmark spec={press.wordmark} />
      </div>
      <div className={styles.hover}>
        <SubscribePill mode={pillMode} onClick={onPill} />
      </div>
    </div>
  );
}
