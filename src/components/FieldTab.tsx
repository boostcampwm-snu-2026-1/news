import type { CategoryKey } from '../types';
import { CATEGORY_KEYS, TAB_TOTAL } from '../data/categories';
import styles from './FieldTab.module.css';

type Props = {
  activeKey: CategoryKey;
  currentInTab: number;
  progress: number;
  onSelect: (k: CategoryKey) => void;
};

export default function FieldTab({
  activeKey,
  currentInTab,
  progress,
  onSelect,
}: Props) {
  return (
    <div className={styles.root} role="tablist">
      {CATEGORY_KEYS.map((key) => {
        const active = key === activeKey;
        return (
          <button
            type="button"
            key={key}
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => onSelect(key)}
          >
            {active && (
              <span
                className={styles.progressFill}
                style={{ transform: `scaleX(${progress})` }}
              />
            )}
            <span className={styles.tabContent}>
              <span className={styles.label}>{key}</span>
              {active && (
                <span className={styles.counter}>
                  <span>{currentInTab}</span>
                  <span className={styles.counterTotal}>/ {TAB_TOTAL}</span>
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
