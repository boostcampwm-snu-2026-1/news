import { Minus, Plus } from "lucide-react";

import { PressWordmark } from "./PressWordmark";
import type { Press } from "../types";

type PressGridAction = "subscribe" | "unsubscribe";

type PressGridProps = {
  action: PressGridAction;
  items: Press[];
  ariaLabel: string;
  onToggle: (pressId: string) => void;
  pageSize?: number;
};

export function PressGrid({ action, items, ariaLabel, onToggle, pageSize = 24 }: PressGridProps) {
  const emptyCount = Math.max(0, pageSize - items.length);

  return (
    <div className="press-grid" role="grid" aria-label={ariaLabel}>
      {items.map((press) => (
        <button
          className="press-grid-cell"
          type="button"
          role="gridcell"
          aria-label={getCellLabel(action, press.name)}
          key={press.id}
          onClick={() => onToggle(press.id)}
        >
          <span className="press-grid-wordmark">
            <PressWordmark press={press} />
          </span>
          <SubscribePill action={action} />
        </button>
      ))}
      {Array.from({ length: emptyCount }).map((_, index) => (
        <div className="press-grid-cell-empty" role="gridcell" aria-hidden="true" key={`empty-${index}`} />
      ))}
    </div>
  );
}

function SubscribePill({ action }: { action: PressGridAction }) {
  const isSubscribe = action === "subscribe";

  return (
    <span className="press-grid-action-pill" aria-hidden="true">
      {isSubscribe ? <Plus size={10} strokeWidth={1.3} /> : <Minus size={10} strokeWidth={1.3} />}
      {isSubscribe ? "구독하기" : "해지하기"}
    </span>
  );
}

function getCellLabel(action: PressGridAction, pressName: string) {
  return action === "subscribe" ? `${pressName} 구독하기` : `${pressName} 구독 해지하기`;
}
