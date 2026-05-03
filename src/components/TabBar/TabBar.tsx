import type { NewsstandTab, ViewerMode } from "../../types/newsstand";
import styles from "./TabBar.module.css";

type TabBarProps = {
  activeTab: NewsstandTab;
  subCount: number;
  viewer: ViewerMode;
  onTabChange: (tab: NewsstandTab) => void;
  onViewerChange: (viewer: ViewerMode) => void;
};

export function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs} role="tablist" aria-label="언론사 보기">
        <button role="tab" aria-selected={activeTab === "all"} type="button" onClick={() => onTabChange("all")}>
          전체 언론사
        </button>
        <button role="tab" aria-selected={activeTab === "sub"} type="button" onClick={() => onTabChange("sub")}>
          내가 구독한 언론사
          <span className={styles.badge} aria-label={`구독 중인 언론사 ${subCount}곳`}>
            {subCount}
          </span>
        </button>
      </div>
      <div className={styles.viewerToggle} aria-label="보기 방식">
        <button aria-pressed={viewer === "grid"} type="button" onClick={() => onViewerChange("grid")}>
          □
        </button>
        <button aria-pressed={viewer === "list"} type="button" onClick={() => onViewerChange("list")}>
          ≡
        </button>
      </div>
    </div>
  );
}
