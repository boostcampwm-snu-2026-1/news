import type { KeyboardEvent } from "react";
import type { Press } from "../../_data/newsstand";
import { MinusIcon, PlusIcon } from "./icons";
import { PressWordmark } from "./press-wordmark";
import { PAGE_SIZE } from "./state";

type PressGridProps = {
  mode: "all" | "subscribed";
  presses: Press[];
  onOpenPress: (id: string) => void;
  onToggleSubscription: (id: string) => void;
};

export function PressGrid({
  presses,
  mode,
  onOpenPress,
  onToggleSubscription,
}: PressGridProps) {
  const handleKeyDown =
    (pressId: string) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      onOpenPress(pressId);
    };

  return (
    <div className="press-grid" role="list">
      {presses.map((press) => (
        <article
          aria-label={`${press.name} 기사 리스트 열기`}
          className="press-cell"
          data-press-id={press.id}
          key={press.id}
          onClick={() => onOpenPress(press.id)}
          onKeyDown={handleKeyDown(press.id)}
          role="button"
          tabIndex={0}
        >
          <PressWordmark name={press.name} wordmark={press.wordmark} />
          <button
            className="subscribe-pill"
            data-press-action={press.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleSubscription(press.id);
            }}
          >
            {mode === "subscribed" || press.subscribed ? (
              <>
                <MinusIcon />
                해지하기
              </>
            ) : (
              <>
                <PlusIcon />
                구독하기
              </>
            )}
          </button>
        </article>
      ))}
      {Array.from({ length: PAGE_SIZE - presses.length }).map((_, index) => (
        <div aria-hidden="true" className="press-cell is-empty" key={`empty-${index}`} />
      ))}
    </div>
  );
}
