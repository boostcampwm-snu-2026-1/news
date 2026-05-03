import { useEffect, useId, useState } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type TickerItem = {
  press: string;
  title: string;
};

type TickerProps = {
  items: TickerItem[];
};

const ROTATION_MS = 3200;
const LANE_OFFSET_MS = 1600;

export function Ticker({ items }: TickerProps) {
  return (
    <section className="newsstand-ticker" aria-label="주요 뉴스">
      <TickerLane items={items} offsetMs={0} />
      <TickerLane items={items} offsetMs={LANE_OFFSET_MS} />
    </section>
  );
}

type TickerLaneProps = {
  items: TickerItem[];
  offsetMs: number;
};

function TickerLane({ items, offsetMs }: TickerLaneProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const labelId = useId();
  const item = items[index % items.length];

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length <= 1) {
      return;
    }

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      setIndex((current) => (current + 1) % items.length);
      intervalId = window.setInterval(() => {
        setIndex((current) => (current + 1) % items.length);
      }, ROTATION_MS);
    }, offsetMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [items.length, offsetMs, paused, prefersReducedMotion]);

  return (
    <article
      className="newsstand-ticker-lane"
      aria-labelledby={labelId}
      tabIndex={0}
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="newsstand-ticker-item" key={`${item.press}-${item.title}`}>
        <span className="newsstand-ticker-press" id={labelId}>
          {item.press}
        </span>
        <span className="newsstand-ticker-title">{item.title}</span>
      </p>
    </article>
  );
}
