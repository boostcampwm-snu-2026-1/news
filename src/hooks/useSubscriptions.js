import { useState } from 'react';

const STORAGE_KEY = 'news-subscribed-ids';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveToStorage(idSet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...idSet]));
}

export function useSubscriptions() {
  const [subscribedIds, setSubscribedIds] = useState(loadFromStorage);

  const subscribe = (id) => {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveToStorage(next);
      return next;
    });
  };

  const unsubscribe = (id) => {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveToStorage(next);
      return next;
    });
  };

  return { subscribedIds, subscribe, unsubscribe };
}
