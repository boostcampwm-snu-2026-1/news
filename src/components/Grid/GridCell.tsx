import React, { useState } from 'react';
import styles from './GridCell.module.css';
import PressWordmark from '@/components/common/PressWordmark/PressWordmark';
import Button from '@/components/common/Button/Button';
import { PressWordmarkProps } from '@/types/press';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useView } from '@/contexts/ViewContext';
import { CATEGORIES } from '@/constants/newsData';

const GridCell: React.FC<PressWordmarkProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSubscribed, subscribe, unsubscribe } = useSubscription();
  const { setViewMode, setNavigation } = useView();

  const subscribed = isSubscribed(props.name);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subscribed) {
      unsubscribe(props.name);
    } else {
      subscribe(props.name);
    }
  };

  const handleCellClick = () => {
    // 리스트 뷰에서 해당 언론사의 위치 찾기
    CATEGORIES.forEach((category, catIdx) => {
      const pressIdx = category.pressList.findIndex(p => p.name === props.name);
      if (pressIdx !== -1) {
        setNavigation(catIdx, pressIdx);
        setViewMode('list');
      }
    });
  };

  return (
    <div 
      className={`${styles.cell} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCellClick}
      style={{ cursor: 'pointer' }}
    >
      {isHovered ? (
        <Button 
          text={subscribed ? "해지하기" : "구독하기"} 
          onClick={handleSubscribe} 
        />
      ) : (
        <PressWordmark {...props} />
      )}
    </div>
  );
};

export default GridCell;