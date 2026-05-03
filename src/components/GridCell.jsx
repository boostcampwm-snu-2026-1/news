import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'

export default function GridCell({ press, isSubscribed, mode, onSubscribe }) {
  if (!press) {
    return <article className="grid-cell grid-cell--empty" role="gridcell" aria-hidden="true" />
  }

  return (
    <article
      className={`grid-cell ${isSubscribed ? 'grid-cell--subscribed' : ''}`}
      role="gridcell"
      aria-label={press.name}
    >
      <div className="grid-cell__wordmark">
        <PressWordmark press={press} />
      </div>
      <SubscribePill
        isSubscribed={isSubscribed}
        mode={mode}
        pressName={press.name}
        onClick={() => onSubscribe(press.id)}
      />
    </article>
  )
}
