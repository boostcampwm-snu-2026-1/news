import { useState, useEffect } from 'react'
import styles from './NewsTicker.module.css'

export default function NewsTicker({ items }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (items.length <= 2) return
    const id = setInterval(() => {
      setIdx(prev => (prev + 2) % items.length)
    }, 3000)
    return () => clearInterval(id)
  }, [items.length])

  const lane0 = items[idx % items.length] ?? null
  const lane1 = items[(idx + 1) % items.length] ?? null

  return (
    <div className={styles.ticker}>
      {lane0 && <TickerLane key={`${idx}-0`} item={lane0} />}
      {lane1 && <TickerLane key={`${idx}-1`} item={lane1} />}
    </div>
  )
}

function TickerLane({ item }) {
  return (
    <div className={styles.lane}>
      <span className={styles.press}>{item.press}</span>
      <span className={styles.title}>{item.title}</span>
    </div>
  )
}
