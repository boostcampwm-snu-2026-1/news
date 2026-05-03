type SubscriptionButtonProps = {
  subscribed?: boolean
  onClick?: () => void
}

export function SubscriptionButton({
  subscribed = false,
  onClick,
}: SubscriptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#D2DAE0] bg-white px-3 text-xs font-medium tracking-[-0.01em] text-[#5F6E76] shadow-[0_1px_2px_rgba(20,33,43,0.04)] transition hover:border-[#14212B] hover:text-[#14212B]"
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="h-2.5 w-2.5"
      >
        {subscribed ? (
          <path
            d="M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M2.5 6H9.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M6 2.5V9.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      <span>{subscribed ? '해지하기' : '구독하기'}</span>
    </button>
  )
}
