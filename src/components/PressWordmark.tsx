type Props = {
  title: string
  family?: 'sans' | 'serif' | 'mono'
  italic?: boolean
  weight?: 400 | 500 | 700 | 800
  tracking?: 'tight' | 'normal' | 'wide'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  flag?: string
  accent?: 'default' | 'accent' | 'muted'
}

export default function PressWordmark({
  title,
  family = 'sans',
  italic = false,
  weight = 700,
  tracking = 'normal',
  size = 'md',
  flag,
  accent = 'default',
}: Props) {

  return (
    <span
      className="press-wordmark"
      data-family={family}
      data-italic={italic ? 'true' : 'false'}
      data-tracking={tracking}
      data-size={size}
      data-accent={accent}
    >
      <span className="press-wordmark-main" style={{ fontWeight: weight }}>
        {title}
      </span>
      {flag && <span className="press-wordmark-flag">{flag}</span>}
    </span>
  )
}
