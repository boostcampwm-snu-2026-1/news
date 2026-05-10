import { useState, useMemo } from 'react';
import FieldTab from '../FieldTab/FieldTab';
import PressHeader from './PressHeader';
import PressBody from './PressBody';
import { CATEGORIES } from '../../../data/categories';
import type { Category } from '../../../data/categories';
import { mockPressData } from '../../../data/pressData';
import { useNewsstandStore } from '../../../store/NewsstandContext';

const PressOpen = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [activePressIndex, setActivePressIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { subscribedIds, toggleSubscription } = useNewsstandStore();

  // 현재 탭에 해당하는 언론사들만 필터링
  const currentCategoryPresses = useMemo(() => {
    return mockPressData.filter(press => press.categoryId === activeCategory);
  }, [activeCategory]);

  const currentPress = currentCategoryPresses[activePressIndex];
  const isSubscribed = currentPress ? subscribedIds.has(currentPress.id) : false;

  const handleProgressComplete = () => {
    setActivePressIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      
      // 현재 카테고리의 마지막 언론사를 넘어섰을 때
      if (nextIndex >= currentCategoryPresses.length) {
        // 다음 카테고리로 이동
        setActiveCategory(prevCategory => {
          const currentCatIndex = CATEGORIES.indexOf(prevCategory);
          const nextCatIndex = (currentCatIndex + 1) % CATEGORIES.length;
          return CATEGORIES[nextCatIndex];
        });
        return 0; // 다음 카테고리의 첫 번째 언론사로 리셋
      }
      
      return nextIndex;
    });
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setActivePressIndex(0); // 사용자가 직접 탭을 클릭하면 항상 첫 번째 언론사부터 시작
  };

  // currentPress가 아직 없는 경우 방어 코드 (드물지만 데이터 로딩 시)
  if (!currentPress) return null;

  return (
    <main 
      className="w-[var(--width-content)] mt-[var(--spacing-48)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FieldTab 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isPaused={isPaused}
        onProgressComplete={handleProgressComplete}
        currentInTab={activePressIndex + 1}
        totalInTab={currentCategoryPresses.length}
      />
      
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
