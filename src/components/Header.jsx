export default function Header() {
  const now = new Date()
  const today = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(now)

  return (
    <header className="header">
      <a className="header__brand" href="/" aria-label="뉴스스탠드 홈">
        <span className="header__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="header__title">뉴스스탠드</span>
      </a>
      <time className="header__date" dateTime={now.toISOString()}>
        {today}
      </time>
    </header>
  )
}
