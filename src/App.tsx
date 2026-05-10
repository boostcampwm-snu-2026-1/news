import { useState, useEffect, useRef } from 'react';
import { GlobalHeader } from './components/GlobalHeader/GlobalHeader';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { Carousel } from './components/Carousel/Carousel';
import type { CarouselHandle } from './components/Carousel/Carousel';
import { CarouselControlBar } from './components/CarouselControlBar/CarouselControlBar';
import { PublisherStrip } from './components/PublisherStrip/PublisherStrip';
import { FrontPagePanel } from './components/FrontPagePanel/FrontPagePanel';
import publishersRaw from './data/publishers.json';
import frontpagesRaw from './data/frontpages.json';
import { SLIDE_INTERVAL_MS } from './types';
import type { CategoryTab, TabType, Publisher, SlideSpeed, FrontPage } from './types';

const allPublishers = publishersRaw as Publisher[];
const frontPageMap = new Map((frontpagesRaw as FrontPage[]).map((fp) => [fp.publisherId, fp]));

function filterPublishers(tab: CategoryTab): Publisher[] {
  if (tab === '주요언론사') return allPublishers.filter((p) => p.isMajor);
  return allPublishers.filter((p) => p.category === tab);
}

function loadSubscribedIds(): Set<string> {
  try {
    const raw = localStorage.getItem('subscribedIds');
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

function App() {
  const [viewTab, setViewTab] = useState<TabType>('all');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('주요언론사');
  const [activeIndex, setActiveIndex] = useState(0);
  const [speed, setSpeed] = useState<SlideSpeed>('off');
  const [timerKey, setTimerKey] = useState(0);
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(loadSubscribedIds);

  const carouselRef = useRef<CarouselHandle>(null);

  const categoryPublishers = filterPublishers(categoryTab);
  const publishers = viewTab === 'subscribed'
    ? categoryPublishers.filter((p) => subscribedIds.has(p.id))
    : categoryPublishers;
  const total = publishers.length;

  // 자동 슬라이드 — Carousel의 slideNext()로 애니메이션 포함 이동
  useEffect(() => {
    if (speed === 'off' || total <= 1) return;
    const id = setInterval(() => {
      carouselRef.current?.slideNext();
    }, SLIDE_INTERVAL_MS[speed]);
    return () => clearInterval(id);
  }, [speed, total, timerKey]);

  function resetTimer() { setTimerKey((k) => k + 1); }

  function handleCategoryChange(tab: CategoryTab) {
    setCategoryTab(tab);
    setActiveIndex(0);
    resetTimer();
  }

  function handleViewTabChange(tab: TabType) {
    setViewTab(tab);
    setActiveIndex(0);
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

  function handleCarouselIndexChange(idx: number) {
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

  return (
    <div className="min-h-screen bg-bg">
      <GlobalHeader activeTab={viewTab} onTabChange={handleViewTabChange} />
      <CategoryTabs activeTab={categoryTab} onTabChange={handleCategoryChange} />
      <div className="pt-4">
        {publishers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-text-secondary">
            <p className="text-sm">구독한 언론사가 없습니다.</p>
            <button
              type="button"
              onClick={() => handleViewTabChange('all')}
              className="text-sm text-primary underline hover:no-underline"
            >
              전체언론사 보기
            </button>
          </div>
        ) : (
          <>
            <Carousel
              ref={carouselRef}
              count={total}
              activeIndex={activeIndex}
              onIndexChange={handleCarouselIndexChange}
              prevLabel={publishers[(activeIndex - 1 + total) % total]?.name}
              nextLabel={publishers[(activeIndex + 1) % total]?.name}
              renderPanel={(idx, isActive) => {
                const pub = publishers[idx];
                const fp = pub ? frontPageMap.get(pub.id) : undefined;
                if (!pub || !fp) return (
                  <div className="bg-surface shadow-panel flex items-center justify-center rounded-sm" style={{ height: 416 }}>
                    <span className="text-text-secondary text-sm">{pub?.name ?? ''}</span>
                  </div>
                );
                return (
                  <FrontPagePanel
                    publisher={pub}
                    frontPage={fp}
                    isActive={isActive}
                    isSubscribed={subscribedIds.has(pub.id)}
                    onToggleSubscribe={toggleSubscribe}
                  />
                );
              }}
            />

            {/* 컨트롤 바 */}
            <div className="mx-auto" style={{ width: 736 }}>
              <CarouselControlBar
                activeIndex={activeIndex}
                total={total}
                speed={speed}
                onPrev={handlePrev}
                onNext={handleNext}
                onSpeedChange={setSpeed}
              />
            </div>

            <div className="container-page mt-10">
              <PublisherStrip
                publishers={publishers}
                activeIndex={activeIndex}
                onSelect={handleStripSelect}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
