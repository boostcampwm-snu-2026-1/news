import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import type { Category, Press, TabKind } from '../types';
import { CATEGORIES } from '../types';
import { PRESS_LIST } from '../data/mockData';

const DURATION = 6000;

function filterPresses(cat: Category, tab: TabKind, subscribedIds: Set<string>): Press[] {
  const all = PRESS_LIST.filter((p) => p.category === cat);
  return tab === 'subscribed' ? all.filter((p) => subscribedIds.has(p.id)) : all;
}

export function useListView(tab: TabKind, subscribedIds: Set<string>) {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [pressIndex, setPressIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeCategoryRef = useRef(activeCategory);
  const tabRef = useRef(tab);
  const subscribedIdsRef = useRef(subscribedIds);

  useLayoutEffect(() => {
    activeCategoryRef.current = activeCategory;
    tabRef.current = tab;
    subscribedIdsRef.current = subscribedIds;
  });

  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;
    let initialized = false;

    const tick = (timestamp: number) => {
      if (!initialized) {
        initialized = true;
        setPressIndex(0);
        setProgress(0);
        startTime = timestamp;
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (startTime === null) startTime = timestamp;
      const p = Math.min((timestamp - startTime) / DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        startTime = timestamp;
        const cat = activeCategoryRef.current;
        const total = filterPresses(cat, tabRef.current, subscribedIdsRef.current).length;
        if (total > 0) {
          setPressIndex((prev) => (prev + 1) % total);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeCategory, tab, subscribedIds]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
  };

  const advancePressIndex = () => {
    const cat = activeCategoryRef.current;
    const total = filterPresses(cat, tabRef.current, subscribedIdsRef.current).length;
    if (total > 0) {
      setPressIndex((prev) => (prev + 1) % total);
    }
    setProgress(0);
  };

  const filteredPresses = filterPresses(activeCategory, tab, subscribedIds);
  const currentPress = filteredPresses[pressIndex] ?? null;

  return {
    activeCategory,
    pressIndex,
    pressTotal: filteredPresses.length,
    progress,
    currentPress,
    filteredPresses,
    onCategoryChange: handleCategoryChange,
    advancePressIndex,
  };
}
