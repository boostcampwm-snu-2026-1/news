import React, { useMemo } from 'react';
import styles from './CategoryTabList.module.css';
import CategoryTabItem from './CategoryTabItem';
import { CATEGORIES } from '@/constants/newsData';
import { useView } from '@/contexts/ViewContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PressNewsData } from '@/types/news';

interface CategoryTabListProps {
  activeIndex: number;
  progress: number;
  currentPressIndex: number;
  currentDataList: PressNewsData[];
  currentTabPageIndex: number; // New prop
  tabPageSize: number; // New prop
}

const CategoryTabList: React.FC<CategoryTabListProps> = ({ activeIndex, progress, currentPressIndex, currentDataList, currentTabPageIndex, tabPageSize }) => {
  const { setNavigation, tabMode, currentPressIndex: flatIndex } = useView();
  const { subscribedIds } = useSubscription();

  // allPressData and subscribedPressList are no longer needed here as currentDataList is passed down

  return (
    <div className={styles.container}>
      {tabMode === 'all' ? (
        CATEGORIES.map((category, index) => (
          <CategoryTabItem 
            key={category.id}
            label={category.name}
            isActive={index === activeIndex}
            progress={index === activeIndex ? progress : 0}
            currentPressIndex={index === activeIndex ? currentPressIndex : 1}
            totalPressCount={category.pressList.length || 1} // Use category.pressList.length for 'all' mode
            onClick={() => setNavigation(index, 0)}
          />
        ))
      ) : (
        currentDataList.length > 0 ? (
            currentDataList
              .slice(currentTabPageIndex * tabPageSize, (currentTabPageIndex + 1) * tabPageSize)
              .map((press, index) => {
                // Calculate absolute index for navigation
                const absoluteIndex = currentTabPageIndex * tabPageSize + index;
                return (
                  <CategoryTabItem 
                    key={press.name}
                    label={press.name}
                    isActive={absoluteIndex === flatIndex}
                    progress={absoluteIndex === flatIndex ? progress : 0}
                    currentPressIndex={absoluteIndex === flatIndex ? flatIndex + 1 : 1}
                    totalPressCount={currentDataList.length}
                    onClick={() => setNavigation(0, absoluteIndex)}
                  />
                );
              })
          ) : (
            <CategoryTabItem
              key="no-subs"
              label="구독한 언론사 없음"
              isActive={true}
              progress={0}
              currentPressIndex={0}
              totalPressCount={0}
              onClick={() => {}}
            />
          )
      )}
    </div>
  );
};

export default CategoryTabList;