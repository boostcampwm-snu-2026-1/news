import styles from './SubscribePill.module.css';

const SubscribePill = ({ isSubscribed, onClick }) => {
  return (
    <button className={styles.pill} onClick={onClick}>
      <span className={styles.icon}>{isSubscribed ? '−' : '+'}</span>
      <span className={styles.text}>{isSubscribed ? '해지하기' : '구독하기'}</span>
    </button>
  );
};

export default SubscribePill;
