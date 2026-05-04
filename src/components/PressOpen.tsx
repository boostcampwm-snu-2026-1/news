import type { MouseEvent } from 'react';
import type { PressData } from '../types';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import styles from './PressOpen.module.css';

type Props = {
  press: PressData;
  isSubscribed: boolean;
  editTime: string;
  headline: string;
  list: string[];
  onSubscribe: (id: string) => void;
  onUnsubscribe: (id: string) => void;
};

export default function PressOpen({
  press,
  isSubscribed,
  editTime,
  headline,
  list,
  onSubscribe,
  onUnsubscribe,
}: Props) {
  const mode: 'subscribe' | 'unsubscribe' = isSubscribed
    ? 'unsubscribe'
    : 'subscribe';

  const handlePill = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (mode === 'subscribe') onSubscribe(press.id);
    else onUnsubscribe(press.id);
  };

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={styles.headWordmark}>
          <PressWordmark {...press.wordmark} scale={1.05} />
        </span>
        <span className={styles.editTime}>{editTime} 편집</span>
        <SubscribePill mode={mode} onClick={handlePill} />
      </div>

      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.imageBox}>headline image</div>
          <div className={styles.headline}>{headline}</div>
        </div>
        <div className={styles.right}>
          <ul className={styles.list}>
            {list.map((line, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.bullet} aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className={styles.footnote}>
            {press.name} 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
