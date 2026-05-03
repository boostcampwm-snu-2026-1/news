const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const day = DAYS[date.getDay()];
  return `${y}.${m}.${d} ${day}요일`;
}

export function Header() {
  const today = formatDate(new Date());

  return (
    <header className="bg-surface border-b border-border">
      <div className="container-page flex items-center justify-between h-14">
        <h1 className="text-lg font-bold text-text-primary tracking-tight">
          뉴스스탠드
        </h1>
        <time className="text-sm text-text-secondary">{today}</time>
      </div>
    </header>
  );
}
