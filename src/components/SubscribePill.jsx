export default function SubscribePill({ isSubscribed, mode, pressName, onClick }) {
  const action = mode === 'sub' ? 'unsubscribe' : 'subscribe'
  const isUnsubscribeAction = action === 'unsubscribe'
  const label = isUnsubscribeAction ? '해지하기' : '구독하기'
  const symbol = isUnsubscribeAction ? '-' : '+'
  const ariaLabel = isUnsubscribeAction
    ? `${pressName} 구독 해지하기`
    : isSubscribed
      ? `${pressName} 이미 구독 중, 구독 상태 유지`
      : `${pressName} 구독하기`

  const handleClick = (event) => {
    event.stopPropagation()
    onClick(action)
  }

  return (
    <button
      className={`subscribe-pill subscribe-pill--${action}`}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isUnsubscribeAction ? undefined : isSubscribed}
      data-action={action}
      onClick={handleClick}
    >
      <span className="subscribe-pill__symbol" aria-hidden="true">
        {symbol}
      </span>
      <span>{label}</span>
    </button>
  )
}
