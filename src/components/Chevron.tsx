import React from 'react';

interface ChevronProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

export default function Chevron({ direction, onClick, disabled = false }: ChevronProps) {
  if (disabled) return null;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-card border border-line shadow-sm hover:bg-soft transition-colors z-10 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        direction === 'left' ? '-left-[60px]' : '-right-[60px]'
      }`}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} page`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sub"
      >
        {direction === 'left' ? (
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
