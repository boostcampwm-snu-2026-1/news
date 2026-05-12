import type { PressWordmark as PressWordmarkType } from "../../types/newsstand";
import styles from "./PressWordmark.module.css";

type PressWordmarkProps = {
  wordmark: PressWordmarkType;
};

export function PressWordmark({ wordmark }: PressWordmarkProps) {
  const style = {
    color: wordmark.color,
    backgroundColor: wordmark.bg,
    fontFamily: wordmark.family === "serif" ? "var(--font-serif-ko)" : "var(--font-sans)",
    fontStyle: wordmark.italic ? "italic" : undefined,
    fontWeight: wordmark.weight,
    letterSpacing: wordmark.latin ? "0" : wordmark.tracking,
    textDecoration: wordmark.underline ? "underline" : undefined,
  };

  return (
    <span className={`${styles.wordmark} wordmark`} style={style}>
      {wordmark.name}
    </span>
  );
}
