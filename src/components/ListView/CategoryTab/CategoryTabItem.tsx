import React from 'react';
import styles from './CategoryTabItem.module.css';

interface CategoryTabItemProps {
  label: string;
  isActive: boolean;
  progress: number;
  currentPressIndex?: number;
  totalPressCount?: number;
  onClick: () => void;
}

const CategoryTabItem: React.FC<CategoryTabItemProps> = ({ 
  label, 
  isActive, 
  progress, 
  currentPressIndex = 1,
  totalPressCount = 1,
  onClick 
}) => {
  return (
    <div 
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div 
        className={styles.progressBar} 
        style={{ width: isActive ? `${progress}%` : '0%' }}
      />
      <span className={styles.name}>{label}</span>
      {isActive && totalPressCount > 0 && ( // totalPressCount가 0보다 크면 카운터 표시 (1/1도 포함)
        <span className={styles.counter}>
          <span className={styles.current}>{currentPressIndex}</span>
          <span className={styles.divider}>/</span>
          <span className={styles.total}>{totalPressCount}</span>
        </span>
      )}
    </div>
  );
};

export default CategoryTabItem;