import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type CategoryKey,
} from "../../state/types";
import styles from "./FieldTab.module.css";

export interface FieldTabProps {
  tabKey: CategoryKey;
  currentInTab: number;
  progress: number;
  count: number;
  onTabKeyChange: (key: CategoryKey) => void;
}

export function FieldTab({
  tabKey,
  currentInTab,
  progress,
  count,
  onTabKeyChange,
}: FieldTabProps) {
  return (
    <div className={styles.row} role="tablist">
      {CATEGORY_ORDER.map((key) => {
        const active = key === tabKey;
        return (
          <button
            key={key}
            className={`${styles.tab} ${active ? styles.tabActive : ""}`}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onTabKeyChange(key)}
          >
            {active && (
              <div
                className={styles.progress}
                style={{ width: `${Math.min(100, progress * 100)}%` }}
                aria-hidden="true"
              />
            )}
            <span className={styles.label}>{CATEGORY_LABELS[key]}</span>
            {active && (
              <span className={styles.counter}>
                <span className={styles.counterCurrent}>{currentInTab}</span>
                <span className={styles.counterDim}> / </span>
                <span className={styles.counterDim}>{count}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
