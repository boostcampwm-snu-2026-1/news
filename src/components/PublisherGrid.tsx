import type { ReactNode } from 'react'
import { PUBLISHER_GRID_PAGE_SIZE } from '../constants/newsStand'

export interface PublisherGridItem {
  id: string
  content: ReactNode
}

interface PublisherGridProps {
  items?: readonly PublisherGridItem[]
  ariaLabel?: string
}

export function PublisherGrid({
  items = [],
  ariaLabel = '언론사 그리드',
}: PublisherGridProps) {
  const gridSlots = Array.from(
    { length: PUBLISHER_GRID_PAGE_SIZE },
    (_, index) => items[index] ?? null,
  )

  return (
    <div
      aria-label={ariaLabel}
      className="h-auto w-full overflow-hidden border border-line bg-line lg:h-[var(--layout-content-height)]"
    >
      <ul className="m-0 grid min-h-[var(--layout-content-height)] list-none grid-cols-2 auto-rows-[var(--grid-cell-height)] gap-px bg-line p-0 sm:grid-cols-3 lg:h-full lg:grid-cols-6 lg:grid-rows-4 lg:auto-rows-fr">
        {gridSlots.map((item, index) => (
          <li
            aria-hidden={item === null ? true : undefined}
            className="flex min-h-[var(--grid-cell-height)] items-center justify-center bg-card p-3 text-center lg:min-h-0"
            key={item?.id ?? `empty-${index}`}
          >
            {item?.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
