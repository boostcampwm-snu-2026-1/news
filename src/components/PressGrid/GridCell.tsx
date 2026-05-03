import { useState } from 'react';
import { Press } from '../../data/pressData';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import styles from './GridCell.module.css';

interface GridCellProps {
  press: Press | null;
}

const GridCell = ({ press }: GridCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // 임시 구독 상태 (8번 항목에서 중앙 관리로 바꿀 예정)
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!press) {
    return <div className={styles.emptyCell} />;
  }

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 셀 클릭 이벤트와 겹치지 않게 방지
    setIsSubscribed(!isSubscribed);
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
