import { useState } from "react";
import tickerData from "../../data/ticker.json";
import type { TickerItem } from "../../state/types";
import { useInterval } from "../../hooks/useInterval";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Ticker.module.css";

const ROTATE_MS = 3200;

export function Ticker() {
  return (
    <div className={`contentCol tickerRow ${styles.ticker}`}>
      {tickerData.lanes.map((lane, i) => (
        <Lane key={i} items={lane as TickerItem[]} offsetMs={i * (ROTATE_MS / 2)} />
      ))}
    </div>
  );
}

interface LaneProps {
  items: TickerItem[];
  offsetMs: number;
}

function Lane({ items, offsetMs }: LaneProps) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [idx, setIdx] = useState(0);
  const paused = reduced || hover || focus;

  useInterval(
    () => setIdx((i) => (i + 1) % items.length),
    paused ? null : ROTATE_MS,
    offsetMs,
  );

  return (
    <div
      className={styles.lane}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      tabIndex={0}
      aria-live="polite"
      aria-atomic="true"
    >
      {items.map((it, i) => (
        <div
          key={i}
          className={styles.item}
          style={{ opacity: i === idx ? 1 : 0 }}
          aria-hidden={i !== idx}
        >
          <span className={styles.pressName}>{it.pressName}</span>
          <span className={styles.title}>{it.title}</span>
        </div>
      ))}
    </div>
  );
}
