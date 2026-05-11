import { useState, useEffect, useCallback, useRef } from 'react'
import { tickerItems } from '../../data/articles'
import styles from './NewsTicker.module.css'

const INTERVAL = 3200
const ANIM_HALF = 275

export default function NewsTicker() {
  const n = tickerItems.length
  const half = Math.ceil(n / 2)

  const [leftIndex, setLeftIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(half % n)
  const [leftFade, setLeftFade] = useState(false)
  const [rightFade, setRightFade] = useState(false)
  const rightIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rotateLeft = useCallback(() => {
    setLeftFade(true)
    setTimeout(() => {
      setLeftIndex(prev => (prev + 1) % n)
      setLeftFade(false)
    }, ANIM_HALF)
  }, [n])

  const rotateRight = useCallback(() => {
    setRightFade(true)
    setTimeout(() => {
      setRightIndex(prev => (prev + 1) % n)
      setRightFade(false)
    }, ANIM_HALF)
  }, [n])

  useEffect(() => {
    const leftTimer = setInterval(rotateLeft, INTERVAL)
    const delayTimer = setTimeout(() => {
      rightIntervalRef.current = setInterval(rotateRight, INTERVAL)
    }, INTERVAL / 2)

    return () => {
      clearInterval(leftTimer)
      clearTimeout(delayTimer)
      if (rightIntervalRef.current) clearInterval(rightIntervalRef.current)
    }
  }, [rotateLeft, rotateRight])

  return (
    <div className={styles.ticker}>
      <div className={`${styles.column} ${leftFade ? styles.fading : ''}`}>
        <span className={styles.outletName}>{tickerItems[leftIndex].outletName}</span>
        <span className={styles.headline}>{tickerItems[leftIndex].headline}</span>
      </div>
      <div className={`${styles.column} ${rightFade ? styles.fading : ''}`}>
        <span className={styles.outletName}>{tickerItems[rightIndex].outletName}</span>
        <span className={styles.headline}>{tickerItems[rightIndex].headline}</span>
      </div>
    </div>
  )
}
