import styles from './Chevron.module.css';

type ChevronProps = {
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
};

export function Chevron({ dir, disabled, onClick }: ChevronProps) {
  const label = dir === 'left' ? '이전 페이지' : '다음 페이지';
  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 40"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === 'right' ? (
          <polyline points="9,12 17,20 9,28" />
        ) : (
          <polyline points="15,12 7,20 15,28" />
        )}
      </svg>
    </button>
  );
}
