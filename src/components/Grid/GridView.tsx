import React, { useState } from 'react';
import styles from './GridView.module.css';
import GridCell from './GridCell';
import ChevronIcon from '@/assets/ChevronIcon';
import { PRESS_LIST } from '@/constants/pressData';

const ITEMS_PER_PAGE = 24;

const GridView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(PRESS_LIST.length / ITEMS_PER_PAGE);

  const currentPressList = PRESS_LIST.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

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