import { useEffect, useState } from "react";

interface TickerProps {
  items: readonly string[];
  reducedMotion: boolean;
}

export function Ticker({ items, reducedMotion }: TickerProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length === 0 || paused || reducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [items, paused, reducedMotion]);

  const laneA = items[index % items.length];
  const laneB = items[(index + Math.ceil(items.length / 2)) % items.length];

  return (
    <section
      className="ticker"
      aria-label="자동 롤링 뉴스 티커"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="ticker__lane" aria-live={reducedMotion ? "off" : "polite"}>
        <span className="ticker__label">연합뉴스</span>
        <p key={`lane-a-${index}`}>{laneA}</p>
      </div>
      <div className="ticker__lane" aria-live={reducedMotion ? "off" : "polite"}>
        <span className="ticker__label">큐레이션</span>
        <p key={`lane-b-${index}`}>{laneB}</p>
      </div>
    </section>
  );
}
