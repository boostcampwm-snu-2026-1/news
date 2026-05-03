import { useState } from 'react'
import type { PressId } from '../types'

export function useSubscribe() {
  const [subscribed, setSubscribed] = useState<Set<PressId>>(new Set())

  const handleSubscribe = (_id: PressId): void => {}
  const handleUnsubscribe = (_id: PressId): void => {}

  return { subscribed, handleSubscribe, handleUnsubscribe }
}
