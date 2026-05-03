export default function Header({ dateLabel }: { dateLabel: string }) {
  return (
    <header className="newsstand-header">
      <div className="brand" aria-label="뉴스스탠드">
        <span className="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <path d="M7 8h10M7 12h10M7 16h6" />
          </svg>
        </span>
        <span className="brand-title">뉴스스탠드</span>
      </div>
      <p className="header-date">{dateLabel}</p>
    </header>
  )
}
