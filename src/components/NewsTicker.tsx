import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { TickerItem } from '../types/newsStand'

const TICKER_INTERVAL_MS = 3200

interface NewsTickerProps {
  items: readonly TickerItem[]
}

export function NewsTicker({ items }: NewsTickerProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isPaused = isFocused || isHovered
  const firstLaneIndex = useTickerLane({
    itemCount: items.length,
    offsetDelayMs: 0,
    paused: isPaused,
    reducedMotion: prefersReducedMotion,
  })
  const secondLaneIndex = useTickerLane({
    itemCount: items.length,
    offsetDelayMs: TICKER_INTERVAL_MS / 2,
    paused: isPaused,
    reducedMotion: prefersReducedMotion,
  })
  const firstItem = items[firstLaneIndex]
  const secondLaneOffset = items.length > 0 ? Math.ceil(items.length / 2) : 0
  const secondItem =
    items.length > 0
      ? items[(secondLaneIndex + secondLaneOffset) % items.length]
      : undefined

  return (
    <div
      aria-label="주요 뉴스"
      className="flex h-full items-center gap-2 bg-soft px-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget

        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsFocused(false)
        }
      }}
      onFocus={() => setIsFocused(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      tabIndex={0}
    >
      <TickerLane item={firstItem} />
      <TickerLane item={secondItem} />
    </div>
  )
}

interface UseTickerLaneOptions {
  itemCount: number
  offsetDelayMs: number
  paused: boolean
  reducedMotion: boolean
}

function useTickerLane({
  itemCount,
  offsetDelayMs,
  paused,
  reducedMotion,
}: UseTickerLaneOptions) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (itemCount <= 1 || paused || reducedMotion) {
      return
    }

    let intervalId: number | undefined
    const timeoutId = window.setTimeout(() => {
      setIndex((currentIndex) => (currentIndex + 1) % itemCount)
      intervalId = window.setInterval(() => {
        setIndex((currentIndex) => (currentIndex + 1) % itemCount)
      }, TICKER_INTERVAL_MS)
    }, TICKER_INTERVAL_MS + offsetDelayMs)

    return () => {
      window.clearTimeout(timeoutId)

      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [itemCount, offsetDelayMs, paused, reducedMotion])

  if (itemCount === 0) {
    return 0
  }

  return index % itemCount
}

interface TickerLaneProps {
  item?: TickerItem
}

function TickerLane({ item }: TickerLaneProps) {
  if (!item) {
    return <div className="min-w-0 flex-1" />
  }

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className="flex min-w-0 items-center gap-4 motion-safe:animate-[ticker-fade_var(--duration-ticker-crossfade)_var(--ease-standard)]"
        key={item.id}
      >
        <span className="w-14 shrink-0 truncate text-[14px] font-bold leading-none text-ink">
          {item.publisherName}
        </span>
        <span className="min-w-0 truncate text-[14px] font-medium leading-none text-ink">
          {item.headline}
        </span>
      </div>
    </div>
  )
}
