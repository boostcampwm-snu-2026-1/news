import type { SlideSpeed } from '../../types';

interface CarouselControlBarProps {
  activeIndex: number;
  total: number;
  speed: SlideSpeed;
  onPrev: () => void;
  onNext: () => void;
  onSpeedChange: (speed: SlideSpeed) => void;
}

const SPEED_OPTIONS: { value: SlideSpeed; label: string }[] = [
  { value: 'fast',   label: '빠르게(15초)' },
  { value: 'normal', label: '보통(35초)'   },
  { value: 'slow',   label: '느리게(1분)'  },
  { value: 'off',    label: '끄기'         },
];

export function CarouselControlBar({
  activeIndex,
  total,
  speed,
  onPrev,
  onNext,
  onSpeedChange,
}: CarouselControlBarProps) {
  return (
    <div className="flex items-center justify-between text-xs text-text-secondary px-2 py-1.5">
      {/* 좌측: 자동넘김 라벨 + 속도 버튼 */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-text-primary">자동넘김</span>
        <div className="flex items-center gap-1">
          {SPEED_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onSpeedChange(value)}
              className={`px-2 py-0.5 rounded border text-xs transition-colors duration-150 ${
                speed === value
                  ? 'border-text-primary text-text-primary bg-white font-medium'
                  : 'border-border text-text-secondary hover:border-text-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
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
