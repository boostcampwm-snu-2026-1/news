import { useState } from 'react';
import { mockPressData } from '../../data/pressData';
import GridCell from './GridCell';
import styles from './PressGrid.module.css';

interface PressGridProps {
  subscribedIds: Set<string>;
  onToggleSubscription: (id: string) => void;
}

const ITEMS_PER_PAGE = 24;

const PressGrid = ({ subscribedIds, onToggleSubscription }: PressGridProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(mockPressData.length / ITEMS_PER_PAGE);

  // 현재 페이지에 해당하는 데이터만 추출
  const currentItems = mockPressData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // 24개 칸을 채우기 위한 배열 생성 (데이터가 모자라면 null로 채움)
  const cells = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => currentItems[i] || null);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <main className={styles.gridContainer}>
      <div className={styles.grid}>
        {cells.map((press, index) => (
          <GridCell 
            key={press ? press.id : `empty-${index}`} 
            press={press} 
            isSubscribed={press ? subscribedIds.has(press.id) : false}
            onToggleSubscription={onToggleSubscription}
          />
        ))}
      </div>
      
      {/* 좌우 화살표 버튼 (페이지네이션) */}
      {currentPage > 0 && (
        <button className={`${styles.chevron} ${styles.left}`} onClick={handlePrevPage} aria-label="이전 페이지">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M18 34L6 20L18 6" />
          </svg>
        </button>
      )}
      
      {currentPage < totalPages - 1 && (
        <button className={`${styles.chevron} ${styles.right}`} onClick={handleNextPage} aria-label="다음 페이지">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6 34L18 20L6 6" />
          </svg>
        </button>
      )}
    </main>
  );
};

export default PressGrid;
