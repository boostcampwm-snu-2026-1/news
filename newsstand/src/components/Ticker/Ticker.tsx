import { useEffect, useRef, useState } from 'react'
import styles from './Ticker.module.css'

export interface TickerItem {
  id: string
  label: string
  text: string
}

interface TickerProps {
  lanes: [TickerItem[], TickerItem[]]
}

const INTERVAL = 3200
const FADE_MS = 550

function useLaneRotation(items: TickerItem[], pausedRef: React.RefObject<boolean>) {
  const [curr, setCurr] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (items.length <= 1 || reducedMotion) return
    const timer = setInterval(() => {
      if (pausedRef.current) return
      setCurr((c) => {
        const next = (c + 1) % items.length
        setPrev(c)
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = setTimeout(() => setPrev(null), FADE_MS)
        return next
      })
    }, INTERVAL)
    return () => {
      clearInterval(timer)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [items, reducedMotion, pausedRef])

  return { curr, prev }
}

function Lane({ items }: { items: TickerItem[] }) {
  const pausedRef = useRef(false)
  const { curr, prev } = useLaneRotation(items, pausedRef)

  return (
    <div
      className={styles.lane}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onFocus={() => { pausedRef.current = true }}
      onBlur={() => { pausedRef.current = false }}
    >
      <span className={styles.label}>{items[curr]?.label}</span>
      <div className={styles.textWrap}>
        {prev !== null && (
          <span key={`prev-${prev}`} className={styles.textOut} aria-hidden="true">
            {items[prev]?.text}
          </span>
        )}
        <span key={`curr-${curr}`} className={styles.textIn}>
          {items[curr]?.text}
        </span>
      </div>
    </div>
  )
}

export function Ticker({ lanes }: TickerProps) {
  return (
    <div className={styles.ticker}>
      <Lane items={lanes[0]} />
      <Lane items={lanes[1]} />
    </div>
  )
}
