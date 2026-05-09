import type { SlideSpeed } from '../../types';

interface CarouselControlBarProps {
  activeIndex: number;
  total: number;
  autoPlay: boolean;
  speed: SlideSpeed;
  onPrev: () => void;
  onNext: () => void;
  onAutoPlayToggle: () => void;
  onSpeedChange: (speed: SlideSpeed) => void;
}

const SPEED_LABELS: Record<SlideSpeed, string> = {
  slow: '느리게(30초)',
  normal: '보통(20초)',
  fast: '빠르게(15초)',
};

export function CarouselControlBar({
  activeIndex,
  total,
  autoPlay,
  speed,
  onPrev,
  onNext,
  onAutoPlayToggle,
  onSpeedChange,
}: CarouselControlBarProps) {
  return (
    <div className="flex items-center justify-between text-xs text-text-secondary px-2 py-1.5">
      {/* 좌측: 자동넘김 토글 + 속도 드롭다운 */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAutoPlayToggle}
          className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors duration-150 ${
            autoPlay
              ? 'border-text-primary text-text-primary bg-white'
              : 'border-border text-text-secondary hover:border-text-secondary'
          }`}
        >
          {autoPlay ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
          자동넘김
        </button>

        {autoPlay && (
          <select
            value={speed}
            onChange={(e) => onSpeedChange(e.target.value as SlideSpeed)}
            className="border border-border rounded px-1.5 py-1 text-xs text-text-secondary bg-white focus:outline-none focus:border-text-secondary cursor-pointer"
          >
            {(Object.keys(SPEED_LABELS) as SlideSpeed[]).map((s) => (
              <option key={s} value={s}>{SPEED_LABELS[s]}</option>
            ))}
          </select>
        )}
      </div>

      {/* 우측: n / total + 미세이동 */}
      <div className="flex items-center gap-2">
        <span className="tabular-nums">
          {activeIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            onClick={onPrev}
            aria-label="이전"
            className="px-1.5 py-1 hover:text-text-primary transition-colors duration-150"
          >
            ◁
          </button>
          <button
            onClick={onNext}
            aria-label="다음"
            className="px-1.5 py-1 hover:text-text-primary transition-colors duration-150"
          >
            ▷
          </button>
        </div>
      </div>
    </div>
  );
}
