import styles from './SubscribePill.module.css';

interface SubscribePillProps {
  isSubscribed: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const SubscribePill = ({ isSubscribed, onClick }: SubscribePillProps) => {
  return (
    <button className={styles.pill} onClick={onClick}>
      <span className={styles.icon}>{isSubscribed ? '−' : '+'}</span>
      <span className={styles.text}>{isSubscribed ? '해지하기' : '구독하기'}</span>
    </button>
  );
};

export default SubscribePill;
