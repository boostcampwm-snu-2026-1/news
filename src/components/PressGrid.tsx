import type { PressOutlet } from '../data/press';
import GridCell from './GridCell';
import './PressGrid.css';

interface PressGridProps {
  items: (PressOutlet | undefined)[];
  subscribedIds: Set<number>;
  isSubTab: boolean;
  onToggle: (id: number) => void;
  onCellClick?: (id: number) => void;
}

function PressGrid({ items, subscribedIds, isSubTab, onToggle, onCellClick }: PressGridProps) {
  const cells = Array.from({ length: 24 }, (_, i) => items[i]);

  return (
    <div className="press-grid" role="grid" aria-label="언론사 목록">
      {cells.map((press, i) => (
        <GridCell
          key={press?.id ?? `empty-${i}`}
          press={press}
          isSubscribed={press ? subscribedIds.has(press.id) : false}
          showUnsubscribe={press ? (isSubTab ? true : subscribedIds.has(press.id)) : false}
          onToggle={onToggle}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
}

export default PressGrid;
