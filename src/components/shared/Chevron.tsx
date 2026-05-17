import type { CSSProperties } from "react";

import styles from "./Chevron.module.css";

type ChevronProps = {
  dir: "left" | "right";
  disabled: boolean;
  offsetTop?: number;
  onClick: () => void;
};

type ChevronStyle = CSSProperties & {
  "--chevron-top"?: string;
};

export function Chevron({ dir, disabled, offsetTop = 430, onClick }: ChevronProps) {
  return (
    <button
      aria-label={dir === "left" ? "이전 페이지" : "다음 페이지"}
      className={`${styles.chevron} ${styles[dir]}`}
      style={{ "--chevron-top": `${offsetTop}px` } as ChevronStyle}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}
