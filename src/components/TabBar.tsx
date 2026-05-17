import { type ActiveTab, type ViewerMode } from "../data/newsstand";
import { GridIcon, ListIcon } from "./icons";

interface TabBarProps {
  activeTab: ActiveTab;
  viewer: ViewerMode;
  subscribedCount: number;
  listEnabled: boolean;
  onTabChange: (tab: ActiveTab) => void;
  onViewerChange: (viewer: ViewerMode) => void;
}

export function TabBar({
  activeTab,
  viewer,
  subscribedCount,
  listEnabled,
  onTabChange,
  onViewerChange
}: TabBarProps) {
  return (
    <div className="tabbar">
      <div className="tabbar__tabs" role="tablist" aria-label="뉴스스탠드 탭">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={activeTab === "all" ? "tabbar__tab is-active" : "tabbar__tab"}
          onClick={() => onTabChange("all")}
        >
          전체 언론사
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "sub"}
          className={activeTab === "sub" ? "tabbar__tab is-active" : "tabbar__tab"}
          onClick={() => onTabChange("sub")}
        >
          내가 구독한 언론사
          <span className="tabbar__badge" aria-label={`구독 중인 언론사 ${subscribedCount}곳`}>
            {subscribedCount}
          </span>
        </button>
      </div>

      <div className="tabbar__viewer" aria-label="보기 전환">
        <button
          type="button"
          className={viewer === "list" ? "viewer-button is-active" : "viewer-button"}
          aria-pressed={viewer === "list"}
          disabled={!listEnabled}
          onClick={() => onViewerChange("list")}
        >
          <ListIcon active={viewer === "list"} />
        </button>
        <button
          type="button"
          className={viewer === "grid" ? "viewer-button is-active" : "viewer-button"}
          aria-pressed={viewer === "grid"}
          onClick={() => onViewerChange("grid")}
        >
          <GridIcon active={viewer === "grid"} />
        </button>
      </div>
    </div>
  );
}
