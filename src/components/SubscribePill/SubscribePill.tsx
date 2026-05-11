import styles from './SubscribePill.module.css';

type SubscribePillProps = {
  subscribed: boolean;
  pressName: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * 구독/해지 pill (디자인 시스템 §6.6).
 *  - 미구독: 흰 bg, ink 텍스트, "+ 구독하기"
 *  - 구독: ink bg, 흰 텍스트, "× 해지하기"
 *  - 그리드 셀에서 hover 오버레이로 쓰일 때, 그리고 PressOpen 헤더에서 인라인으로 쓰일 때
 *    둘 다 같은 button을 그대로 사용한다 — 위치 결정은 부모가 한다.
 */
export function SubscribePill({ subscribed, pressName, onClick }: SubscribePillProps) {
  const label = subscribed ? '× 해지하기' : '+ 구독하기';
  const aria = subscribed
    ? `${pressName} 구독 해지`
    : `${pressName} 구독하기`;

  return (
    <button
      type="button"
      className={`${styles.pill} ${subscribed ? styles.subscribed : styles.unsubscribed}`}
      aria-label={aria}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
