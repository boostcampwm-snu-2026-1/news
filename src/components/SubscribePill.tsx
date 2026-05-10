import type { MouseEvent } from 'react';
import styles from './SubscribePill.module.css';

type Props = {
  mode: 'subscribe' | 'unsubscribe';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function SubscribePill({ mode, onClick }: Props) {
  const isAdd = mode === 'subscribe';
  const label = isAdd ? '구독하기' : '해지하기';
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      <svg
        className={styles.icon}
        viewBox="0 0 10 10"
        fill="none"
        stroke="#5F6E76"
        strokeWidth="1.3"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {isAdd && <line x1="5" y1="1" x2="5" y2="9" />}
        <line x1="1" y1="5" x2="9" y2="5" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
