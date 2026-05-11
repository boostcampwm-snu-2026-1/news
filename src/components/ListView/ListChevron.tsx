import styles from './ListChevron.module.css'

interface Props {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}

export default function ListChevron({ direction, disabled, onClick }: Props) {
  return (
    <button
      className={`${styles.chevron} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? '이전 언론사' : '다음 언론사'}
    >
      {direction === 'left' ? '❮' : '❯'}
    </button>
  )
}
