export default function SubscribePill({ isSubscribed, mode, pressName, onClick }) {
  const isUnsubscribeAction = mode === 'sub' || isSubscribed
  const label = isUnsubscribeAction ? '- 해지하기' : '+ 구독하기'
  const ariaLabel = isUnsubscribeAction
    ? `${pressName} 구독 해지하기`
    : `${pressName} 구독하기`

  return (
    <button className="subscribe-pill" type="button" aria-label={ariaLabel} onClick={onClick}>
      {label}
    </button>
  )
}
