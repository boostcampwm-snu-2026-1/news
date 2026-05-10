import { Minus, Plus } from "lucide-react";

import { PressWordmark } from "./PressWordmark";
import type { Press } from "../types";

type PressGridAction = "subscribe" | "unsubscribe";

type PressGridProps = {
  action: PressGridAction;
  items: Press[];
  ariaLabel: string;
  onToggle: (pressId: string) => void;
  onOpen: (pressId: string) => void;
  pageSize?: number;
};

export function PressGrid({ action, items, ariaLabel, onToggle, onOpen, pageSize = 24 }: PressGridProps) {
  const emptyCount = Math.max(0, pageSize - items.length);
  const isSubscribe = action === "subscribe";

  return (
    <div className="press-grid" role="grid" aria-label={ariaLabel}>
      {items.map((press) => (
        <div className="press-grid-cell" role="gridcell" key={press.id}>
          <button
            className="press-grid-cell-open"
            type="button"
            aria-label={`${press.name} 기사 보기`}
            onClick={() => onOpen(press.id)}
          >
            <span className="press-grid-wordmark">
              <PressWordmark press={press} />
            </span>
          </button>
          <button
            className="press-grid-action-pill"
            type="button"
            aria-label={isSubscribe ? `${press.name} 구독하기` : `${press.name} 구독 해지하기`}
            onClick={() => onToggle(press.id)}
          >
            {isSubscribe ? <Plus size={10} strokeWidth={1.3} /> : <Minus size={10} strokeWidth={1.3} />}
            {isSubscribe ? "구독하기" : "해지하기"}
          </button>
        </div>
      ))}
      {Array.from({ length: emptyCount }).map((_, index) => (
        <div className="press-grid-cell-empty" role="gridcell" aria-hidden="true" key={`empty-${index}`} />
      ))}
    </div>
  );
}
