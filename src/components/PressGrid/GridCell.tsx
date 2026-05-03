import type { Press, PressId, Tab } from '../../types'

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
    <div className="bg-white flex items-center justify-center">
      {press && (
        <span className="text-sm text-[#14212B]">{press.wordmark.name}</span>
      )}
    </div>
  )
}
