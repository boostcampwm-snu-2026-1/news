import type { MouseEvent } from "react";
import styles from "./SubscribePill.module.css";

export type PillMode = "subscribe" | "unsubscribe";

export interface SubscribePillProps {
  mode: PillMode;
  onClick: () => void;
}

export function SubscribePill({ mode, onClick }: SubscribePillProps) {
  const label = mode === "subscribe" ? "구독하기" : "해지하기";
  const handle = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button className={styles.pill} type="button" onClick={handle} aria-label={label}>
      {mode === "subscribe" ? <PlusIcon /> : <MinusIcon />}
      <span className={styles.label}>{label}</span>
    </button>
  );
}

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <line x1="5" y1="1" x2="5" y2="9" stroke="var(--c-sub)" strokeWidth="1.3" />
      <line x1="1" y1="5" x2="9" y2="5" stroke="var(--c-sub)" strokeWidth="1.3" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <line x1="1" y1="5" x2="9" y2="5" stroke="var(--c-sub)" strokeWidth="1.3" />
    </svg>
  );
}
