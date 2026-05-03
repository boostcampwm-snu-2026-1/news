import { PAGE_SIZE } from "../../data/presses";
import type { NewsstandTab, Press } from "../../types/newsstand";
import { PressGridCell } from "./PressGridCell";
import styles from "./PressGrid.module.css";

type PressGridProps = {
  activeTab: NewsstandTab;
  items: Press[];
  subscribedIds: Set<string>;
  onOpen: (pressId: string) => void;
  onSubscribe: (pressId: string) => void;
  onUnsubscribe: (pressId: string) => void;
};

export function PressGrid({ activeTab, items, subscribedIds, onOpen, onSubscribe, onUnsubscribe }: PressGridProps) {
  const emptyCells = Array.from({ length: Math.max(0, PAGE_SIZE - items.length) }, (_, index) => `empty-${index}`);

  if (activeTab === "sub" && items.length === 0) {
    return <div className={styles.empty}>구독한 언론사가 없습니다.</div>;
  }

  return (
    <div className={styles.grid} aria-label={activeTab === "all" ? "전체 언론사" : "내가 구독한 언론사"}>
      {items.map((press) => (
        <PressGridCell
          activeTab={activeTab}
          isSubscribed={subscribedIds.has(press.id)}
          key={press.id}
          press={press}
          onOpen={onOpen}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      ))}
      {emptyCells.map((cellId) => (
        <div className={styles.cell} aria-hidden="true" key={cellId} />
      ))}
    </div>
  );
}
