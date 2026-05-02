import type { Press } from '../../data/presses'
import styles from './PressWordmark.module.css'

interface PressWordmarkProps {
  press: Press
  size?: number
}

const FAMILY_MAP = {
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
}

export function PressWordmark({ press, size = 16 }: PressWordmarkProps) {
  const { name, color, bg, weight, family, italic, tracking, accent, accentChar } = press

  const baseStyle: React.CSSProperties = {
    fontFamily: FAMILY_MAP[family],
    fontSize: size,
    fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    letterSpacing: tracking,
    background: bg,
    color,
  }

  if (!accent || !accentChar) {
    return (
      <span className={styles.wordmark} style={baseStyle}>
        {name}
      </span>
    )
  }

  const chars = name.split('')
  return (
    <span className={styles.wordmark} style={baseStyle}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={styles.char}
          style={ch === accentChar ? { color: accent } : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
