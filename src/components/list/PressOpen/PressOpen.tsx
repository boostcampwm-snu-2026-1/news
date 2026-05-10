import { useState } from 'react';
import FieldTab from '../FieldTab/FieldTab';
import PressHeader from './PressHeader';
import PressBody from './PressBody';
import { CATEGORIES } from '../../../data/categories';
import type { Category } from '../../../data/categories';
import { mockPressData } from '../../../data/pressData';
import { useNewsstandStore } from '../../../store/NewsstandContext';

const PressOpen = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [isPaused, setIsPaused] = useState(false);
  const { subscribedIds, toggleSubscription } = useNewsstandStore();

  // 테스트를 위해 첫 번째 기사 데이터를 렌더링
  const currentPress = mockPressData[0];
  const isSubscribed = subscribedIds.has(currentPress.id);

  const handleProgressComplete = () => {
    setActiveCategory(prev => {
      const currentIndex = CATEGORIES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % CATEGORIES.length;
      return CATEGORIES[nextIndex];
    });
  };

  return (
    <main 
      className="w-[var(--width-content)] mt-[var(--spacing-48)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FieldTab 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isPaused={isPaused}
        onProgressComplete={handleProgressComplete}
        currentInTab={1}
        totalInTab={81}
      />
      
      {/* 본문 컨테이너 */}
      <div className="w-full bg-[var(--color-card)] border border-[var(--color-line)] border-t-0 flex flex-col">
        <PressHeader 
          press={currentPress} 
          isSubscribed={isSubscribed} 
          onToggleSubscription={toggleSubscription} 
        />
        <PressBody press={currentPress} />
      </div>
    </main>
  );
};

export default PressOpen;
