import React, { useState } from 'react';
import styles from './GridCell.module.css';
import PressWordmark from '@/components/common/PressWordmark/PressWordmark';
import Button from '@/components/common/Button/Button';
import { PressWordmarkProps } from '@/types/press';

const GridCell: React.FC<PressWordmarkProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 구독 로직 추가 예정
    console.log(`${props.name} 구독 클릭`);
  };

  return (
    <div 
      className={`${styles.cell} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Button text="구독하기" onClick={handleSubscribe} />
      ) : (
        <PressWordmark {...props} />
      )}
    </div>
  );
};

export default GridCell;