import styles from "./Chevron.module.css";

type ChevronProps = {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
};

export function Chevron({ dir, disabled, onClick }: ChevronProps) {
  return (
    <button
      aria-label={dir === "left" ? "이전 페이지" : "다음 페이지"}
      className={`${styles.chevron} ${styles[dir]}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}
