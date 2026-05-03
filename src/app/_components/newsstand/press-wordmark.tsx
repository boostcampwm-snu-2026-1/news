import type { CSSProperties } from "react";
import type { Wordmark } from "../../_data/newsstand";

type PressWordmarkProps = {
  name: string;
  wordmark?: Wordmark;
};

export function PressWordmark({ name, wordmark = {} }: PressWordmarkProps) {
  const chars = Array.from(name);
  const style = {
    "--wordmark-color": wordmark.color ?? "var(--ink-alt)",
    "--wordmark-bg": wordmark.bg ?? "transparent",
    "--wordmark-weight": wordmark.weight ?? 500,
    "--wordmark-family":
      wordmark.family === "serif" ? "var(--font-serif)" : "var(--font-sans)",
    "--wordmark-tracking": wordmark.latin
      ? "0"
      : (wordmark.tracking ?? "-0.01em"),
  } as CSSProperties;

  return (
    <span
      className={[
        "wordmark",
        wordmark.bg ? "has-bg" : "",
        wordmark.italic ? "is-italic" : "",
        wordmark.underline ? "is-underlined" : "",
        wordmark.small ? "is-small" : "",
      ].join(" ")}
      style={style}
    >
      {chars.map((char, index) => {
        const accented = index === wordmark.accentChar;
        const underlined = wordmark.accentUnder?.includes(index);

        return (
          <span
            className={[
              accented ? "is-accented" : "",
              underlined ? "is-accent-underlined" : "",
              accented && wordmark.accentBg ? "has-accent-bg" : "",
            ].join(" ")}
            style={
              accented && wordmark.accent
                ? ({ "--accent-char": wordmark.accent } as CSSProperties)
                : undefined
            }
            key={`${char}-${index}`}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        );
      })}
      {wordmark.flag ? <span className="flag-glyph" aria-hidden="true" /> : null}
    </span>
  );
}
