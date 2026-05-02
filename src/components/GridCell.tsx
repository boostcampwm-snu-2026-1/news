import type { PressOutlet } from '../data/press';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import './GridCell.css';

interface GridCellProps {
  press?: PressOutlet;
  isSubscribed?: boolean;
  showUnsubscribe?: boolean;
  onToggle?: (id: number) => void;
}

function GridCell({ press, isSubscribed = false, showUnsubscribe = false, onToggle }: GridCellProps) {
  if (!press) {
    return <div className="grid-cell grid-cell--empty" />;
  }

  return (
    <div className="grid-cell" tabIndex={0}>
      <span className="grid-cell__wordmark">
        <PressWordmark name={press.name} style={press.wordmark} />
      </span>
      <span className="grid-cell__pill">
        <SubscribePill
          subscribed={showUnsubscribe}
          onClick={() => onToggle?.(press.id)}
        />
      </span>
    </div>
  );
}

export default GridCell;
