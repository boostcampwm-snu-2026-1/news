import React, { useMemo, useEffect, useState, useCallback } from 'react';
import styles from './ListView.module.css';
import CategoryTabList from './CategoryTab/CategoryTabList';
import PressArticleContent from './PressArticle/PressArticleContent';
import { useView } from '@/contexts/ViewContext';
import ChevronIcon from '@/assets/ChevronIcon'; // Import ChevronIcon
import { useSubscription } from '@/contexts/SubscriptionContext';
import { CATEGORIES, LISTVIEW_TIMER_DURATION } from '@/constants/newsData';
import { useTimer } from '@/hooks/useTimer';

const ListView: React.FC = () => {
  const { 
    currentCategoryIndex, 
    currentPressIndex, 
    setNavigation, 
    viewMode,
    tabMode,
    setTabMode,
    currentTabPageIndex, // New: Get current tab page index
    setCurrentTabPageIndex // New: Get setter for tab page index
  } = useView();
  const { subscribedIds } = useSubscription();
  const [isPaused, setIsPaused] = useState(false);

  // 전체 언론사 데이터를 평탄화하고 중복된 언론사를 제거함
  const allPressData = useMemo(() => {
    const flattened = CATEGORIES.flatMap(cat => cat.pressList);
    const seen = new Set<string>();
    return flattened.filter(press => {
      if (seen.has(press.name)) return false;
      seen.add(press.name);
      return true;
    });
  }, []);

  const subscribedPressList = useMemo(() => 
    allPressData.filter(press => subscribedIds.includes(press.name)), 
  [allPressData, subscribedIds]);

  const TAB_PAGE_SIZE = 6;

  // Determine which list of presses to use based on tabMode
  const currentDataList = useMemo(() => {
    if (tabMode === 'all') {
      return CATEGORIES[currentCategoryIndex]?.pressList || [];
    } else { // tabMode === 'subs'
      return subscribedPressList;
    }
  }, [tabMode, currentCategoryIndex, subscribedPressList]);

  // 기사 인덱스가 변경될 때 탭 페이지 자동 동기화
  useEffect(() => {
    if (tabMode === 'subs') {
      const newTabPage = Math.floor(currentPressIndex / TAB_PAGE_SIZE);
      if (newTabPage !== currentTabPageIndex) {
        setCurrentTabPageIndex(newTabPage);
      }
    }
  }, [currentPressIndex, tabMode, setCurrentTabPageIndex, currentTabPageIndex]);

  // 구독 해지 등으로 인해 현재 인덱스가 범위를 벗어날 경우 안전하게 리셋
  useEffect(() => {
    if (tabMode === 'subs' && currentPressIndex >= currentDataList.length && currentDataList.length > 0) {
      setNavigation(0, currentDataList.length - 1);
    } else if (tabMode === 'subs' && currentDataList.length === 0) {
      // 구독 언론사가 0명이 되면 자동으로 '전체 언론사' 탭으로 이동
      setNavigation(0, 0);
      setCurrentTabPageIndex(0);
      setTabMode('all'); 
    } else if (tabMode === 'subs' && currentPressIndex < 0 && currentDataList.length > 0) {
      setNavigation(0, 0); // 인덱스가 음수가 되는 경우 방지
    }
  }, [currentDataList.length, currentPressIndex, tabMode, setNavigation, setCurrentTabPageIndex]);

  const currentPress = currentDataList[currentPressIndex];

  const handleNext = useCallback(() => {
    if (tabMode === 'all') {
      const isLastPressInCategory = currentPressIndex === currentDataList.length - 1;
      if (!isLastPressInCategory) {
        setNavigation(currentCategoryIndex, currentPressIndex + 1);
      } else {
        const nextCategoryIndex = (currentCategoryIndex + 1) % CATEGORIES.length;
        setNavigation(nextCategoryIndex, 0);
      }
    } else {
      // 구독 언론사 순환
      if (currentDataList.length > 0) {
        const nextPressIndex = (currentPressIndex + 1) % currentDataList.length;
        setNavigation(0, nextPressIndex);
      }
    }
  }, [tabMode, currentPressIndex, currentDataList.length, currentCategoryIndex, setNavigation]);

  const handlePrev = useCallback(() => {
    if (tabMode === 'all') {
      if (currentPressIndex > 0) {
        setNavigation(currentCategoryIndex, currentPressIndex - 1);
      } else {
        let prevCatIdx = (currentCategoryIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
        // 데이터가 있는 카테고리를 찾을 때까지 역행
        while (CATEGORIES[prevCatIdx].pressList.length === 0 && prevCatIdx !== currentCategoryIndex) {
          prevCatIdx = (prevCatIdx - 1 + CATEGORIES.length) % CATEGORIES.length;
        }
        setNavigation(prevCatIdx, Math.max(0, CATEGORIES[prevCatIdx].pressList.length - 1));
      }
    } else if (currentDataList.length > 0) {
      const prevIdx = (currentPressIndex - 1 + currentDataList.length) % currentDataList.length;
      setNavigation(0, prevIdx);
    }
  }, [tabMode, currentPressIndex, currentCategoryIndex, setNavigation, currentDataList.length]);

  const isPrevDisabled = useMemo(() => {
    if (tabMode === 'all') {
      return currentPressIndex === 0 && currentCategoryIndex === 0;
    } else { // tabMode === 'subs'
      return currentPressIndex === 0;
    }
  }, [currentPressIndex, currentCategoryIndex, tabMode]);

  const isNextDisabled = useMemo(() => {
    if (tabMode === 'all') {
      return currentPressIndex === currentDataList.length - 1 && currentCategoryIndex === CATEGORIES.length - 1;
    } else { // tabMode === 'subs'
      return currentPressIndex === currentDataList.length - 1;
    }
  }, [currentPressIndex, currentDataList.length, currentCategoryIndex, tabMode]);

  const { progress, reset } = useTimer({
    duration: LISTVIEW_TIMER_DURATION,
    onFinished: handleNext,
    isActive: viewMode === 'list' && currentDataList.length > 0 && !isPaused
  });

  // 언론사가 바뀌거나(구독/해지 포함) 네비게이션이 일어날 때 타이머를 리셋하여 자연스러운 흐름 제공
  useEffect(() => {
    reset();
  }, [currentPress, reset]);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.navButton} ${styles.left} ${isPrevDisabled ? styles.disabled : ''}`}
        onClick={handlePrev}
        aria-label="이전 페이지"
        disabled={isPrevDisabled}
      >
        <ChevronIcon direction="left" color={isPrevDisabled ? 'var(--color-mute)' : 'var(--color-sub)'} />
      </button>

      <div className={styles.listViewContainer}>
        <nav className={styles.categoryNav}>
          <CategoryTabList 
            activeIndex={currentCategoryIndex} 
            progress={progress} 
            currentPressIndex={currentPressIndex + 1}
            currentTabPageIndex={currentTabPageIndex}
            tabPageSize={TAB_PAGE_SIZE}
            currentDataList={currentDataList}
          />
        </nav>
        
        <article 
          className={styles.contentArea}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {tabMode === 'subs' && subscribedPressList.length === 0 ? (
            <div className={styles.empty}>구독한 언론사가 없습니다.</div>
          ) : currentPress ? (
            <PressArticleContent data={currentPress} />
          ) : (
            <div className={styles.empty}>해당 카테고리에 편성된 뉴스가 없습니다.</div>
          )}
        </article>
      </div>

      <button 
        className={`${styles.navButton} ${styles.right} ${isNextDisabled ? styles.disabled : ''}`}
        onClick={handleNext}
        aria-label="다음 페이지"
        disabled={isNextDisabled}
      >
        <ChevronIcon direction="right" color={isNextDisabled ? 'var(--color-mute)' : 'var(--color-sub)'} />
      </button>
    </div>
  );
};

export default ListView;