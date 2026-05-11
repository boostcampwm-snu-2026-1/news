import { useState } from 'react';
import type { Press } from '@/types/press';
import { PressWordmark } from '@/components/PressWordmark/PressWordmark';
import { SubscribePill } from '@/components/SubscribePill/SubscribePill';
import styles from './PressCell.module.css';

type PressCellProps = {
  press: Press;
  subscribed: boolean;
  onSubscribe: (id: string) => void;
  onUnsubscribe: (id: string) => void;
  onOpen: (id: string) => void;
};

/**
 * Frame 02/03 hover 룰 (week9_proposal.pdf):
 *  - hover 시 wordmark 자리에 pill이 나타남 (pill만 보이도록 워드마크 숨김)
 *  - 미구독: 흰 pill, "+ 구독하기"
 *  - 구독: ink pill, "× 해지하기"
 *  - pill은 토글, cell의 워드마크 영역(또는 cell 자체) 클릭은 open
 */
export function PressCell({
  press,
  subscribed,
  onSubscribe,
  onUnsubscribe,
  onOpen,
}: PressCellProps) {
  const [hover, setHover] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const showPill = hover || focusInside;

  return (
    <div
      className={styles.cell}
      role="gridcell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocusInside(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusInside(false);
        }
      }}
    >
      <button
        type="button"
        className={styles.openTarget}
        onClick={() => onOpen(press.id)}
        aria-label={`${press.name} 열기`}
        tabIndex={showPill ? -1 : 0}
      >
        <PressWordmark name={press.name} style={press.wordmark} />
      </button>

      {showPill && (
        <div className={styles.pillOverlay}>
          <SubscribePill
            subscribed={subscribed}
            pressName={press.name}
            onClick={(e) => {
              e.stopPropagation();
              if (subscribed) onUnsubscribe(press.id);
              else onSubscribe(press.id);
            }}
          />
        </div>
      )}
    </div>
  );
}
