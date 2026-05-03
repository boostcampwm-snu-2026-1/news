import { useState } from 'react';
import { Press } from '../../data/pressData';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import styles from './GridCell.module.css';

interface GridCellProps {
  press: Press | null;
  isSubscribed: boolean;
  onToggleSubscription: (id: string) => void;
}

const GridCell = ({ press, isSubscribed, onToggleSubscription }: GridCellProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!press) {
    return <div className={styles.emptyCell} />;
  }

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSubscription(press.id);
  };

  return (
    <div 
      className={styles.cell}
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
