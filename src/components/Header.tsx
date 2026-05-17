interface HeaderProps {
  dateLabel: string;
}

export function Header({ dateLabel }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__mark" aria-hidden="true">
          N
        </span>
        <div>
          <p className="header__eyebrow">NEWSSTAND</p>
          <h1>뉴스스탠드</h1>
        </div>
      </div>
      <p className="header__date">{dateLabel}</p>
    </header>
  );
}
