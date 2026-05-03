interface PaginationProps {
  pageIndex: number
  pageCount: number
  onPrevious: () => void
  onNext: () => void
}

export function Pagination({
  pageIndex,
  pageCount,
  onPrevious,
  onNext,
}: PaginationProps) {
  const isPreviousDisabled = pageIndex <= 0
  const isNextDisabled = pageIndex >= pageCount - 1
  const pageStatus = pageCount > 0 ? `${pageIndex + 1}/${pageCount}` : '0/0'

  return (
    <>
      <button
        aria-label={`이전 페이지 (${pageStatus})`}
        className="absolute top-1/2 left-2 flex h-10 w-6 -translate-y-1/2 items-center justify-center text-mute transition-[color,opacity] hover:text-sub focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-0 lg:-left-[72px]"
        disabled={isPreviousDisabled}
        onClick={onPrevious}
        type="button"
      >
        <ChevronIcon direction="previous" />
      </button>
      <button
        aria-label={`다음 페이지 (${pageStatus})`}
        className="absolute top-1/2 right-2 flex h-10 w-6 -translate-y-1/2 items-center justify-center text-mute transition-[color,opacity] hover:text-sub focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-0 lg:-right-[72px]"
        disabled={isNextDisabled}
        onClick={onNext}
        type="button"
      >
        <ChevronIcon direction="next" />
      </button>
    </>
  )
}

interface ChevronIconProps {
  direction: 'previous' | 'next'
}

function ChevronIcon({ direction }: ChevronIconProps) {
  const path =
    direction === 'previous' ? 'M15 8l-6 8 6 8' : 'M9 8l6 8-6 8'

  return (
    <svg
      aria-hidden="true"
      className="h-10 w-6"
      fill="none"
      viewBox="0 0 24 40"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}
