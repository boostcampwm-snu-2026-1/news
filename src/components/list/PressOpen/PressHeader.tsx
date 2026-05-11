import type { Press } from '../../../types/press';
import PressWordmark from '../../grid/PressGrid/PressWordmark';
import SubscribePill from '../../grid/PressGrid/SubscribePill';

interface PressHeaderProps {
  press: Press;
  isSubscribed: boolean;
  onToggleSubscription: (id: string) => void;
}

const PressHeader = ({ press, isSubscribed, onToggleSubscription }: PressHeaderProps) => {
  return (
    <div className="flex items-center gap-[16px] px-[24px] py-[12px]">
      <div className="scale-105 origin-left flex items-center">
        <PressWordmark press={press} />
      </div>
      
      {press.articles && (
        <span className="text-[12px] font-medium text-[var(--color-sub)] tabular-nums">
          {press.articles.editTime}
        </span>
      )}
      
      <div className="ml-2">
        <SubscribePill 
          isSubscribed={isSubscribed} 
          onClick={() => onToggleSubscription(press.id)} 
        />
      </div>
    </div>
  );
};

export default PressHeader;
