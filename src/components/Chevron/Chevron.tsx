import styles from "./Chevron.module.css";

export interface ChevronProps {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}

export function Chevron({ dir, disabled, onClick }: ChevronProps) {
  const positionClass = dir === "left" ? "chevron-left" : "chevron-right";
  const label = dir === "left" ? "이전 페이지" : "다음 페이지";
  return (
    <button
      className={`${positionClass} ${styles.chevron} ${disabled ? styles.disabled : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <svg width="24" height="40" viewBox="0 0 24 40" aria-hidden="true">
        {dir === "left" ? (
          <polyline
            points="16,8 8,20 16,32"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <polyline
            points="8,8 16,20 8,32"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
