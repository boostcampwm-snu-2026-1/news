import type { NewsstandViewMode } from '../types/newsStand'

const VIEW_OPTIONS = [
  { mode: 'list', label: '목록 보기' },
  { mode: 'grid', label: '그리드 보기' },
] as const satisfies readonly { mode: NewsstandViewMode; label: string }[]

interface ViewToggleProps {
  activeMode: NewsstandViewMode
  onModeChange: (mode: NewsstandViewMode) => void
}

export function ViewToggle({ activeMode, onModeChange }: ViewToggleProps) {
  return (
    <div aria-label="보기 방식" className="flex h-full items-center gap-1">
      {VIEW_OPTIONS.map((option) => {
        const isActive = option.mode === activeMode

        return (
          <button
            aria-label={option.label}
            aria-pressed={isActive}
            className={`flex size-6 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent ${
              isActive ? 'text-ink' : 'text-mute hover:text-sub'
            }`}
            key={option.mode}
            onClick={() => onModeChange(option.mode)}
            type="button"
          >
            {option.mode === 'list' ? <ListIcon /> : <GridIcon />}
          </button>
        )
      })}
    </div>
  )
}

function ListIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 7.5h14M5 12h14M5 16.5h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
