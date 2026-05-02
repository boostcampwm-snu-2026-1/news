import styles from './Chevron.module.css'

interface ChevronProps {
  dir: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

export function Chevron({ dir, disabled, onClick }: ChevronProps) {
  return (
    <button
      className={`${styles.chevron} ${dir === 'left' ? styles.left : styles.right}`}
      disabled={disabled}
      aria-label={dir === 'left' ? '이전 페이지' : '다음 페이지'}
      onClick={onClick}
    >
      {dir === 'left' ? (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 1 2 8 8 15" />
        </svg>
      ) : (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2 1 8 8 2 15" />
        </svg>
      )}
    </button>
  )
}
