import PressLogo from '../data/logos';
import type { Press } from '../types';

interface PressGridCellProps {
  press?: Press;
  isSubscribed?: boolean;
  onToggleSubscription?: (pressId: string) => void;
  className?: string;
}

export default function PressGridCell({
  press,
  isSubscribed = false,
  onToggleSubscription,
  className = '',
}: PressGridCellProps) {
  if (!press) {
    return <div className={`h-[98px] border-r border-b border-[#e0e0e0] bg-white ${className}`} aria-hidden="true" />;
  }

  const buttonLabel = isSubscribed ? '− 해지하기' : '+ 구독하기';
  const ariaLabel = `${press.name} ${isSubscribed ? '구독 해지' : '구독하기'}`;

  return (
    <div
      className={`group relative flex h-[98px] min-w-0 items-center justify-center overflow-hidden border-r border-b border-[#e0e0e0] bg-white ${className}`}
    >
      <div className="h-16 w-[132px] transition-opacity duration-150 group-hover:opacity-20 group-focus-within:opacity-20">
        <PressLogo pressId={press.id} fallbackName={press.name} />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          aria-label={ariaLabel}
          aria-pressed={isSubscribed}
          onClick={() => onToggleSubscription?.(press.id)}
          className="pointer-events-auto rounded-full bg-[#f0f0f0] px-4 py-2 text-sm font-bold text-gray-800 shadow-sm transition-colors hover:bg-[#e6e6e6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4169e1]"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

