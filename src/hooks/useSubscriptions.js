import { useState, useEffect } from 'react'

const STORAGE_KEY = 'newsstand-subscriptions'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function useSubscriptions() {
  const [subscribed, setSubscribed] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribed]))
  }, [subscribed])

  function subscribe(id) {
    setSubscribed(prev => new Set([...prev, id]))
  }

  function unsubscribe(id) {
    setSubscribed(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return { subscribed, subscribe, unsubscribe }
}
