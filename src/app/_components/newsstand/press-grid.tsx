import type { Press } from "../../_data/newsstand";
import { MinusIcon, PlusIcon } from "./icons";
import { PressWordmark } from "./press-wordmark";

export const PAGE_SIZE = 24;

type PressGridProps = {
  mode: "all" | "subscribed";
  presses: Press[];
  onToggleSubscription: (id: string) => void;
};

export function PressGrid({
  presses,
  mode,
  onToggleSubscription,
}: PressGridProps) {
  return (
    <div className="press-grid" role="list">
      {presses.map((press) => (
        <article className="press-cell" key={press.id} role="listitem">
          <PressWordmark name={press.name} wordmark={press.wordmark} />
          <button
            className="subscribe-pill"
            type="button"
            onClick={() => onToggleSubscription(press.id)}
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
        <div className="press-cell is-empty" key={`empty-${index}`} />
      ))}
    </div>
  );
}
