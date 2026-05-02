import type { WordmarkStyle } from '../data/press';
import './PressWordmark.css';

interface PressWordmarkProps {
  name: string;
  style: WordmarkStyle;
  scale?: number;
}

function PressWordmark({ name, style, scale }: PressWordmarkProps) {
  const {
    color,
    bg,
    weight = 500,
    family = 'sans',
    italic,
    underline,
    tracking,
    accent,
    accentChar,
    accentUnder,
    accentBg,
    flag,
    latin,
    small,
  } = style;

  const wrapStyle: React.CSSProperties = {
    fontWeight: weight,
    fontFamily: family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
    fontStyle: italic ? 'italic' : undefined,
    letterSpacing: tracking ?? (latin ? '0' : '-0.01em'),
    fontSize: small ? 14 : 16,
    transform: scale ? `scale(${scale})` : undefined,
    transformOrigin: 'left center',
  };

  if (bg) {
    return (
      <span
        className="wordmark wordmark--chip"
        style={{
          ...wrapStyle,
          color: color ?? '#FFFFFF',
          backgroundColor: bg,
          borderRadius: 'var(--r-sub)',
          padding: '4px 8px',
        }}
      >
        {name}
      </span>
    );
  }

  const chars = Array.from(name);

  return (
    <span className="wordmark" style={wrapStyle}>
      {chars.map((char, i) => {
        const isAccent = accentChar !== undefined && i === accentChar;
        const isAccentUnder = accentUnder?.includes(i);
        const baseColor = isAccent ? accent : color;
        const finalColor = isAccent && accentBg ? '#FFFFFF' : baseColor;
        const charStyle: React.CSSProperties = {
          color: finalColor,
          textDecoration:
            underline || isAccentUnder ? 'underline' : undefined,
          textUnderlineOffset: '3px',
          backgroundColor: isAccent && accentBg ? accent : undefined,
        };

        return (
          <span key={i} style={charStyle}>
            {char}
          </span>
        );
      })}
      {flag && <span className="wordmark__flag" aria-hidden="true">&#9873;</span>}
    </span>
  );
}

export default PressWordmark;
