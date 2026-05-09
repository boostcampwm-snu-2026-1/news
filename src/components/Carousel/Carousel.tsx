import { useState, useRef } from 'react';

const PEEK_W = 176;   // 220 * 0.8
const PANEL_W = 736;  // 920 * 0.8
const BASE_X = PEEK_W - PANEL_W; // -560px

interface CarouselProps {
  count: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  renderPanel: (index: number, isActive: boolean) => React.ReactNode;
  prevLabel?: string;
  nextLabel?: string;
}

export function Carousel({ count, activeIndex, onIndexChange, renderPanel, prevLabel, nextLabel }: CarouselProps) {
  const [offsetX, setOffsetX] = useState(BASE_X);
  const [animated, setAnimated] = useState(false);
  const [sliding, setSliding] = useState(false);
  const dirRef = useRef<'prev' | 'next' | null>(null);

  const prevIdx = (activeIndex - 1 + count) % count;
  const nextIdx = (activeIndex + 1) % count;

  function slide(dir: 'prev' | 'next') {
    if (sliding || count <= 1) return;
    dirRef.current = dir;
    setSliding(true);
    setAnimated(true);
    setOffsetX(dir === 'next' ? BASE_X - PANEL_W : BASE_X + PANEL_W);
  }

  function handleTransitionEnd() {
    const dir = dirRef.current;
    onIndexChange(dir === 'next' ? nextIdx : prevIdx);
    setAnimated(false);
    setOffsetX(BASE_X);
    setSliding(false);
    dirRef.current = null;
  }

  if (count === 0) return null;

  return (
    <div className="relative mx-auto" style={{ width: PEEK_W * 2 + PANEL_W }}>
      {/* 슬라이드 트랙 */}
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(${offsetX}px)`,
            transition: animated ? 'transform 250ms ease-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {([prevIdx, activeIndex, nextIdx] as const).map((idx, i) => (
            <div
              key={i}
              style={{ width: PANEL_W, flexShrink: 0 }}
              className={`transition-opacity transition-transform duration-200 ${
                i === 1 ? 'opacity-100 scale-100' : 'opacity-60 scale-95 pointer-events-none'
              }`}
            >
              {renderPanel(idx, i === 1)}
            </div>
          ))}
        </div>
      </div>

      {/* 이전 화살표 */}
      <div className="absolute left-0 top-0 h-full flex items-center" style={{ width: PEEK_W }}>
        <button
          onClick={() => slide('prev')}
          aria-label="이전"
          disabled={sliding}
          className="group relative flex flex-col items-center gap-1 px-3 py-2 text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors duration-150"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {prevLabel && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-xs font-medium bg-text-primary text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
              {prevLabel}
            </span>
          )}
        </button>
      </div>

      {/* 다음 화살표 */}
      <div className="absolute right-0 top-0 h-full flex items-center justify-end" style={{ width: PEEK_W }}>
        <button
          onClick={() => slide('next')}
          aria-label="다음"
          disabled={sliding}
          className="group relative flex flex-col items-center gap-1 px-3 py-2 text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors duration-150"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          {nextLabel && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-xs font-medium bg-text-primary text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
              {nextLabel}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
