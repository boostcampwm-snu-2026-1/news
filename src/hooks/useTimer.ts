import { useEffect, useEffectEvent } from 'react'

type UseTimerOptions = {
  delay: number
  enabled?: boolean
}

export function useTimer(
  callback: () => void,
  { delay, enabled = true }: UseTimerOptions,
) {
  const onTick = useEffectEvent(callback)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const timerId = window.setInterval(() => {
      onTick()
    }, delay)

    return () => {
      window.clearInterval(timerId)
    }
  }, [delay, enabled])
}
