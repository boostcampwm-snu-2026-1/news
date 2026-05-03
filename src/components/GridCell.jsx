import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'

export default function GridCell({ press, isSubscribed, mode, onSubscribe }) {
  return (
    <article className="grid-cell">
      <PressWordmark press={press} />
      <SubscribePill
        isSubscribed={isSubscribed}
        mode={mode}
        onClick={() => onSubscribe(press.id)}
      />
    </article>
  )
}
