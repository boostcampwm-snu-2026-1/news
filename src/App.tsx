import { useState } from 'react';
import { GlobalHeader } from './components/GlobalHeader/GlobalHeader';
import { CategoryTabs } from './components/CategoryTabs/CategoryTabs';
import type { CategoryTab, TabType } from './types';

function App() {
  const [viewTab, setViewTab] = useState<TabType>('all');
  const [categoryTab, setCategoryTab] = useState<CategoryTab>('주요언론사');

  // 캐러셀 activeIndex 리셋은 #22 Carousel 구현 시 연결
  function handleCategoryChange(tab: CategoryTab) {
    setCategoryTab(tab);
  }

  return (
    <div className="min-h-screen bg-bg">
      <GlobalHeader activeTab={viewTab} onTabChange={setViewTab} />
      <div className="container-page">
        <CategoryTabs activeTab={categoryTab} onTabChange={handleCategoryChange} />
      </div>
    </div>
  );
}

export default App;
