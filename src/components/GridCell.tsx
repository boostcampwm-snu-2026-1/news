import type { KeyboardEvent } from 'react';
import type { PressData } from '../types';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import styles from './PressGrid.module.css';

type Props = {
  press: PressData;
  isSubscribed: boolean;
  onOpen: (id: string) => void;
  onSubscribe: (id: string) => void;
  onUnsubscribe: (id: string) => void;
};

const GRID_COLS = 6;

type Dir = 'left' | 'right' | 'up' | 'down';

function move(current: HTMLElement, dir: Dir) {
  const grid = current.parentElement;
  if (!grid) return;
  const siblings = Array.from(grid.children) as HTMLElement[];
  const idx = siblings.indexOf(current);
  if (idx < 0) return;

  const col = idx % GRID_COLS;
  let target = -1;
  if (dir === 'left' && col > 0) target = idx - 1;
  else if (dir === 'right' && col < GRID_COLS - 1) target = idx + 1;
  else if (dir === 'up' && idx >= GRID_COLS) target = idx - GRID_COLS;
  else if (dir === 'down' && idx + GRID_COLS < siblings.length)
    target = idx + GRID_COLS;

  if (target < 0) return;
  const next = siblings[target];
  // 빈 셀(role 부재)은 건너뛰지 않고 그대로 정지 — 구독 탭에서 빈 셀에
  // 포커스가 가지 않도록 명시적 차단
  if (next?.getAttribute('role') !== 'button') return;
  next.focus();
}

export default function GridCell({
  press,
  isSubscribed,
  onOpen,
  onSubscribe,
  onUnsubscribe,
}: Props) {
  const mode: 'subscribe' | 'unsubscribe' = isSubscribed
    ? 'unsubscribe'
    : 'subscribe';

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(press.id);
      return;
    }
    const dirMap: Record<string, Dir> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
    };
    const dir = dirMap[e.key];
    if (dir) {
      e.preventDefault();
      move(e.currentTarget, dir);
    }
  };

  return (
    <div
      className={styles.cell}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(press.id)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.wordmark}>
        <PressWordmark {...press.wordmark} />
      </div>
      <div className={styles.pillSlot}>
        <SubscribePill
          mode={mode}
          onClick={(e) => {
            e.stopPropagation();
            if (mode === 'subscribe') onSubscribe(press.id);
            else onUnsubscribe(press.id);
          }}
        />
      </div>
    </div>
  );
}
