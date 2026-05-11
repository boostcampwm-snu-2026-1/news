import { CATEGORY_LABEL, CATEGORY_ORDER, type CategoryKey } from '@/types/press';
import styles from './FieldTabs.module.css';

type FieldTabsProps = {
  active: CategoryKey;
  currentInTab: number;
  tabCount: number;
  progress: number; // 0..1, fill ratio of the active tab
  countByTab: Record<CategoryKey, number>;
  onTabClick: (key: CategoryKey) => void;
};

/**
 * 6개 카테고리 탭 (디자인 시스템 §6.9 field tabs).
 *  - active 탭: --accent bg + --accent-deep progress fill + 흰 글씨 + mono counter
 *  - inactive 탭: --soft bg, --sub 글씨, 라벨만
 *  - progress fill은 active 탭 width의 0..1 비율 (left → right)
 */
export function FieldTabs({
  active,
  currentInTab,
  tabCount,
  progress,
  countByTab,
  onTabClick,
}: FieldTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="언론사 섹션">
      {CATEGORY_ORDER.map((key) => {
        const isActive = key === active;
        const totalForTab = countByTab[key];

        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => onTabClick(key)}
          >
            {isActive && (
              <span
                className={styles.fill}
                style={{ transform: `scaleX(${progress})` }}
                aria-hidden="true"
              />
            )}
            <span className={styles.label}>{CATEGORY_LABEL[key]}</span>
            {isActive ? (
              <span className={styles.counter}>
                <span className="tabular">
                  {currentInTab + 1} / {tabCount}
                </span>
              </span>
            ) : (
              <span className={styles.counterMute}>
                <span className="tabular">{totalForTab}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
