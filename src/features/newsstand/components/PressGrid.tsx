import { PressWordmark } from "./PressWordmark";
import type { Press } from "../types";

type PressGridProps = {
  items: Press[];
};

export function PressGrid({ items }: PressGridProps) {
  return (
    <div className="press-grid" role="grid" aria-label="전체 언론사">
      {items.map((press) => (
        <button className="press-grid-cell" type="button" role="gridcell" key={press.id}>
          <PressWordmark press={press} />
        </button>
      ))}
    </div>
  );
}
