import { useState, useRef } from 'react';

const PANEL_W = 736;
const HALF = PANEL_W / 2;      // 368
const BTN_GAP  = 25;   // 버튼 ~ 중앙 패널 경계 간격 (이 값만 바꾸면 버튼만 이동)
const PEEK_PAD = 48;   // peek 카드 내부 패딩 (독립 조절)

// 트랙 translateX — 중앙 패널(index 1)이 화면 정중앙에 오도록
const BASE  = `calc(50% - ${HALF + PANEL_W}px)`;      // calc(50% - 1104px)
const NEXT  = `calc(50% - ${HALF + PANEL_W * 2}px)`;  // calc(50% - 1840px)
const PREV  = `calc(50% - ${HALF}px)`;                // calc(50% - 368px)

// 버튼 위치: 중앙 패널 경계에서 BTN_GAP px 바깥
const BTN_LEFT  = `calc(50% - ${HALF + BTN_GAP}px)`;  // calc(50% - 448px)
const BTN_RIGHT = `calc(50% + ${HALF + BTN_GAP}px)`;  // calc(50% + 448px)

interface CarouselProps {
  count: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  renderPanel: (index: number, isActive: boolean) => React.ReactNode;
  prevLabel?: string;
  nextLabel?: string;
}

export function Carousel({
  count, activeIndex, onIndexChange, renderPanel, prevLabel, nextLabel,
}: CarouselProps) {
  const [transform, setTransform] = useState(BASE);
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
    setTransform(dir === 'next' ? NEXT : PREV);
  }

  function handleTransitionEnd() {
    const dir = dirRef.current;
    onIndexChange(dir === 'next' ? nextIdx : prevIdx);
    setAnimated(false);
    setTransform(BASE);
    setSliding(false);
    dirRef.current = null;
  }

  if (count === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* 슬라이드 트랙: 3개 고정 너비 패널 */}
      <div
        style={{
          display: 'flex',
          transform: `translateX(${transform})`,
          transition: animated ? 'transform 250ms ease-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {([prevIdx, activeIndex, nextIdx] as const).map((idx, i) => (
          <div
            key={i}
            style={{ width: PANEL_W, flexShrink: 0 }}
            className={`transition-opacity duration-200 ${
              i === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}
          >
            {/* peek 패널: 버튼 방향으로 80px 패딩 → 버튼과 카드 사이 항상 80px 여백 */}
            <div style={{
              paddingRight: i === 0 ? PEEK_PAD : 0,
              paddingLeft:  i === 2 ? PEEK_PAD : 0,
            }}>
              {renderPanel(idx, i === 1)}
            </div>
          </div>
        ))}
      </div>

      {/* < 버튼 — 왼쪽 peek 영역 중앙 */}
      <button
        onClick={() => slide('prev')}
        aria-label="이전"
        disabled={sliding}
        style={{ left: BTN_LEFT }}
        className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                   text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors duration-150"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {prevLabel && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap
                           text-xs font-medium bg-text-primary text-white rounded px-2 py-1
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
            {prevLabel}
          </span>
        )}
      </button>

      {/* > 버튼 — 오른쪽 peek 영역 중앙 */}
      <button
        onClick={() => slide('next')}
        aria-label="다음"
        disabled={sliding}
        style={{ left: BTN_RIGHT }}
        className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                   text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors duration-150"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
        {nextLabel && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap
                           text-xs font-medium bg-text-primary text-white rounded px-2 py-1
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
            {nextLabel}
          </span>
        )}
      </button>
    </div>
  );
}
