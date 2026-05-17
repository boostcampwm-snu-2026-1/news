import { type Press } from "../data/newsstand";

interface PressWordmarkProps {
  press: Press;
  compact?: boolean;
}

export function PressWordmark({ press, compact = false }: PressWordmarkProps) {
  const { wordmark } = press;
  const characters = Array.from(press.name);

  return (
    <span
      className={[
        "wordmark",
        `wordmark--${wordmark.family}`,
        wordmark.italic ? "wordmark--italic" : "",
        compact ? "wordmark--compact" : "",
        wordmark.small ? "wordmark--small" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        color: wordmark.color,
        fontWeight: wordmark.weight,
        letterSpacing: wordmark.tracking,
        backgroundColor: wordmark.background
      }}
      aria-label={press.name}
    >
      {characters.map((character, index) => {
        const isAccent = wordmark.accentChar === index;
        const isUnderlined = wordmark.underlineIndices?.includes(index);

        return (
          <span
            key={`${press.id}-${index}`}
            className={isUnderlined ? "wordmark__char wordmark__char--underline" : "wordmark__char"}
            style={{ color: isAccent ? wordmark.accentColor : undefined }}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </span>
  );
}
