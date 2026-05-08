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
  if (!press) {
    return <div className="grid-cell grid-cell--empty" />;
  }

  return (
    <div
      className="grid-cell"
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
            (document.activeElement as HTMLElement)?.blur();
          }}
        />
      </span>
    </div>
  );
}

export default GridCell;
