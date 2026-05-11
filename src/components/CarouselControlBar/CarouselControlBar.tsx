import { useState, useRef, useEffect } from 'react';
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

const SPEED_LABEL: Record<SlideSpeed, string> = {
  fast: '빠르게(15초)',
  normal: '보통(35초)',
  slow: '느리게(1분)',
  off: '끄기',
};

export function CarouselControlBar({
  activeIndex,
  total,
  speed,
  onPrev,
  onNext,
  onSpeedChange,
}: CarouselControlBarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function select(value: SlideSpeed) {
    onSpeedChange(value);
    setOpen(false);
  }

  return (
    <div className="flex items-center justify-between text-xs text-text-secondary px-2 py-1.5">
      {/* 좌측: 자동넘김 + 드롭업 */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-text-primary">자동넘김</span>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-border text-text-secondary hover:border-text-secondary transition-colors duration-150"
          >
            {SPEED_LABEL[speed]}
            <svg
              width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
              className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
            >
              <path d="M5 3L9 7H1L5 3Z" />
            </svg>
          </button>

          {open && (
            <ul className="absolute bottom-full left-0 mb-1 bg-white border border-border rounded shadow-panel min-w-full z-20 overflow-hidden">
              {SPEED_OPTIONS.map(({ value, label }) => (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => select(value)}
                    className={`w-full text-left px-3 py-1.5 text-xs whitespace-nowrap hover:bg-border transition-colors duration-100 ${
                      speed === value ? 'font-medium text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 우측: n / total + 미세이동 */}
      <div className="flex items-center gap-2">
        <span className="tabular-nums">
          {activeIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="이전"
            className="px-1.5 py-1 hover:text-text-primary transition-colors duration-150"
          >
            ◁
          </button>
          <button
            type="button"
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
