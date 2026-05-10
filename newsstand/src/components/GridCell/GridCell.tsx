import type { TabKey } from '../TabBar/TabBar'
import type { Press } from '../../data/presses'
import { PressWordmark } from '../PressWordmark/PressWordmark'
import styles from './GridCell.module.css'

interface GridCellProps {
  press: Press
  isSubscribed: boolean
  tab: TabKey
  onOpen: (id: string) => void
  onSubscribe: (id: string) => void
  onUnsubscribe: (id: string) => void
}

export function GridCell({ press, isSubscribed, tab, onOpen, onSubscribe, onUnsubscribe }: GridCellProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(press.id)
    }
  }

  const handlePill = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (tab === 'sub') {
      onUnsubscribe(press.id)
    } else {
      onSubscribe(press.id)
    }
  }

  const handlePillKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className={styles.cell}
      role="button"
      tabIndex={0}
      aria-label={press.name}
      onClick={() => onOpen(press.id)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.wordmark}>
        <PressWordmark press={press} size={15} />
      </div>
      <button
        className={styles.pill}
        onClick={handlePill}
        onKeyDown={handlePillKeyDown}
        tabIndex={0}
        aria-label={tab === 'sub' ? `${press.name} 구독 해지` : `${press.name} 구독하기`}
      >
        {tab === 'sub' ? '− 해지하기' : '+ 구독하기'}
      </button>
      {isSubscribed && (
        <span className={styles.subscribedBadge} aria-hidden="true" />
      )}
    </div>
  )
}
