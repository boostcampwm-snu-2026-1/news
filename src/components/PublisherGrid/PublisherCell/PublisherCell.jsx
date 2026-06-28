import { useState } from 'react'
import PressWordmark from './PressWordmark'
import styles from './PublisherCell.module.css'

export default function PublisherCell({ press, isSubscribed, onSubscribe, onUnsubscribe, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.cell} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered ? (
        <button
          className={`${styles.pill} ${isSubscribed ? styles.unsub : styles.sub}`}
          onClick={e => {
            e.stopPropagation()
            isSubscribed ? onUnsubscribe(press.id) : onSubscribe(press.id)
          }}
        >
          <span className={styles.pillIcon}>{isSubscribed ? '−' : '+'}</span>
          {isSubscribed ? '해지하기' : '구독하기'}
        </button>
      ) : (
        <PressWordmark press={press} />
      )}
    </div>
  )
}
