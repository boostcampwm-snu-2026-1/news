import { useState } from 'react';
import { GlobalHeader } from './components/GlobalHeader/GlobalHeader';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import { Carousel } from './components/Carousel/Carousel';
import { PublisherStrip } from './components/PublisherStrip/PublisherStrip';
import publishersRaw from './data/publishers.json';
import type { CategoryTab, TabType, Publisher } from './types';

const allPublishers = publishersRaw as Publisher[];

function filterPublishers(tab: CategoryTab): Publisher[] {
  if (tab === '주요언론사') return allPublishers.filter((p) => p.isMajor);
  return allPublishers.filter((p) => p.category === tab);
}

function App() {
  const [viewTab, setViewTab] = useState<TabType>('all');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('주요언론사');
  const [activeIndex, setActiveIndex] = useState(0);

  const publishers = filterPublishers(categoryTab);

  function handleCategoryChange(tab: CategoryTab) {
    setCategoryTab(tab);
    setActiveIndex(0);
  }

  return (
    <div className="min-h-screen bg-bg">
      <GlobalHeader activeTab={viewTab} onTabChange={setViewTab} />
      <div className="container-page">
        <CategoryTabs activeTab={categoryTab} onTabChange={handleCategoryChange} />
      </div>
      <div className="py-4">
        <Carousel
          count={publishers.length}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          prevLabel={publishers[(activeIndex - 1 + publishers.length) % publishers.length]?.name}
          nextLabel={publishers[(activeIndex + 1) % publishers.length]?.name}
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
      </div>
      <div className="container-page">
        <PublisherStrip
          publishers={publishers}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}

export default App;
