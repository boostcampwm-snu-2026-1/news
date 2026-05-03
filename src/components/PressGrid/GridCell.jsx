import { useState } from 'react';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import styles from './GridCell.module.css';

const GridCell = ({ press, isSubscribed, onToggleSubscription }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!press) {
    return <div className={styles.emptyCell} />;
  }

  const handleSubscribeClick = (e) => {
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
