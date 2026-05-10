import { CATEGORY_TABS } from '../../types';
import type { CategoryTab } from '../../types';

interface CategoryTabsProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
}

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <nav className="flex gap-2 justify-center py-3">
      {CATEGORY_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={
            tab === activeTab
              ? 'bg-tab-active text-white px-4 py-1.5 text-sm font-bold transition-colors duration-150'
              : 'text-text-secondary hover:text-text-primary px-4 py-1.5 text-sm font-bold transition-colors duration-150'
          }
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
