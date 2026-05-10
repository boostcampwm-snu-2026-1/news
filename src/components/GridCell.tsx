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
  return (
    <div
      className={styles.cell}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(press.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(press.id);
        }
      }}
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
