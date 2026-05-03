import { useEffect, useEffectEvent, useRef, useState } from 'react'

import { AUTO_ADVANCE_DELAY } from './newsListViewConfig'

type ActiveCategoryProgressProps = {
  paused: boolean
  onComplete: () => void
}

export function ActiveCategoryProgress({
  paused,
  onComplete,
}: ActiveCategoryProgressProps) {
  const [progressRatio, setProgressRatio] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const elapsedMsRef = useRef(0)
  const handleComplete = useEffectEvent(onComplete)

  useEffect(() => {
    if (paused) {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }

      return
    }

    function step(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp - elapsedMsRef.current
      }

      const elapsedMs = timestamp - startTimeRef.current
      const nextProgressRatio = Math.min(elapsedMs / AUTO_ADVANCE_DELAY, 1)

      elapsedMsRef.current = elapsedMs
      setProgressRatio(nextProgressRatio)

      if (nextProgressRatio >= 1) {
        startTimeRef.current = null
        elapsedMsRef.current = 0
        handleComplete()
        return
      }

      animationFrameRef.current = window.requestAnimationFrame(step)
    }

    animationFrameRef.current = window.requestAnimationFrame(step)

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [paused])

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#7890E7]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[#4362D0]"
        style={{ width: `${progressRatio * 100}%` }}
      />
    </>
  )
}
