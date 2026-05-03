import type { CSSProperties } from 'react'
import type { PressWordmark as PressWordmarkType } from '../../types'

interface PressWordmarkProps {
  wordmark: PressWordmarkType
}

const FONT_SANS = '"Pretendard Variable", Pretendard, "Noto Sans KR", sans-serif'
const FONT_SERIF = '"Noto Serif KR", serif'

function FlagGlyph() {
  return (
    <svg
      width="7"
      height="9"
      viewBox="0 0 7 9"
      className="inline-block ml-0.5 align-middle"
      aria-hidden="true"
    >
      <rect width="7" height="6.5" fill="#D0021B" />
      <rect x="0" y="6.5" width="1.5" height="2.5" fill="#D0021B" />
    </svg>
  )
}

function renderChars(
  name: string,
  accent: string | undefined,
  accentChar: number | undefined,
  accentUnder: number[] | undefined,
  accentBg: boolean | undefined,
) {
  if (accent === undefined) return <>{name}</>

  return (
    <>
      {Array.from(name).map((char, i) => {
        const isAccentChar = i === accentChar
        const isAccentUnder = accentUnder?.includes(i) ?? false
        if (!isAccentChar && !isAccentUnder) {
          // biome-ignore lint/suspicious/noArrayIndexKey: static string, never reorders
          return <span key={i}>{char}</span>
        }

        const style: CSSProperties = {
          color: isAccentChar ? accent : undefined,
          textDecoration: isAccentUnder ? 'underline' : undefined,
          textDecorationColor: isAccentUnder ? accent : undefined,
          ...(isAccentChar && accentBg
            ? { background: accent, color: '#fff', borderRadius: '2px', padding: '0 1px' }
            : {}),
        }
        // biome-ignore lint/suspicious/noArrayIndexKey: static string, never reorders
        return <span key={i} style={style}>{char}</span>
      })}
    </>
  )
}

export function PressWordmark({ wordmark }: PressWordmarkProps) {
  const { name, color, bg, weight, family, italic, underline, tracking, accent, accentChar, accentUnder, accentBg, flag, latin, small } = wordmark

  const textStyle: CSSProperties = {
    color,
    fontWeight: weight,
    fontFamily: family === 'serif' ? FONT_SERIF : FONT_SANS,
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: underline ? 'underline' : 'none',
    letterSpacing: tracking ?? (latin ? '0' : '-0.01em'),
    fontSize: small ? '14px' : '16px',
    lineHeight: '1.15',
  }

  const content = (
    <span style={textStyle}>
      {renderChars(name, accent, accentChar, accentUnder, accentBg)}
      {flag && <FlagGlyph />}
    </span>
  )

  if (bg) {
    return (
      <span
        className="inline-flex flex-wrap items-center justify-center px-1.5 py-0.5 rounded-[2px]"
        style={{ background: bg }}
      >
        {content}
      </span>
    )
  }

  return (
    <span
      className="inline-flex flex-wrap items-center justify-center max-w-[88%] break-keep"
    >
      {content}
    </span>
  )
}
