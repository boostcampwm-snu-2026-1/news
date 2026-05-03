import type { HTMLAttributes, ReactNode } from 'react'

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ')
}

export function NewsStandFrame({
  children,
  className,
  ...props
}: LayoutProps) {
  return (
    <div
      className={cn(
        'mx-auto w-[1034px] max-w-[calc(100vw-48px)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function NewsStandContent({
  children,
  className,
  ...props
}: LayoutProps) {
  return (
    <div
      className={cn('mx-auto w-[930px] max-w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}
