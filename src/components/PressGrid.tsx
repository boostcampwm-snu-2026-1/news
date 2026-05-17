import { type ActiveTab, type Press } from "../data/newsstand";
import { PressWordmark } from "./PressWordmark";

interface PressGridProps {
  cells: Array<Press | null>;
  activeTab: ActiveTab;
  subscribedIds: Set<string>;
  onOpen: (pressId: string) => void;
  onToggleSubscription: (pressId: string) => void;
}

export function PressGrid({
  cells,
  activeTab,
  subscribedIds,
  onOpen,
  onToggleSubscription
}: PressGridProps) {
  return (
    <section className="grid" aria-label="언론사 그리드">
      {cells.map((press, index) => {
        if (!press) {
          return <div key={`empty-${index}`} className="grid-cell grid-cell--empty" aria-hidden="true" />;
        }

        const isSubscribed = subscribedIds.has(press.id);
        const pillLabel =
          activeTab === "sub"
            ? "− 해지하기"
            : isSubscribed
              ? "− 구독중"
              : "+ 구독하기";

        return (
          <article
            key={press.id}
            className="grid-cell"
            tabIndex={0}
            onClick={() => onOpen(press.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(press.id);
              }
            }}
          >
            <div className="grid-cell__body">
              <PressWordmark press={press} />
            </div>
            <div className="grid-cell__meta">{press.descriptor}</div>
            <button
              type="button"
              className="grid-cell__pill"
              aria-label={`${press.name} ${pillLabel.replace(/[+\-]/g, "").trim()}`}
              onClick={(event) => {
                event.stopPropagation();
                onToggleSubscription(press.id);
              }}
            >
              {pillLabel}
            </button>
          </article>
        );
      })}
    </section>
  );
}
