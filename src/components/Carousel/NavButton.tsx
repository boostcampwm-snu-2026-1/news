interface NavButtonProps {
  dir: 'prev' | 'next';
  left: string;
  disabled: boolean;
  label?: string;
  onClick: () => void;
}

const ICON_PATH = {
  prev: 'M15 18l-6-6 6-6',
  next: 'M9 18l6-6-6-6',
};

export function NavButton({ dir, left, disabled, label, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'prev' ? '이전' : '다음'}
      disabled={disabled}
      style={{ left }}
      className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                 text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors duration-150"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={ICON_PATH[dir]} />
      </svg>
      {label && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap
                         text-xs font-medium bg-text-primary text-white rounded px-2 py-1
                         opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          {label}
        </span>
      )}
    </button>
  );
}
