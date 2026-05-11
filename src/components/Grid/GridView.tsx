import React, { useState, useMemo, useEffect } from 'react';
import styles from './GridView.module.css';
import GridCell from './GridCell';
import ChevronIcon from '@/assets/ChevronIcon';
import { PRESS_LIST } from '@/constants/pressData';
import { useView } from '@/contexts/ViewContext';
import { useSubscription } from '@/contexts/SubscriptionContext';

const ITEMS_PER_PAGE = 24;

const GridView: React.FC = () => {
  const { tabMode } = useView();
  const { subscribedIds } = useSubscription();
  const [currentPage, setCurrentPage] = useState(0);

  // tabMode에 따라 렌더링할 리스트를 필터링
  const filteredList = useMemo(() => {
    if (tabMode === 'all') return PRESS_LIST;
    return PRESS_LIST.filter((press) => subscribedIds.includes(press.name));
  }, [tabMode, subscribedIds]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / ITEMS_PER_PAGE));

  // 탭이 바뀌거나 구독 목록이 변할 때 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [tabMode, subscribedIds.length]);

  const currentPressList = filteredList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  // 구독 모드인데 구독한 언론사가 없는 경우 예외 처리
  if (tabMode === 'subs' && filteredList.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>구독한 언론사가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button 
        className={`${styles.navButton} ${styles.prev} ${currentPage === 0 ? styles.disabled : ''}`}
        onClick={handlePrev}
      >
        <ChevronIcon direction="left" color={currentPage === 0 ? 'var(--color-mute)' : 'var(--color-sub)'} />
      </button>

      <div className={styles.gridContainer}>
        {currentPressList.map((press) => (
          <GridCell key={press.name} {...press} />
        ))}
        
        {/* 6x4 그리드 형태 유지를 위해 모자란 칸을 빈 셀로 채움 */}
        {Array.from({ length: ITEMS_PER_PAGE - currentPressList.length }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.emptyCell} />
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.next} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
        onClick={handleNext}
      >
        <ChevronIcon direction="right" color={currentPage === totalPages - 1 ? 'var(--color-mute)' : 'var(--color-sub)'} />
      </button>
    </div>
  );
};

export default GridView;