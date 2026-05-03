export default function SubscribePill({ isSubscribed, mode, onClick }) {
  const label = mode === 'sub' || isSubscribed ? '- 해지하기' : '+ 구독하기'

  return (
    <button className="subscribe-pill" type="button" onClick={onClick}>
      {label}
    </button>
  )
}
