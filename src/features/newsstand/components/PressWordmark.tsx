import type { CSSProperties } from "react";

import type { Press, WordmarkStyle } from "../types";

type PressWordmarkProps = {
  press: Pick<Press, "name" | "wordmark">;
};

export function PressWordmark({ press }: PressWordmarkProps) {
  const style = press.wordmark;
  const letters = Array.from(press.name);

  return (
    <span className={getClassName(style)} style={getStyle(style)}>
      <span className="press-wordmark-label">
        {letters.map((letter, index) => (
          <span className={getLetterClassName(style, index)} key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
        {style.flag ? <span className="press-wordmark-flag" aria-hidden="true" /> : null}
      </span>
    </span>
  );
}

function getClassName(style: WordmarkStyle) {
  const classNames = ["press-wordmark"];

  if (style.bg) {
    classNames.push("press-wordmark-chip");
  }

  if (style.small) {
    classNames.push("press-wordmark-small");
  }

  if (style.underline) {
    classNames.push("press-wordmark-underlined");
  }

  return classNames.join(" ");
}

function getLetterClassName(style: WordmarkStyle, index: number) {
  const classNames = ["press-wordmark-letter"];

  if (style.accentChar === index || style.accentUnder?.includes(index)) {
    classNames.push("press-wordmark-letter-accent");
  }

  if (style.accentChar === index && style.accentBg) {
    classNames.push("press-wordmark-letter-chip");
  }

  if (style.accentUnder?.includes(index)) {
    classNames.push("press-wordmark-letter-underlined");
  }

  return classNames.join(" ");
}

function getStyle(style: WordmarkStyle): CSSProperties {
  return {
    "--press-wordmark-bg": style.bg,
    "--press-wordmark-color": style.color,
    "--press-wordmark-accent": style.accent,
    fontFamily: getFontFamily(style),
    fontStyle: style.italic ? "italic" : undefined,
    fontWeight: style.weight,
    letterSpacing: style.tracking ?? (style.latin ? "var(--letter-spacing-default)" : undefined),
  } as CSSProperties;
}

function getFontFamily(style: WordmarkStyle) {
  if (style.family === "serif") {
    return "var(--font-serif)";
  }

  return "var(--font-sans)";
}
