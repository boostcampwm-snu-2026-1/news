import { CATEGORIES } from '../types';
import type { Category } from '../types';

interface Props {
  activeCategory: Category;
  pressIndex: number;
  pressTotal: number;
  progress: number;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryTabBar({
  activeCategory,
  pressIndex,
  pressTotal,
  progress,
  onCategoryChange,
}: Props) {
  return (
    <div className="max-w-[1080px] mx-auto border border-[#e0e0e0]">
      <div className="flex">
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative flex-1 py-2.5 text-sm text-center transition-colors overflow-hidden
                ${isActive
                  ? 'bg-[#4169e1] text-white font-medium'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
                }
                ${category !== CATEGORIES[0] ? 'border-l border-[#e0e0e0]' : ''}
              `}
            >
              <span className="block leading-tight">
                {isActive
                  ? `${category} ${pressIndex + 1} / ${pressTotal}`
                  : category}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 h-[3px] bg-white/50 transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
