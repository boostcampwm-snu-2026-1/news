type ChevronRailButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
  className?: string
  ariaLabel: string
}

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ')
}

export function ChevronRailButton({
  direction,
  onClick,
  disabled,
  className,
  ariaLabel,
}: ChevronRailButtonProps) {
  const isLeft = direction === 'left'
  const positionClass = isLeft ? '-left-14' : '-right-14'

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'absolute inset-y-0 hidden w-12 cursor-pointer place-content-center place-items-center bg-transparent text-[#879298] transition hover:bg-[#F5F7F9] hover:text-[#14212B] disabled:cursor-default disabled:opacity-0 lg:grid',
        positionClass,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-10 w-10"
      >
        <path
          d={isLeft ? 'M14 7L9 12L14 17' : 'M10 7L15 12L10 17'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
