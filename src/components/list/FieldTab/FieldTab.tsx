import { CATEGORIES } from '../../../data/categories';
import type { Category } from '../../../data/categories';
import { useProgress } from '../../../hooks/useProgress';

interface FieldTabProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  isPaused: boolean;
  onProgressComplete: () => void;
  currentInTab: number;
  totalInTab: number;
}

const FieldTab = ({ 
  activeCategory, 
  onCategoryChange, 
  isPaused, 
  onProgressComplete,
  currentInTab,
  totalInTab
}: FieldTabProps) => {
  // 활성화된 카테고리에 대해서만 진행률 계산
  const progress = useProgress({
    duration: 6000,
    isPaused,
    onComplete: onProgressComplete,
    resetDependency: activeCategory
  });

  return (
    <div className="flex w-full h-[40px] bg-[var(--color-soft)] border border-[var(--color-line)] border-b-0">
      {CATEGORIES.map((category, index) => {
        const isActive = category === activeCategory;
        const isLast = index === CATEGORIES.length - 1;

        return (
          <div
            key={category}
            className={`relative flex-1 flex items-center px-[16px] cursor-pointer ${
              !isLast ? 'border-r border-[var(--color-line)]' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {/* 활성 상태일 때 배경색 (전체 영역) */}
            {isActive && (
              <div className="absolute inset-0 bg-[var(--color-accent)] z-0" />
            )}

            {/* 활성 상태일 때 차오르는 프로그레스 바 */}
            {isActive && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--color-accent-deep)] z-0 origin-left"
                style={{ width: `${progress}%` }}
              />
            )}

            {/* 텍스트와 카운터 (Z-index로 프로그레스 바 위로 올림) */}
            <div className="relative z-10 flex justify-between items-center w-full">
              <span className={`text-[14px] ${isActive ? 'font-bold text-[#FFFFFF]' : 'font-medium text-[var(--color-sub)]'}`}>
                {category}
              </span>

              {isActive && (
                <span className="font-[var(--font-mono)] text-[12px] text-[#FFFFFF]">
                  {currentInTab}
                  <span className="opacity-70">/{totalInTab}</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldTab;
