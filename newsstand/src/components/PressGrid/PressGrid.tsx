import type { TabKey } from '../TabBar/TabBar'
import type { Press } from '../../data/presses'
import { Chevron } from '../Chevron/Chevron'
import { GridCell } from '../GridCell/GridCell'
import styles from './PressGrid.module.css'

interface PressGridProps {
  items: Press[]
  subscribedIds: Set<string>
  tab: TabKey
  page: number
  lastPage: number
  onPagePrev: () => void
  onPageNext: () => void
  onOpen: (id: string) => void
  onSubscribe: (id: string) => void
  onUnsubscribe: (id: string) => void
}

export function PressGrid({
  items,
  subscribedIds,
  tab,
  page,
  lastPage,
  onPagePrev,
  onPageNext,
  onOpen,
  onSubscribe,
  onUnsubscribe,
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
            tab={tab}
            onOpen={onOpen}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
          />
        ))}
      </div>
      <Chevron dir="right" disabled={page === lastPage} onClick={onPageNext} />
    </div>
  )
}
