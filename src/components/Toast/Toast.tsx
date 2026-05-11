import { useEffect } from 'react';
import styles from './Toast.module.css';

type ToastProps = {
  message: string;
  durationMs?: number;
  onDone: () => void;
};

/**
 * 일회성 토스트 (디자인 시스템 §11 — 구독 직후 짧은 안내).
 * - durationMs 후 자동으로 onDone 호출
 * - prefers-reduced-motion이면 페이드 스킵, 그래도 자동 dismiss는 작동
 */
export function Toast({ message, durationMs = 3000, onDone }: ToastProps) {
  useEffect(() => {
    const id = window.setTimeout(onDone, durationMs);
    return () => window.clearTimeout(id);
  }, [durationMs, onDone]);

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
}
