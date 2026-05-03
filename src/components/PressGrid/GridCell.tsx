import type { Press, PressId, Tab } from '../../types'

interface GridCellProps {
  press: Press | null
  activeTab: Tab
  isSubscribed: boolean
  onSubscribe: (id: PressId) => void
  onUnsubscribe: (id: PressId) => void
  onOpen: (id: PressId) => void
}

export function GridCell(_props: GridCellProps) {
  return null
}
