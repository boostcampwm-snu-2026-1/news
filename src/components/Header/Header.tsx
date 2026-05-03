import styles from './Header.module.css';

const KOREAN_WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function formatKoreanDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const day = KOREAN_WEEKDAYS[date.getDay()];
  return `${y}. ${m}. ${d}. ${day}`;
}

type HeaderProps = {
  /** 표시할 날짜. 미지정 시 today (Date.now). */
  date?: Date;
};

export function Header({ date = new Date() }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NewspaperIcon className={styles.icon} />
        <span className={styles.brand}>뉴스스탠드</span>
      </div>
      <time className={styles.date} dateTime={date.toISOString().slice(0, 10)}>
        {formatKoreanDate(date)}
      </time>
    </header>
  );
}

/**
 * Newspaper icon — 24×24, stroke 1.5, currentColor.
 * Outline 스타일 (heroicons newspaper와 유사).
 */
function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h13A1.5 1.5 0 0 1 19 5.5V18a2 2 0 0 0 2 2H5a2 2 0 0 1-2-2V5.5Z" />
      <path d="M19 8h1.5A1.5 1.5 0 0 1 22 9.5V18a2 2 0 0 1-2 2" />
      <path d="M7 8h8M7 11h8M7 14h5" />
    </svg>
  );
}
