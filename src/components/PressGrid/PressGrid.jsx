import { useState } from 'react';
import { mockPressData } from '../../data/pressData';
import GridCell from './GridCell';
import styles from './PressGrid.module.css';

const ITEMS_PER_PAGE = 24;

const PressGrid = ({ subscribedIds, onToggleSubscription }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(mockPressData.length / ITEMS_PER_PAGE);

  const currentItems = mockPressData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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
      
      {currentPage > 0 && (
        <button className={`${styles.chevron} ${styles.left}`} onClick={handlePrevPage}>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M18 34L6 20L18 6" />
          </svg>
        </button>
      )}
      
      {currentPage < totalPages - 1 && (
        <button className={`${styles.chevron} ${styles.right}`} onClick={handleNextPage}>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6 34L18 20L6 6" />
          </svg>
        </button>
      )}
    </main>
  );
};

export default PressGrid;
