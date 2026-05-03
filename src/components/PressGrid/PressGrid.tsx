import type { Press, PressId, Tab } from '../../types'
import { GridCell } from './GridCell'

interface PressGridProps {
  items: Press[]
  activeTab: Tab
  subscribedIds: Set<PressId>
  onSubscribe: (id: PressId) => void
  onUnsubscribe: (id: PressId) => void
  onOpen: (id: PressId) => void
}

const GRID_SIZE = 24

export function PressGrid({ items, activeTab, subscribedIds, onSubscribe, onUnsubscribe, onOpen }: PressGridProps) {
  const cells: (Press | null)[] = [
    ...items,
    ...Array<null>(Math.max(0, GRID_SIZE - items.length)).fill(null),
  ]

  return (
    <div className="grid grid-cols-6 grid-rows-4 gap-px w-[930px] h-[388px] bg-[#D2DAE0]">
      {cells.map((press, i) => (
        <GridCell
          key={press?.id ?? `empty-${i}`}
          press={press}
          activeTab={activeTab}
          isSubscribed={press !== null && subscribedIds.has(press.id)}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
