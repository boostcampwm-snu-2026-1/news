import styles from './Header.module.css'

interface HeaderProps {
  date: Date
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function Header({ date }: HeaderProps) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const w = WEEKDAYS[date.getDay()]

  return (
    <header className={styles.header}>
      <span className={styles.logo}>뉴스스탠드</span>
      <span className={styles.date}>
        {y}년 {m}월 {d}일 {w}요일
      </span>
    </header>
  )
}
