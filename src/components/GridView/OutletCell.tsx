import { useState } from 'react'
import type { Outlet } from '../../types'
import { useNewsstand } from '../../context/NewsstandContext'
import styles from './GridView.module.css'

interface Props {
  outlet: Outlet
  onClick?: () => void
}

export default function OutletCell({ outlet, onClick }: Props) {
  const { activeTab, toggleSubscription } = useNewsstand()
  const [hovered, setHovered] = useState(false)

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
      style={{ cursor: onClick ? 'pointer' : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {!hovered && (
        <span className={styles.outletName} style={cellStyle}>
          {outlet.name}
        </span>
      )}
      {hovered && (
        <button
          className={styles.pill}
          onClick={handlePillClick}
        >
          {activeTab === 'subscribed' ? '− 해지하기' : '+ 구독하기'}
        </button>
      )}
    </div>
  )
}
