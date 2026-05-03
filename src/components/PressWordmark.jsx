export default function PressWordmark({ press }) {
  const wordmark = press.wordmark ?? press
  const family = wordmark.family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)'
  const fontSize = wordmark.compact ? '14px' : '16px'

  return (
    <span
      className="press-wordmark"
      style={{
        color: wordmark.color,
        background: wordmark.background,
        fontFamily: family,
        fontSize,
        fontStyle: wordmark.italic ? 'italic' : 'normal',
        fontWeight: wordmark.weight,
        letterSpacing: wordmark.tracking,
        textDecoration: wordmark.underline ? 'underline' : 'none',
      }}
    >
      {wordmark.label ?? press.name}
    </span>
  )
}
