import type { Press } from '../../data/presses'
import { Chevron } from '../Chevron/Chevron'
import { GridCell } from '../GridCell/GridCell'
import styles from './PressGrid.module.css'

interface PressGridProps {
  items: Press[]
  subscribedIds: Set<string>
  page: number
  lastPage: number
  onPagePrev: () => void
  onPageNext: () => void
  onOpen: (id: string) => void
}

export function PressGrid({
  items,
  subscribedIds,
  page,
  lastPage,
  onPagePrev,
  onPageNext,
  onOpen,
}: PressGridProps) {
  return (
    <div className={styles.wrapper}>
      <Chevron dir="left" disabled={page === 0} onClick={onPagePrev} />
      <div className={styles.grid}>
        {items.map((press) => (
          <GridCell
            key={press.id}
            press={press}
            isSubscribed={subscribedIds.has(press.id)}
            onOpen={onOpen}
          />
        ))}
      </div>
      <Chevron dir="right" disabled={page === lastPage} onClick={onPageNext} />
    </div>
  )
}
