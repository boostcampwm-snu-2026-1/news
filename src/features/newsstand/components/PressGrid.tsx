import { Minus, Plus } from "lucide-react";

import { PressWordmark } from "./PressWordmark";
import type { Press } from "../types";

type PressGridAction = "subscribe" | "unsubscribe";

type PressGridProps = {
  action: PressGridAction;
  items: Press[];
};

export function PressGrid({ action, items }: PressGridProps) {
  return (
    <div className="press-grid" role="grid" aria-label="전체 언론사">
      {items.map((press) => (
        <button className="press-grid-cell" type="button" role="gridcell" aria-label={getCellLabel(action, press.name)} key={press.id}>
          <span className="press-grid-wordmark">
            <PressWordmark press={press} />
          </span>
          <SubscribePill action={action} />
        </button>
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
