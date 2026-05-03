import styles from './Header.module.css'

function formatDate(): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(new Date())
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🗞 뉴스스탠드</div>
      <div className={styles.date}>{formatDate()}</div>
    </header>
  )
}
