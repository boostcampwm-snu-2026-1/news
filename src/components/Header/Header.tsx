import styles from './Header.module.css'

function formatDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(now)
  return `${year}. ${month}. ${day}. ${weekday}`
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🗞 뉴스스탠드</div>
      <div className={styles.date}>{formatDate()}</div>
    </header>
  )
}
