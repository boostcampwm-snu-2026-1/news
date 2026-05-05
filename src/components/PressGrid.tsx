import PressWordmark, { type PressData } from './PressWordmark'
import type { TabType } from './TabBar'
import './PressGrid.css'

interface PressGridProps {
  items: PressData[]
  activeTab: TabType
  subscribedIds: Set<string>
  onSubscribe: (id: string) => void
  onUnsubscribe: (id: string) => void
}

export default function PressGrid({ items, activeTab, subscribedIds, onSubscribe, onUnsubscribe }: PressGridProps) {
  const cells = Array.from({ length: 24 }, (_, i) => items[i] ?? null)

  return (
    <div className="press-grid">
      {cells.map((press, i) => (
        <GridCell
          key={press?.id ?? `empty-${i}`}
          press={press}
          activeTab={activeTab}
          isSubscribed={press ? subscribedIds.has(press.id) : false}
          onSubscribe={press ? () => onSubscribe(press.id) : undefined}
          onUnsubscribe={press ? () => onUnsubscribe(press.id) : undefined}
        />
      ))}
    </div>
  )
}

interface GridCellProps {
  press: PressData | null
  activeTab: TabType
  isSubscribed: boolean
  onSubscribe?: () => void
  onUnsubscribe?: () => void
}

function GridCell({ press, activeTab, isSubscribed, onSubscribe, onUnsubscribe }: GridCellProps) {
  if (!press) return <div className="press-grid__cell" />

  const showUnsubscribe = activeTab === 'subscribed'
  const pillLabel = showUnsubscribe ? '− 해지하기' : '+ 구독하기'
  const handlePill = showUnsubscribe ? onUnsubscribe : onSubscribe

  return (
    <div className="press-grid__cell press-grid__cell--interactive">
      <PressWordmark press={press} />
      <button
        className="press-grid__pill"
        onClick={handlePill}
        aria-label={`${press.name} ${pillLabel}`}
      >
        {pillLabel}
      </button>
    </div>
  )
}
