import { useEffect, useState } from 'react';
import type { TickerItem } from '@/types/press';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Ticker.module.css';

const ROTATE_INTERVAL_MS = 3200;

type TickerProps = {
  laneLeft: TickerItem[];
  laneRight: TickerItem[];
};

export function Ticker({ laneLeft, laneRight }: TickerProps) {
  return (
    <div className={styles.ticker} aria-label="실시간 뉴스 티커">
      <Lane items={laneLeft} delayMs={0} />
      {/* 두 lane이 동기화되지 않도록 offset 1.6s — §6.2 "two lanes offset" */}
      <Lane items={laneRight} delayMs={ROTATE_INTERVAL_MS / 2} />
    </div>
  );
}

type LaneProps = {
  items: TickerItem[];
  delayMs: number;
};

function Lane({ items, delayMs }: LaneProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || items.length <= 1) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, ROTATE_INTERVAL_MS);
    }, delayMs);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [reduced, paused, items.length, delayMs]);

  return (
    <div
      className={styles.lane}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      role="group"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${i === index ? styles.itemVisible : ''}`}
          aria-hidden={i !== index}
        >
          <span className={styles.pressName}>{item.press}</span>
          <span className={styles.title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
