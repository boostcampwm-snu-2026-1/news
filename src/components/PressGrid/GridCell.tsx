import type { Press, PressId, Tab } from '../../types'
import { PressWordmark } from '../PressWordmark'

interface GridCellProps {
  press: Press | null
  activeTab: Tab
  isSubscribed: boolean
  onSubscribe: (id: PressId) => void
  onUnsubscribe: (id: PressId) => void
  onOpen: (id: PressId) => void
}

export function GridCell({ press }: GridCellProps) {
  return (
    <div className="bg-white flex items-center justify-center overflow-hidden">
      {press && <PressWordmark wordmark={press.wordmark} />}
    </div>
  )
}
