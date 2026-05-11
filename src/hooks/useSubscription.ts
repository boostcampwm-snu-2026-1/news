import { useState, useCallback } from 'react';

const STORAGE_KEY = 'newsstand_subscribed_ids';

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set<string>(JSON.parse(raw) as string[]);
  } catch {
    // ignore parse errors
  }
  return new Set<string>();
}

function saveToStorage(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useSubscription() {
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(loadFromStorage);

  const toggleSubscription = useCallback((pressId: string) => {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      if (next.has(pressId)) {
        next.delete(pressId);
      } else {
        next.add(pressId);
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  return { subscribedIds, toggleSubscription, subscribedCount: subscribedIds.size };
}
