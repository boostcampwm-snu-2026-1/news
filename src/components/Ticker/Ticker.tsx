import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { TickerItem } from "../../types/newsstand";
import styles from "./Ticker.module.css";

type TickerProps = {
  items: TickerItem[];
};

const ROTATE_INTERVAL_MS = 3200;
const LANE_OFFSET_MS = 1600;

export function Ticker({ items }: TickerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [laneIndexes, setLaneIndexes] = useState<[number, number]>([0, items.length > 1 ? 1 : 0]);
  const isPaused = isHovered || isFocused;

  const laneItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    return laneIndexes.map((index) => items[index % items.length]);
  }, [items, laneIndexes]);

  useEffect(() => {
    setLaneIndexes([0, items.length > 1 ? 1 : 0]);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1 || isPaused || prefersReducedMotion) {
      return;
    }

    const rotateLane = (laneIndex: 0 | 1) => {
      setLaneIndexes((prevIndexes) => {
        const nextIndexes: [number, number] = [...prevIndexes];
        nextIndexes[laneIndex] = (nextIndexes[laneIndex] + 1) % items.length;
        return nextIndexes;
      });
    };

    let secondLaneInterval: number | undefined;
    const firstLaneInterval = window.setInterval(() => rotateLane(0), ROTATE_INTERVAL_MS);
    const secondLaneTimeout = window.setTimeout(() => {
      rotateLane(1);
      secondLaneInterval = window.setInterval(() => rotateLane(1), ROTATE_INTERVAL_MS);
    }, LANE_OFFSET_MS);

    return () => {
      window.clearInterval(firstLaneInterval);
      if (secondLaneInterval !== undefined) {
        window.clearInterval(secondLaneInterval);
      }
      window.clearTimeout(secondLaneTimeout);
    };
  }, [isPaused, items.length, prefersReducedMotion]);

  if (laneItems.length === 0) {
    return <section className={styles.ticker} aria-label="주요 뉴스" />;
  }

  return (
    <section
      className={styles.ticker}
      aria-label="주요 뉴스"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {laneItems.map((item, laneIndex) => (
        <a className={styles.lane} href="#" key={laneIndex}>
          <span className={styles.content} key={`${item.pressName}-${item.title}`}>
            <strong>{item.pressName}</strong>
            <span>{item.title}</span>
          </span>
        </a>
      ))}
    </section>
  );
}
