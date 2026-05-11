const Header = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = dayNames[today.getDay()];

    return `${year}. ${month}. ${day}. ${dayName}`;
  };

  return (
    <header className="flex justify-between items-center w-[var(--width-content)] h-[29px] mt-[58px]">
      <div className="flex items-center gap-2 text-[var(--color-ink)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
        <h1 className="font-[var(--font-primary)] text-[24px] font-bold leading-none">뉴스스탠드</h1>
      </div>
      <div className="font-[var(--font-primary)] text-[16px] font-medium text-[var(--color-sub)]">
        {getTodayDate()}
      </div>
    </header>
  );
};

export default Header;
