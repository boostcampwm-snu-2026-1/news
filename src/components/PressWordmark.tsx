import type { CSSProperties } from 'react'
import type { Publisher, WordmarkFamily } from '../types/newsStand'

const fontFamilyByWordmark = {
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
} as const satisfies Record<WordmarkFamily, string>

interface PressWordmarkProps {
  publisher: Pick<Publisher, 'name' | 'wordmark'>
  className?: string
}

export function PressWordmark({ publisher, className = '' }: PressWordmarkProps) {
  const { name, wordmark } = publisher
  const accentUnderSet = new Set(wordmark.accentUnder ?? [])
  const rootStyle: CSSProperties = {
    color: wordmark.color ?? 'var(--color-ink)',
    backgroundColor: wordmark.backgroundColor,
    borderRadius: wordmark.backgroundColor ? 'var(--radius-sub)' : undefined,
    fontFamily: fontFamilyByWordmark[wordmark.family ?? 'sans'],
    fontSize: wordmark.small ? '14px' : '16px',
    fontStyle: wordmark.italic ? 'italic' : undefined,
    fontWeight: wordmark.weight ?? 700,
    letterSpacing: wordmark.tracking ?? (wordmark.latin ? '0' : '-0.01em'),
    padding: wordmark.backgroundColor ? '2px 6px' : undefined,
    textDecorationLine: wordmark.underline ? 'underline' : undefined,
    textUnderlineOffset: wordmark.underline ? '0.14em' : undefined,
  }

  return (
    <span
      aria-label={name}
      className={`inline-flex max-w-[88%] flex-wrap items-center justify-center text-center align-middle leading-[1.15] [word-break:keep-all] ${className}`}
      role="img"
      style={rootStyle}
    >
      {Array.from(name).map((character, index) => (
        <span
          key={`${character}-${index}`}
          style={getCharacterStyle({
            accent: wordmark.accent,
            accentBackground: wordmark.accentBackground,
            isAccentCharacter: wordmark.accentChar === index,
            isAccentUnder: accentUnderSet.has(index),
          })}
        >
          {character}
        </span>
      ))}
      {wordmark.flag ? <FlagGlyph /> : null}
    </span>
  )
}

interface CharacterStyleOptions {
  accent: Publisher['wordmark']['accent']
  accentBackground: Publisher['wordmark']['accentBackground']
  isAccentCharacter: boolean
  isAccentUnder: boolean
}

function getCharacterStyle({
  accent,
  accentBackground,
  isAccentCharacter,
  isAccentUnder,
}: CharacterStyleOptions): CSSProperties | undefined {
  if (!accent || (!isAccentCharacter && !isAccentUnder)) {
    return undefined
  }

  return {
    backgroundColor: isAccentCharacter && accentBackground ? accent : undefined,
    borderRadius: isAccentCharacter && accentBackground ? 'var(--radius-sub)' : undefined,
    color: isAccentCharacter
      ? accentBackground
        ? 'var(--color-card)'
        : accent
      : undefined,
    marginInline: isAccentCharacter && accentBackground ? '0.04em' : undefined,
    paddingInline: isAccentCharacter && accentBackground ? '0.12em' : undefined,
    textDecorationColor: isAccentUnder ? accent : undefined,
    textDecorationLine: isAccentUnder ? 'underline' : undefined,
    textUnderlineOffset: isAccentUnder ? '0.14em' : undefined,
  }
}

function FlagGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="ml-1 size-2 shrink-0 self-start"
      fill="none"
      viewBox="0 0 8 8"
    >
      <path d="M1 1h5l-1.3 2L6 5H1z" fill="#E3483E" />
    </svg>
  )
}
