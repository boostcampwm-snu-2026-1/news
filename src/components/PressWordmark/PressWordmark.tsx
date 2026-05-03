import type { CSSProperties } from "react";
import type { PressWordmarkSpec } from "../../state/types";
import styles from "./PressWordmark.module.css";

export interface PressWordmarkProps {
  spec: PressWordmarkSpec;
}

export function PressWordmark({ spec }: PressWordmarkProps) {
  const {
    name,
    color,
    bg,
    weight = 500,
    family = "sans",
    italic = false,
    underline = false,
    tracking,
    accent,
    accentChar,
    accentUnder,
    accentBg = false,
    flag = false,
    latin = false,
    small = false,
  } = spec;

  const baseStyle: CSSProperties = {
    color,
    fontWeight: weight,
    fontFamily: family === "serif" ? "var(--ff-serif)" : "var(--ff-sans)",
    fontSize: small ? "14px" : "16px",
  };
  if (italic) baseStyle.fontStyle = "italic";
  if (underline) baseStyle.textDecoration = "underline";
  if (tracking) baseStyle.letterSpacing = tracking;
  else if (latin) baseStyle.letterSpacing = "0";
  if (bg) {
    baseStyle.backgroundColor = bg;
    baseStyle.padding = "2px 6px";
    baseStyle.borderRadius = "var(--r-sub)";
  }

  const needsCharSplit =
    accentChar !== undefined || (accentUnder && accentUnder.length > 0) || accentBg;

  return (
    <span className={styles.wordmark} style={baseStyle}>
      {needsCharSplit ? renderChars(name, accent, accentChar, accentUnder, accentBg) : name}
      {flag && <FlagGlyph />}
    </span>
  );
}

function renderChars(
  name: string,
  accent: string | undefined,
  accentChar: number | undefined,
  accentUnder: number[] | undefined,
  accentBg: boolean,
) {
  const chars = [...name];
  return chars.map((ch, i) => {
    const isAccent = i === accentChar;
    const isUnder = accentUnder?.includes(i) ?? false;
    const style: CSSProperties = {};
    if (isAccent && accent) {
      if (accentBg) {
        style.backgroundColor = accent;
        style.color = "#FFFFFF";
        style.padding = "0 4px";
        style.borderRadius = "var(--r-sub)";
      } else {
        style.color = accent;
      }
    }
    if (isUnder) {
      style.textDecoration = "underline";
    }
    return (
      <span key={i} style={style}>
        {ch}
      </span>
    );
  });
}

function FlagGlyph() {
  return (
    <svg
      className={styles.flag}
      width="10"
      height="12"
      viewBox="0 0 10 12"
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="1" y2="11" stroke="#14212B" strokeWidth="1" />
      <path d="M1 1 L9 1 L7 4 L9 7 L1 7 Z" fill="#C73E2C" />
    </svg>
  );
}
