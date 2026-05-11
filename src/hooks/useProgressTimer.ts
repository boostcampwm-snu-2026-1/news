import { useState, useEffect, useRef, useCallback } from 'react'

export function useProgressTimer(
  enabled: boolean,
  durationMs: number,
  onComplete: () => void
): { progress: number; reset: () => void } {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clear()
    setProgress(0)
  }, [clear])

  useEffect(() => {
    if (!enabled) {
      clear()
      return
    }

    const step = (100 / durationMs) * 100  // per 100ms interval
    setProgress(0)

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + step
        if (next >= 100) {
          onCompleteRef.current()
          return 0
        }
        return next
      })
    }, 100)

    return clear
  }, [enabled, durationMs, clear])

  return { progress, reset }
}
