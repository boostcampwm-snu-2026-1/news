import './SubscribePill.css';

interface SubscribePillProps {
  subscribed: boolean;
  onClick: () => void;
}

function SubscribePill({ subscribed, onClick }: SubscribePillProps) {
  const label = subscribed ? '해지하기' : '구독하기';
  const icon = subscribed ? '−' : '+';

  return (
    <button className="pill" onClick={onClick} aria-label={label}>
      <span className="pill__icon" aria-hidden="true">{icon}</span>
      <span className="pill__text">{label}</span>
    </button>
  );
}

export default SubscribePill;
