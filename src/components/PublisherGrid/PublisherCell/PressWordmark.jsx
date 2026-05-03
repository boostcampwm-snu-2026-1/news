import styles from './PressWordmark.module.css'

export default function PressWordmark({ press }) {
  const {
    name,
    color = '#14212B',
    bg,
    weight = 500,
    family = 'sans',
    italic = false,
    underline = false,
    tracking,
    accentChar,
    accentColor,
    flag = false,
    latin = false,
    small = false,
  } = press

  const wrapStyle = {
    fontFamily: family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
    fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    fontSize: small ? '14px' : '16px',
    letterSpacing: latin ? '0' : (tracking ?? '-0.01em'),
    color: bg ? undefined : color,
  }

  if (bg) {
    return (
      <span className={styles.chip} style={{ background: bg, color }}>
        {name}
      </span>
    )
  }

  if (accentChar !== undefined) {
    const chars = name.split('')
    return (
      <span className={styles.wordmark} style={wrapStyle}>
        {chars.map((ch, i) => (
          <span key={i} style={i === accentChar ? { color: accentColor } : undefined}>
            {ch}
          </span>
        ))}
        {flag && <FlagGlyph />}
        {underline && <span className={styles.underlineMark} />}
      </span>
    )
  }

  return (
    <span className={styles.wordmark} style={{ ...wrapStyle, textDecoration: underline ? 'underline' : 'none' }}>
      {name}
      {flag && <FlagGlyph />}
    </span>
  )
}

function FlagGlyph() {
  return (
    <svg
      className={styles.flag}
      width="6" height="8"
      viewBox="0 0 6 8"
      fill="none"
      aria-hidden="true"
    >
      <rect width="6" height="8" fill="#E83C2A"/>
    </svg>
  )
}
