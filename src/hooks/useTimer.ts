import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerProps {
  duration: number; // ms
  onFinished: () => void;
  isActive: boolean;
}

const ANIMATION_FRAME_INTERVAL = 16; // 약 60fps

export const useTimer = ({ duration, onFinished, isActive }: UseTimerProps) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>(Date.now());

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(intervalRef.current);
        onFinished();
      }
    }, ANIMATION_FRAME_INTERVAL);
  }, [duration, onFinished]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    if (isActive) startTimer();
  }, [isActive, startTimer]);

  useEffect(() => {
    if (isActive) {
      startTimer();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, startTimer]);

  return { 
    progress, 
    reset 
  };
};