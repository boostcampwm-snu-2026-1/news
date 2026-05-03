type Props = {
  title: string
  family?: 'sans' | 'serif' | 'mono'
  italic?: boolean
  weight?: 400 | 500 | 700 | 800
  tracking?: 'tight' | 'normal' | 'wide'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function PressWordmark({
  title,
  family = 'sans',
  italic = false,
  weight = 700,
  tracking = 'normal',
  size = 'md',
}: Props) {

  return (
    <span
      className="press-wordmark"
      data-family={family}
      data-italic={italic ? 'true' : 'false'}
      data-tracking={tracking}
      data-size={size}
      style={{ fontWeight: weight }}
    >
      {title}
    </span>
  )
}
