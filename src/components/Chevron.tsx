import styles from './Chevron.module.css';

type Props = {
  dir: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
};

export default function Chevron({ dir, disabled, onClick }: Props) {
  const isLeft = dir === 'left';
  return (
    <button
      type="button"
      aria-label={isLeft ? '이전 페이지' : '다음 페이지'}
      disabled={disabled}
      className={`${styles.root} ${isLeft ? styles.left : styles.right} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={onClick}
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
        {isLeft ? (
          <polyline points="16,8 8,20 16,32" />
        ) : (
          <polyline points="8,8 16,20 8,32" />
        )}
      </svg>
    </button>
  );
}
