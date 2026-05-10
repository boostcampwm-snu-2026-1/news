import { useState, useMemo, useEffect, useCallback } from 'react';
import FieldTab from '../FieldTab/FieldTab';
import PressHeader from './PressHeader';
import PressBody from './PressBody';
import { CATEGORIES } from '../../../data/categories';
import { mockPressData } from '../../../data/pressData';
import { useNewsstandStore } from '../../../store/NewsstandContext';

const PressOpen = () => {
  const { subscribedIds, toggleSubscription, activeTab } = useNewsstandStore();
  
  // 'all' 모드면 CATEGORIES[0], 'sub' 모드면 구독한 첫 언론사 이름
  const [activeTabName, setActiveTabName] = useState<string>(CATEGORIES[0]);
  const [activePressIndex, setActivePressIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 1. 현재 모드에 따라 탭 목록과 프레스 데이터 결정
  const isSubMode = activeTab === 'sub';
  const subscribedPresses = useMemo(() => mockPressData.filter(p => subscribedIds.has(p.id)), [subscribedIds]);
  
  const tabs = isSubMode ? subscribedPresses.map(p => p.name) : (CATEGORIES as unknown as string[]);

  // activeTab 모드가 바뀔 때마다 첫 번째 탭으로 리셋
  useEffect(() => {
    setActiveTabName(isSubMode ? (subscribedPresses[0]?.name || '') : CATEGORIES[0]);
    setActivePressIndex(0);
  }, [isSubMode, subscribedPresses.length]);

  // 2. 현재 탭에 해당하는 언론사들 필터링
  const currentCategoryPresses = useMemo(() => {
    if (isSubMode) {
      // 구독 모드에서는 탭 자체가 하나의 언론사이므로, 해당 언론사 1개만 배열로 반환
      return subscribedPresses.filter(p => p.name === activeTabName);
    }
    // 전체 모드에서는 해당 카테고리에 속한 모든 언론사 반환
    return mockPressData.filter(press => press.categoryId === activeTabName);
  }, [activeTabName, isSubMode, subscribedPresses]);

  const currentPress = currentCategoryPresses[activePressIndex];
  const isSubscribed = currentPress ? subscribedIds.has(currentPress.id) : false;

  // useCallback: 함수 레퍼런스를 안정화하여 useProgress의 effect 재실행 방지
  // (이게 없으면 매 렌더마다 새 함수가 생겨 isPaused 상태와 무관하게 타이머가 재시작됨)
  const handleProgressComplete = useCallback(() => {
    setActivePressIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      
      if (nextIndex >= currentCategoryPresses.length) {
        setActiveTabName(prevTab => {
          const currentTabIndex = tabs.indexOf(prevTab);
          const nextTabIndex = (currentTabIndex + 1) % Math.max(1, tabs.length);
          return tabs[nextTabIndex] || '';
        });
        return 0;
      }
      
      return nextIndex;
    });
  }, [currentCategoryPresses.length, tabs]);

  const handleTabChange = (tabName: string) => {
    setActiveTabName(tabName);
    setActivePressIndex(0);
  };

  if (!currentPress && tabs.length > 0) return null;
  
  if (tabs.length === 0) {
    return (
      <div className="w-[var(--width-content)] mt-[var(--spacing-48)] h-[388px] flex items-center justify-center bg-[var(--color-card)] border border-[var(--color-line)]">
        <span className="text-[var(--color-mute)] font-medium">구독한 언론사가 없습니다.</span>
      </div>
    );
  }

  return (
    <main 
      className="w-[var(--width-content)] mt-[var(--spacing-48)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FieldTab 
        tabs={tabs}
        activeTabName={activeTabName}
        onTabChange={handleTabChange}
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
