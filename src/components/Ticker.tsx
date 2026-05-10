import { useEffect, useState } from 'react';
import type { TickerItem } from '../types';
import styles from './Ticker.module.css';

type Props = {
  lanes: [TickerItem[], TickerItem[]];
};

const ROTATE_MS = 3200;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useLaneIndex(length: number, startDelayMs: number, paused: boolean) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (paused) return;
    let intervalId: number | null = null;
    const startId = window.setTimeout(() => {
      setIdx((i) => (i + 1) % length);
      intervalId = window.setInterval(() => {
        setIdx((i) => (i + 1) % length);
      }, ROTATE_MS);
    }, startDelayMs);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [length, startDelayMs, paused]);

  return idx;
}

function Lane({
  items,
  offsetMs,
  paused,
}: {
  items: TickerItem[];
  offsetMs: number;
  paused: boolean;
}) {
  const idx = useLaneIndex(items.length, offsetMs, paused);
  return (
    <div className={styles.lane}>
      {items.map((it, i) => (
        <div
          key={i}
          className={`${styles.item} ${i === idx ? styles.itemActive : ''}`}
          aria-hidden={i === idx ? undefined : true}
        >
          <span className={styles.press}>{it.press}</span>
          <span className={styles.title}>{it.title}</span>
        </div>
      ))}
    </div>
  );
}

export default function Ticker({ lanes }: Props) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Lane items={lanes[0]} offsetMs={0} paused={paused} />
      <Lane items={lanes[1]} offsetMs={1600} paused={paused} />
    </div>
  );
}
