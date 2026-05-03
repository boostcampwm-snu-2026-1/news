import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'

export default function GridCell({ press, isSubscribed, mode, onSubscribe }) {
  if (!press) {
    return <article className="grid-cell grid-cell--empty" role="gridcell" aria-hidden="true" />
  }

  return (
    <article className="grid-cell" role="gridcell">
      <PressWordmark press={press} />
      <SubscribePill
        isSubscribed={isSubscribed}
        mode={mode}
        onClick={() => onSubscribe(press.id)}
      />
    </article>
  )
}
