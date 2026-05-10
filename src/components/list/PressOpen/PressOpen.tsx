import { useState } from 'react';
import FieldTab from '../FieldTab/FieldTab';
import { CATEGORIES } from '../../../data/categories';
import type { Category } from '../../../data/categories';

const PressOpen = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [isPaused, setIsPaused] = useState(false);

  // 진행률이 100%가 되었을 때 다음 기사나 언론사로 넘어가는 로직
  const handleProgressComplete = () => {
    // 지금은 테스트용으로 100% 도달 시 단순히 카테고리만 다음으로 넘겨봅니다.
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
      {/* 탭 헤더 영역 */}
      <FieldTab 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isPaused={isPaused}
        onProgressComplete={handleProgressComplete}
        currentInTab={1}
        totalInTab={81} // 추후 실제 데이터 개수로 교체
      />
      
      {/* 기사 본문 영역 자리표시자 */}
      <div className="w-full h-[348px] bg-[var(--color-card)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-sub)]">
        본문 영역 (구현 예정)
      </div>
    </main>
  );
};

export default PressOpen;
