import { useState, useEffect, useRef } from 'react';
import { GlobalHeader } from './components/GlobalHeader/GlobalHeader';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { Carousel } from './components/Carousel/Carousel';
import { CarouselControlBar } from './components/CarouselControlBar/CarouselControlBar';
import { PublisherStrip } from './components/PublisherStrip/PublisherStrip';
import publishersRaw from './data/publishers.json';
import { SLIDE_INTERVAL_MS } from './types';
import type { CategoryTab, TabType, Publisher, SlideSpeed } from './types';

const allPublishers = publishersRaw as Publisher[];

function filterPublishers(tab: CategoryTab): Publisher[] {
  if (tab === '주요언론사') return allPublishers.filter((p) => p.isMajor);
  return allPublishers.filter((p) => p.category === tab);
}

function App() {
  const [viewTab, setViewTab] = useState<TabType>('all');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('주요언론사');
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState<SlideSpeed>('normal');

  const publishers = filterPublishers(categoryTab);
  const total = publishers.length;

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // 자동 슬라이드 타이머
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, SLIDE_INTERVAL_MS[speed]);
    return () => clearInterval(id);
  }, [autoPlay, speed, total]);

  function handleCategoryChange(tab: CategoryTab) {
    setCategoryTab(tab);
    setActiveIndex(0);
  }

  function handlePrev() {
    setActiveIndex((i) => (i - 1 + total) % total);
  }

  function handleNext() {
    setActiveIndex((i) => (i + 1) % total);
  }

  return (
    <div className="min-h-screen bg-bg">
      <GlobalHeader activeTab={viewTab} onTabChange={setViewTab} />
      <div className="container-page">
        <CategoryTabs activeTab={categoryTab} onTabChange={handleCategoryChange} />
      </div>
      <div className="pt-4">
        <Carousel
          count={total}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          prevLabel={publishers[(activeIndex - 1 + total) % total]?.name}
          nextLabel={publishers[(activeIndex + 1) % total]?.name}
          renderPanel={(idx, isActive) => (
            <div
              className="bg-surface shadow-panel flex items-center justify-center rounded-sm mx-1"
              style={{ height: 416 }}
            >
              <span className={`font-bold ${isActive ? 'text-xl text-text-primary' : 'text-base text-text-secondary'}`}>
                {publishers[idx]?.name ?? ''}
              </span>
            </div>
          )}
        />

        {/* 컨트롤 바 */}
        <div className="mx-auto" style={{ width: 736 }}>
          <CarouselControlBar
            activeIndex={activeIndex}
            total={total}
            autoPlay={autoPlay}
            speed={speed}
            onPrev={handlePrev}
            onNext={handleNext}
            onAutoPlayToggle={() => setAutoPlay((v) => !v)}
            onSpeedChange={setSpeed}
          />
        </div>

        <div className="container-page mt-10">
          <PublisherStrip
            publishers={publishers}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
