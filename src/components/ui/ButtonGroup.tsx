import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react'

type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

type ButtonGroupItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ')
}

export function ButtonGroup({
  children,
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ButtonGroupItem({
  active = false,
  className,
  children,
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      type="button"
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        'inline-flex h-6 w-6 cursor-pointer items-center justify-center',
        active ? 'text-[#14212B]' : 'text-[#879298]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
