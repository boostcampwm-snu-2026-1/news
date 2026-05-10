import { useCallback, useState } from 'react';
import type { PressId } from '../types';
import { DEFAULT_SUBSCRIBED_IDS } from '../data/presses';

export function useSubscriptions() {
  const [subscribed, setSubscribed] = useState<Set<PressId>>(
    () => new Set(DEFAULT_SUBSCRIBED_IDS),
  );

  const subscribe = useCallback((id: PressId) => {
    setSubscribed((s) => {
      if (s.has(id)) return s;
      const next = new Set(s);
      next.add(id);
      return next;
    });
  }, []);

  const unsubscribe = useCallback((id: PressId) => {
    setSubscribed((s) => {
      if (!s.has(id)) return s;
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }, []);

  return { subscribed, subscribe, unsubscribe };
}
