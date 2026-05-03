import { useState } from 'react'
import type { Outlet } from '../../types'
import { useNewsstand } from '../../context/NewsstandContext'
import styles from './GridView.module.css'

interface Props {
  outlet: Outlet
}

export default function OutletCell({ outlet }: Props) {
  const { activeTab, subscribed, toggleSubscription } = useNewsstand()
  const [hovered, setHovered] = useState(false)

  const isSubscribed = subscribed.has(outlet.id)

  function handlePillClick(e: React.MouseEvent) {
    e.stopPropagation()
    toggleSubscription(outlet.id)
  }

  const cellStyle: React.CSSProperties = {
    ...(outlet.style?.background ? { backgroundColor: outlet.style.background } : {}),
    ...(outlet.style?.color ? { color: outlet.style.color } : {}),
    ...(outlet.style?.fontWeight ? { fontWeight: outlet.style.fontWeight } : {}),
    ...(outlet.style?.fontStyle ? { fontStyle: outlet.style.fontStyle } : {}),
  }

  return (
    <div
      className={styles.cell}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.outletName} style={cellStyle}>
        {outlet.name}
      </span>
      {hovered && (
        <button
          className={`${styles.pill} ${isSubscribed ? styles.pillUnsubscribe : styles.pillSubscribe}`}
          onClick={handlePillClick}
        >
          {activeTab === 'subscribed' || isSubscribed ? '− 해지하기' : '+ 구독하기'}
        </button>
      )}
    </div>
  )
}
