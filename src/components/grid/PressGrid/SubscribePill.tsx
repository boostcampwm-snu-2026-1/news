interface SubscribePillProps {
  isSubscribed: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubscribePill = ({ isSubscribed, onClick }: SubscribePillProps) => {
  return (
    <button 
      className="h-[28px] px-[12px] rounded-[14px] bg-[var(--color-card)] border border-[var(--color-line)] flex items-center gap-[var(--spacing-4)] shadow-[0_1px_2px_rgba(20,33,43,0.04)] cursor-pointer hover:bg-[var(--color-soft)]"
      onClick={onClick}
    >
      <span className="text-[14px] font-medium text-[var(--color-sub)]">{isSubscribed ? '−' : '+'}</span>
      <span className="text-[12px] font-medium text-[var(--color-sub)]">{isSubscribed ? '해지하기' : '구독하기'}</span>
    </button>
  );
};

export default SubscribePill;
