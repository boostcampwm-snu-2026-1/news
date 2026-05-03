const DAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const day = DAYS[date.getDay()];
  return `${y}. ${m}. ${d}. ${day}`;
}

export default function Header() {
  return (
    <header className="max-w-[1080px] mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NewsIcon />
        <span className="text-xl font-bold">뉴스스탠드</span>
      </div>
      <span className="text-sm text-gray-500">{formatDate(new Date())}</span>
    </header>
  );
}

function NewsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="20" height="20" rx="2" fill="#555" />
      <rect x="4" y="4" width="8" height="5" rx="0.5" fill="white" />
      <rect x="4" y="11" width="14" height="1.5" rx="0.5" fill="white" />
      <rect x="4" y="14" width="14" height="1.5" rx="0.5" fill="white" />
      <rect x="14" y="4" width="4" height="5" rx="0.5" fill="white" />
    </svg>
  );
}
