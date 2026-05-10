import { useState } from 'react';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import type { Press } from '../../../types/press';

interface GridCellProps {
  press: Press | null;
  isSubscribed?: boolean;
  onToggleSubscription?: (id: string) => void;
}

const GridCell = ({ press, isSubscribed = false, onToggleSubscription }: GridCellProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!press) {
    return <div className="w-full h-full bg-[var(--color-card)] flex items-center justify-center" />;
  }

  const handleSubscribeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onToggleSubscription) {
      onToggleSubscription(press.id);
    }
  };

  return (
    <div 
      className="w-full h-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-soft)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <SubscribePill 
          isSubscribed={isSubscribed} 
          onClick={handleSubscribeClick} 
        />
      ) : (
        <PressWordmark press={press} />
      )}
    </div>
  );
};

export default GridCell;
