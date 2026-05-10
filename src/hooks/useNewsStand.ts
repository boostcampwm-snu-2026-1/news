import { useState, useEffect, useRef } from 'react';
import type { CarouselHandle } from '../components/Carousel/Carousel';
import { SLIDE_INTERVAL_MS } from '../types';
import type { CategoryTab, TabType, SlideSpeed, Publisher, FrontPage } from '../types';
import publishersRaw from '../data/publishers.json';
import frontpagesRaw from '../data/frontpages.json';

const allPublishers = publishersRaw as Publisher[];
export const frontPageMap = new Map(
  (frontpagesRaw as FrontPage[]).map((fp) => [fp.publisherId, fp]),
);

function filterByCategory(tab: CategoryTab): Publisher[] {
  if (tab === '주요언론사') return allPublishers.filter((p) => p.isMajor);
  return allPublishers.filter((p) => p.category === tab);
}

function loadSubscribedIds(): Set<string> {
  try {
    const raw = localStorage.getItem('subscribedIds');
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

export function useNewsStand() {
  const [viewTab, setViewTab]         = useState<TabType>('all');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('주요언론사');
  const [activeIndex, setActiveIndex] = useState(0);
  const [speed, setSpeed]             = useState<SlideSpeed>('off');
  const [timerKey, setTimerKey]       = useState(0);
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(loadSubscribedIds);

  const carouselRef = useRef<CarouselHandle>(null);

  const categoryPublishers = filterByCategory(categoryTab);
  const publishers = viewTab === 'subscribed'
    ? categoryPublishers.filter((p) => subscribedIds.has(p.id))
    : categoryPublishers;
  const total = publishers.length;

  useEffect(() => {
    if (speed === 'off' || total <= 1) return;
    const id = setInterval(() => {
      carouselRef.current?.slideNext();
    }, SLIDE_INTERVAL_MS[speed]);
    return () => clearInterval(id);
  }, [speed, total, timerKey]);

  function resetTimer() { setTimerKey((k) => k + 1); }

  function handleViewTabChange(tab: TabType) {
    setViewTab(tab);
    setActiveIndex(0);
    resetTimer();
  }

  function handleCategoryChange(tab: CategoryTab) {
    setCategoryTab(tab);
    setActiveIndex(0);
    resetTimer();
  }

  function handleCarouselIndexChange(idx: number) {
    setActiveIndex(idx);
    resetTimer();
  }

  function handlePrev() {
    setActiveIndex((i) => (i - 1 + total) % total);
    resetTimer();
  }

  function handleNext() {
    setActiveIndex((i) => (i + 1) % total);
    resetTimer();
  }

  function handleStripSelect(idx: number) {
    setActiveIndex(idx);
    resetTimer();
  }

  function toggleSubscribe(id: string) {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem('subscribedIds', JSON.stringify([...next]));
      return next;
    });
  }

  return {
    carouselRef,
    publishers,
    total,
    activeIndex,
    speed,
    viewTab,
    categoryTab,
    subscribedIds,
    setSpeed,
    toggleSubscribe,
    handleViewTabChange,
    handleCategoryChange,
    handleCarouselIndexChange,
    handlePrev,
    handleNext,
    handleStripSelect,
  };
}
