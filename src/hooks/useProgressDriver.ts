import { useEffect, useRef, useState } from 'react';

const TICK_MS = 100;
const DURATION_MS = 6000;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Args = {
  active: boolean;
  resetKey: unknown;
  onComplete: () => void;
};

/**
 * 6초 cycle progress 드라이버.
 * - active=false 또는 prefers-reduced-motion 시 미가동 (progress=0 유지)
 * - resetKey 변경 시 progress 즉시 0으로 리셋, interval 재시작
 * - cycle 완료 시 onComplete 호출 (최신 클로저를 ref로 보장)
 *
 * elapsed 카운터를 effect 클로저에 가둬 매 tick마다 effect를 재실행하지 않는다.
 */
export function useProgressDriver({ active, resetKey, onComplete }: Args) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    setProgress(0);
    if (!active) return;
    if (prefersReducedMotion()) return;

    let elapsed = 0;
    const id = window.setInterval(() => {
      elapsed += TICK_MS;
      const frac = Math.min(1, elapsed / DURATION_MS);
      if (frac >= 1) {
        elapsed = 0;
        setProgress(0);
        onCompleteRef.current();
      } else {
        setProgress(frac);
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [active, resetKey]);

  return progress;
}
