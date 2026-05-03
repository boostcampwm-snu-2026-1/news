import styles from './NewsTicker.module.css'

export default function NewsTicker({ items }) {
  const lane0 = items[0] ?? null
  const lane1 = items[1] ?? null

  return (
    <div className={styles.ticker}>
      {lane0 && <TickerLane item={lane0} />}
      {lane1 && <TickerLane item={lane1} />}
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
