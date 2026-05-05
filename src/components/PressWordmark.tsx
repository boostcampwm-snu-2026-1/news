import './PressWordmark.css'

export interface PressData {
  id: string
  name: string
  color?: string         // 글자 색상
  bg?: string            // 배경 칩 색상
  weight?: 400 | 500 | 700
  family?: 'sans' | 'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string      // letter-spacing (예: '0.08em')
  flag?: boolean         // 빨간 깃발 아이콘 (아시아경제 등)
  small?: boolean        // 14px (긴 영문 이름)
}

interface Props {
  press: PressData
}

export default function PressWordmark({ press }: Props) {
  const style: React.CSSProperties = {
    color: press.color ?? 'var(--color-ink)',
    fontWeight: press.weight ?? 700,
    fontFamily: press.family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
    fontStyle: press.italic ? 'italic' : 'normal',
    textDecoration: press.underline ? 'underline' : 'none',
    letterSpacing: press.tracking ?? 'var(--tracking-ko)',
    fontSize: press.small ? '14px' : '16px',
    backgroundColor: press.bg,
    borderRadius: press.bg ? 'var(--radius-sub)' : undefined,
    padding: press.bg ? '2px 4px' : undefined,
  }

  return (
    <span className="press-wordmark" style={style}>
      {press.name}
      {press.flag && <FlagIcon />}
    </span>
  )
}

function FlagIcon() {
  return (
    <svg
      className="press-wordmark__flag"
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="#e03131"
      aria-hidden="true"
    >
      <path d="M1 0.5V9.5M1 0.5H7L5 4L7 7.5H1" stroke="#e03131" strokeWidth="1" fill="#e03131" />
    </svg>
  )
}
