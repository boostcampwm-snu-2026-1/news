import styles from './GridView.module.css'

interface Props {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

export default function GridChevron({ direction, disabled, onClick }: Props) {
  return (
    <button
      className={`${styles.chevron} ${disabled ? styles.chevronDisabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? '이전 페이지' : '다음 페이지'}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  )
}
