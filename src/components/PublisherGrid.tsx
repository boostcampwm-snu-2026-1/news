import { PublisherCell } from './PublisherCell'
import { PUBLISHER_GRID_PAGE_SIZE } from '../constants/newsStand'
import type { Publisher } from '../types/newsStand'

interface PublisherGridProps {
  publishers?: readonly Publisher[]
  ariaLabel?: string
  isPublisherSubscribed: (publisherId: Publisher['id']) => boolean
  onToggleSubscription: (publisherId: Publisher['id']) => void
}

export function PublisherGrid({
  publishers = [],
  ariaLabel = '언론사 그리드',
  isPublisherSubscribed,
  onToggleSubscription,
}: PublisherGridProps) {
  const gridSlots = Array.from(
    { length: PUBLISHER_GRID_PAGE_SIZE },
    (_, index) => publishers[index] ?? null,
  )

  return (
    <div
      aria-label={ariaLabel}
      className="h-auto w-full overflow-hidden border border-line bg-line lg:h-[var(--layout-content-height)]"
    >
      <ul className="m-0 grid min-h-[var(--layout-content-height)] list-none grid-cols-2 auto-rows-[var(--grid-cell-height)] gap-px bg-line p-0 sm:grid-cols-3 lg:h-full lg:grid-cols-6 lg:grid-rows-4 lg:auto-rows-fr">
        {gridSlots.map((publisher, index) => (
          <li
            aria-hidden={publisher === null ? true : undefined}
            className="group flex min-h-[var(--grid-cell-height)] items-center justify-center bg-card p-3 text-center transition-colors hover:bg-soft focus-within:bg-soft lg:min-h-0"
            key={publisher?.id ?? `empty-${index}`}
          >
            {publisher ? (
              <PublisherCell
                isSubscribed={isPublisherSubscribed(publisher.id)}
                onToggleSubscription={onToggleSubscription}
                publisher={publisher}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
