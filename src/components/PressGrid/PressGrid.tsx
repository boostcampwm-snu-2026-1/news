import type { Press, PressId, Tab } from '../../types'

interface PressGridProps {
  items: Press[]
  activeTab: Tab
  subscribedIds: Set<PressId>
  onSubscribe: (id: PressId) => void
  onUnsubscribe: (id: PressId) => void
  onOpen: (id: PressId) => void
}

export function PressGrid(_props: PressGridProps) {
  return null
}
