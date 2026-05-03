import styles from "./TabBar.module.css";

export type TabId = "all" | "sub";
export type ViewerId = "grid" | "list";

export interface TabBarProps {
  activeTab: TabId;
  subCount: number;
  viewer: ViewerId;
  onTabChange: (tab: TabId) => void;
  onViewerChange: (viewer: ViewerId) => void;
}

export function TabBar({
  activeTab,
  subCount,
  viewer,
  onTabChange,
  onViewerChange,
}: TabBarProps) {
  return (
    <div className={`contentCol tabbarRow ${styles.bar}`}>
      <div className={styles.left} role="tablist">
        <TabButton
          active={activeTab === "all"}
          label="전체 언론사"
          onClick={() => onTabChange("all")}
        />
        <TabButton
          active={activeTab === "sub"}
          label="내가 구독한 언론사"
          onClick={() => onTabChange("sub")}
          badge={subCount}
        />
      </div>
      <div className={styles.right}>
        <ViewerButton
          active={viewer === "list"}
          label="리스트 뷰"
          onClick={() => onViewerChange("list")}
        >
          <ListIcon />
        </ViewerButton>
        <ViewerButton
          active={viewer === "grid"}
          label="그리드 뷰"
          onClick={() => onViewerChange("grid")}
        >
          <GridIcon />
        </ViewerButton>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  badge?: number;
}

function TabButton({ active, label, onClick, badge }: TabButtonProps) {
  return (
    <button
      className={`${styles.tab} ${active ? styles.tabActive : styles.tabInactive}`}
      role="tab"
      aria-selected={active}
      type="button"
      onClick={onClick}
    >
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={styles.badge}
          aria-label={`구독 중인 언론사 ${badge}곳`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

interface ViewerButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ViewerButton({ active, label, onClick, children }: ViewerButtonProps) {
  return (
    <button
      className={`${styles.viewer} ${active ? styles.viewerActive : ""}`}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" fill="currentColor" />
      <rect x="14" y="4" width="6" height="6" fill="currentColor" />
      <rect x="4" y="14" width="6" height="6" fill="currentColor" />
      <rect x="14" y="14" width="6" height="6" fill="currentColor" />
    </svg>
  );
}
