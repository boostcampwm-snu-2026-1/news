import styles from './Header.module.css'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const day = DAYS[date.getDay()]
  return `${y}. ${m}. ${d}. ${day}요일`
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="20" height="18" rx="1" stroke="#14212B" strokeWidth="1.5"/>
          <path d="M6 7h12M6 11h8M6 15h6" stroke="#14212B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className={styles.wordmark}>뉴스스탠드</span>
      </div>
      <time className={styles.date}>{formatDate(new Date())}</time>
    </header>
  )
}
