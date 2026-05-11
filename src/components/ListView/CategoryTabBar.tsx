import { CATEGORIES } from '../../types';
import type { Category } from '../../types';
import styles from './CategoryTabBar.module.css';

interface Props {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  progress: number;
  currentIndex: number;
  total: number;
}

export default function CategoryTabBar({ activeCategory, onCategoryChange, progress, currentIndex, total }: Props) {
  return (
    <div className={styles.tabBar}>
      {CATEGORIES.map(cat => {
        const isActive = cat === activeCategory;
        return (
          <button
            key={cat}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {isActive && (
              <span
                className={styles.progressBar}
                style={{
                  width: `${progress}%`,
                  transition: progress === 0 ? 'none' : 'width 0.1s linear',
                }}
              />
            )}
            <span className={styles.tabLabel}>{cat}</span>
            {isActive && total > 0 && (
              <span className={styles.counter}>
                <span>{currentIndex}</span>
                <span className={styles.counterDim}> / {total}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
