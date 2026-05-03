import type { HTMLAttributes, ReactNode } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ')
}

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
