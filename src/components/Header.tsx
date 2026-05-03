import './Header.css';

interface HeaderProps {
  date: string;
}

function Header({ date }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__left">
        <svg
          className="header__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <rect x="10" y="6" width="8" height="4" rx="1" />
        </svg>
        <h1 className="header__title">뉴스스탠드</h1>
      </div>
      <time className="header__date">{date}</time>
    </header>
  );
}

export default Header;
