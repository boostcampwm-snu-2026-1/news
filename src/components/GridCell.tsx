import { useRef } from 'react';
import type { PressOutlet } from '../data/press';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import './GridCell.css';

interface GridCellProps {
  press?: PressOutlet;
  isSubscribed?: boolean;
  showUnsubscribe?: boolean;
  onToggle?: (id: number) => void;
  onCellClick?: (id: number) => void;
}

function GridCell({ press, isSubscribed = false, showUnsubscribe = false, onToggle, onCellClick }: GridCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

  if (!press) {
    return <div className="grid-cell grid-cell--empty" />;
  }

  return (
    <div
      className="grid-cell"
      ref={cellRef}
      tabIndex={0}
      role="gridcell"
      onClick={() => onCellClick?.(press.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCellClick?.(press.id);
        }
      }}
    >
      <span className="grid-cell__wordmark">
        <PressWordmark name={press.name} style={press.wordmark} />
      </span>
      <span className="grid-cell__pill" onClick={(e) => e.stopPropagation()}>
        <SubscribePill
          subscribed={showUnsubscribe}
          onClick={() => {
            onToggle?.(press.id);
            cellRef.current?.focus();
          }}
        />
      </span>
    </div>
  );
}

export default GridCell;
