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
    return <div className="w-full h-full bg-[var(--color-card)]" aria-hidden="true" />;
  }

  const handleSubscribeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onToggleSubscription) {
      onToggleSubscription(press.id);
    }
  };

  const showPill = isHovered;

  return (
    <div 
      className="w-full h-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-soft)] focus-within:bg-[var(--color-soft)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={press.name}
    >
      {/* 마우스 호버 시 구독 버튼, 키보드 포커스 시에도 노출 */}
      <div className={`${showPill ? 'block' : 'hidden'} group-focus-within:block`}>
        <SubscribePill 
          isSubscribed={isSubscribed} 
          onClick={handleSubscribeClick} 
        />
      </div>
      <div className={`${showPill ? 'hidden' : 'block'} group-focus-within:hidden`}>
        <PressWordmark press={press} />
      </div>
    </div>
  );
};

export default GridCell;
