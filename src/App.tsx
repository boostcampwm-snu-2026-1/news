import { GlobalHeader } from './components/GlobalHeader/GlobalHeader';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { Carousel } from './components/Carousel/Carousel';
import { CarouselControlBar } from './components/CarouselControlBar/CarouselControlBar';
import { PublisherStrip } from './components/PublisherStrip/PublisherStrip';
import { FrontPagePanel } from './components/FrontPagePanel/FrontPagePanel';
import { useNewsStand, frontPageMap } from './hooks/useNewsStand';

function App() {
  const {
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
  } = useNewsStand();

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
                  <div className="bg-surface shadow-panel flex items-center justify-center rounded-sm" style={{ height: 450 }}>
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
