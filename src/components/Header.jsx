export default function Header() {
  const today = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date())

  return (
    <header className="header">
      <h1 className="header__title">뉴스스탠드</h1>
      <time className="header__date" dateTime={new Date().toISOString()}>
        {today}
      </time>
    </header>
  )
}
