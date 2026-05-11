export default function Header() {
  const today = new Date();
  const dateString = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  }).format(today);

  return (
    <header className="h-[48px] flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3333 3H4.66667C3.74619 3 3 3.74619 3 4.66667V19.3333C3 20.2538 3.74619 21 4.66667 21H19.3333C20.2538 21 21 20.2538 21 19.3333V4.66667C21 3.74619 20.2538 3 19.3333 3Z" stroke="#14212B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 8H17" stroke="#14212B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 12H17" stroke="#14212B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16H13" stroke="#14212B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-2xl font-bold text-ink">뉴스스탠드</h1>
      </div>
      <div className="text-sub font-medium">{dateString}</div>
    </header>
  );
}
