import styles from "./Header.module.css";

export interface HeaderProps {
  date: string;
}

export function Header({ date }: HeaderProps) {
  return (
    <header className={`contentCol headerRow ${styles.header}`}>
      <div className={styles.brand}>
        <NewspaperIcon />
        <span className={styles.title}>뉴스스탠드</span>
      </div>
      <time className={styles.date}>{date}</time>
    </header>
  );
}

function NewspaperIcon() {
  return (
    <svg
      className={styles.icon}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="15" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M18 8h3v9a2 2 0 0 1-2 2H6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 9h9M6 12h9M6 15h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
