import { useCallback, useEffect, useState } from 'react';
import type { PressId } from '../types';
import { DEFAULT_SUBSCRIBED_IDS } from '../data/presses';

const STORAGE_KEY = 'newsstand:subscribed';

function loadInitial(): Set<PressId> {
  if (typeof window === 'undefined') {
    return new Set(DEFAULT_SUBSCRIBED_IDS);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set(DEFAULT_SUBSCRIBED_IDS);
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set(DEFAULT_SUBSCRIBED_IDS);
    return new Set(parsed.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set(DEFAULT_SUBSCRIBED_IDS);
  }
}

function persist(ids: Set<PressId>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage 가득참/접근 불가 — 영속화 실패는 무시 (메모리 상태는 유지)
  }
}

export function useSubscriptions() {
  const [subscribed, setSubscribed] = useState<Set<PressId>>(loadInitial);

  useEffect(() => {
    persist(subscribed);
  }, [subscribed]);

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

export const __TEST__ = { STORAGE_KEY };
