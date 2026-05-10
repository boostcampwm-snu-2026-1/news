import styles from './Header.module.css';

type Props = {
  date: string;
};

export default function Header({ date }: Props) {
  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#14212B"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="14" height="14" rx="1" />
          <path d="M17 8h4v9a2 2 0 0 1-2 2H17" />
          <line x1="6" y1="9" x2="14" y2="9" />
          <line x1="6" y1="12" x2="14" y2="12" />
          <line x1="6" y1="15" x2="11" y2="15" />
        </svg>
        <span className={styles.title}>뉴스스탠드</span>
      </div>
      <span className={styles.date}>{date}</span>
    </header>
  );
}
