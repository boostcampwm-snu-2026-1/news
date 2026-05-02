import styles from './Ticker.module.css'

export interface TickerItem {
  id: string
  label: string
  text: string
}

interface TickerProps {
  lanes: [TickerItem[], TickerItem[]]
}

export function Ticker({ lanes }: TickerProps) {
  return (
    <div className={styles.ticker}>
      {lanes.map((items, laneIdx) => (
        <div key={laneIdx} className={styles.lane}>
          <span className={styles.label}>{items[0]?.label}</span>
          <span className={styles.text}>{items[0]?.text}</span>
        </div>
      ))}
    </div>
  )
}
