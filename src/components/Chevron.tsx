import './Chevron.css';

interface ChevronProps {
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}

function Chevron({ dir, disabled, onClick }: ChevronProps) {
  return (
    <button
      className={`chevron chevron--${dir}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={dir === 'left' ? '이전 페이지' : '다음 페이지'}
    >
      <svg
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === 'left' ? (
          <polyline points="16,8 8,20 16,32" />
        ) : (
          <polyline points="8,8 16,20 8,32" />
        )}
      </svg>
    </button>
  );
}

export default Chevron;
