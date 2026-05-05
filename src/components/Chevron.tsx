import './Chevron.css'

interface ChevronProps {
  dir: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

export default function Chevron({ dir, disabled, onClick }: ChevronProps) {
  return (
    <button
      className={`chevron chevron--${dir}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? '이전 페이지' : '다음 페이지'}
      aria-disabled={disabled}
    >
      <svg width="24" height="40" viewBox="0 0 24 40" fill="none" aria-hidden="true">
        {dir === 'left'
          ? <polyline points="16,8 8,20 16,32" stroke="#879298" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          : <polyline points="8,8 16,20 8,32" stroke="#879298" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  )
}
