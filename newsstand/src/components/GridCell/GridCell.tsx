import type { Press } from '../../data/presses'
import { PressWordmark } from '../PressWordmark/PressWordmark'
import styles from './GridCell.module.css'

interface GridCellProps {
  press: Press
  isSubscribed: boolean
  onOpen: (id: string) => void
}

export function GridCell({ press, isSubscribed, onOpen }: GridCellProps) {
  return (
    <button
      className={styles.cell}
      onClick={() => onOpen(press.id)}
      aria-label={press.name}
    >
      <PressWordmark press={press} size={15} />
      {isSubscribed && <span className={styles.subscribedBadge} aria-hidden="true" />}
    </button>
  )
}
