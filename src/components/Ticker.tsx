import { useState, useEffect, useCallback, useRef } from 'react';
import type { TickerItem } from '../data/press';
import './Ticker.css';

interface TickerProps {
  items: TickerItem[][];
}

function TickerLane({
  items,
  delay,
}: {
  items: TickerItem[];
  delay: number;
}) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const pausedRef = useRef(false);
  const laneRef = useRef<HTMLDivElement>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const advance = useCallback(() => {
    if (pausedRef.current) return;
    setAnimating(true);
    fadeTimerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % items.length);
      setAnimating(false);
    }, 550);
  }, [items.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      advance();
    }, delay);
    return () => clearTimeout(timeout);
  }, []); // initial offset only

  useEffect(() => {
    const interval = setInterval(advance, 3200);
    return () => {
      clearInterval(interval);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [advance]);

  const handlePause = () => {
    pausedRef.current = true;
  };
  const handleResume = () => {
    pausedRef.current = false;
  };

  const item = items[current];

  return (
    <div
      className="ticker__lane"
      ref={laneRef}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      role="marquee"
      aria-live="off"
      aria-atomic="true"
      tabIndex={0}
    >
      <span
        className={`ticker__content ${animating ? 'ticker__content--fade' : ''}`}
      >
        <strong className="ticker__press">{item.pressName}</strong>
        <span className="ticker__title">{item.title}</span>
      </span>
    </div>
  );
}

function Ticker({ items }: TickerProps) {
  return (
    <div className="ticker">
      <TickerLane items={items[0]} delay={0} />
      <TickerLane items={items[1]} delay={1600} />
    </div>
  );
}

export default Ticker;
