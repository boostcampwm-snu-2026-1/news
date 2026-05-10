import { useState, useEffect, useRef } from 'react';

interface UseProgressOptions {
  duration: number;
  isPaused?: boolean;
  onComplete: () => void;
  resetDependency?: any; // 의존성 값이 바뀌면 프로그레스가 0으로 초기화됨
}

export const useProgress = ({ duration, isPaused = false, onComplete, resetDependency }: UseProgressOptions) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  // 탭이나 카테고리가 바뀌면(resetDependency 변경) 타이머 초기화
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  }, [resetDependency]);

  useEffect(() => {
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
        // 일시정지했던 시간(pausedTimeRef)을 반영하여 시작 시간 조정
        startTimeRef.current = time - pausedTimeRef.current;
      }

      const elapsed = time - startTimeRef.current;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);
      pausedTimeRef.current = elapsed; // 현재까지 진행된 시간 기억

      if (currentProgress >= 100) {
        onComplete();
        // 콜백 실행 후 다음 사이클을 위해 초기화 (옵션)
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
  }, [isPaused, duration, onComplete, resetDependency]);

  return progress;
};
