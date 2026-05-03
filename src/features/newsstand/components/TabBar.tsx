import { Grid3X3, List } from "lucide-react";

export type NewsstandTab = "all" | "subscribed";
export type ViewerMode = "list" | "grid";

type TabBarProps = {
  activeTab: NewsstandTab;
  subCount: number;
  viewer: ViewerMode;
  onTabChange: (tab: NewsstandTab) => void;
  onViewerChange: (viewer: ViewerMode) => void;
};

export function TabBar({ activeTab, subCount, viewer, onTabChange, onViewerChange }: TabBarProps) {
  return (
    <div className="newsstand-tabbar">
      <div className="newsstand-tabs" role="tablist" aria-label="언론사 보기">
        <button
          className="newsstand-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          onClick={() => onTabChange("all")}
        >
          전체 언론사
        </button>
        <button
          className="newsstand-tab newsstand-tab-with-badge"
          type="button"
          role="tab"
          aria-selected={activeTab === "subscribed"}
          onClick={() => onTabChange("subscribed")}
        >
          내가 구독한 언론사
          <span className="newsstand-sub-badge" aria-label={`구독 중인 언론사 ${subCount}곳`}>
            {subCount}
          </span>
        </button>
      </div>

      <div className="newsstand-viewer-toggle" aria-label="보기 방식">
        <button
          className="newsstand-viewer-button"
          type="button"
          aria-label="리스트 보기"
          aria-pressed={viewer === "list"}
          onClick={() => onViewerChange("list")}
        >
          <List aria-hidden="true" size={24} strokeWidth={1.6} />
        </button>
        <button
          className="newsstand-viewer-button"
          type="button"
          aria-label="그리드 보기"
          aria-pressed={viewer === "grid"}
          onClick={() => onViewerChange("grid")}
        >
          <Grid3X3 aria-hidden="true" size={24} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
