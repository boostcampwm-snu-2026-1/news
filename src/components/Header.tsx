function getFormattedDate() {
  const now = new Date()
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const day = days[now.getDay()]
  return `${yyyy}. ${mm}. ${dd}. ${day}`
}

export default function Header() {
  return (
    <header className="header">
      <div className="header__title">
        <NewspaperIcon />
        <span className="header__wordmark">뉴스스탠드</span>
      </div>
      <time className="header__date">{getFormattedDate()}</time>
    </header>
  )
}

function NewspaperIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="16" rx="1" stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x="17" y="7" width="4" height="13" rx="1" stroke="var(--color-ink)" strokeWidth="1.5" />
      <line x1="6" y1="8" x2="14" y2="8" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="11" x2="14" y2="11" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="14" x2="11" y2="14" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
