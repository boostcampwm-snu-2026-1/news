import { useState, useEffect, useRef } from 'react';

interface UseProgressOptions {
  duration: number;
  isPaused?: boolean;
  onComplete: () => void;
  resetDependency?: any;
}

export const useProgress = ({ duration, isPaused = false, onComplete, resetDependency }: UseProgressOptions) => {
  // 시스템 설정에서 "애니메이션 줄이기"를 켜뒀다면 즉시 100% 처리
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  }, [resetDependency]);

  useEffect(() => {
    // prefers-reduced-motion: 애니메이션 없이 duration 후 즉시 완료
    if (prefersReducedMotion) {
      if (isPaused) return;
      const timer = setTimeout(() => {
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }

    // 일시정지 상태면 애니메이션 프레임 요청 취소
    if (isPaused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      return;
    }

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time - pausedTimeRef.current;
      }

      const elapsed = time - startTimeRef.current;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);
      pausedTimeRef.current = elapsed;

      if (currentProgress >= 100) {
        onComplete();
        startTimeRef.current = null;
        pausedTimeRef.current = 0;
        setProgress(0);
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, duration, onComplete, resetDependency, prefersReducedMotion]);

  // reduced-motion 모드에서는 progress를 0으로 고정 (프로그레스 바 숨김)
  return prefersReducedMotion ? 0 : progress;
};
