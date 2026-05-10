import PressWordmark from './PressWordmark'
import SubscribePill from './SubscribePill'

export default function GridCell({ press, isSubscribed, mode, onSubscribe, onOpen }) {
  if (!press) {
    return <article className="grid-cell grid-cell--empty" role="gridcell" aria-hidden="true" />
  }

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(press.id)
    }
  }

  return (
    <article
      className={`grid-cell ${isSubscribed ? 'grid-cell--subscribed' : ''}`}
      role="gridcell"
      tabIndex="0"
      aria-label={`${press.name} 기사 목록 열기`}
      onClick={() => onOpen(press.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="grid-cell__wordmark">
        <PressWordmark press={press} />
      </div>
      <SubscribePill
        isSubscribed={isSubscribed}
        mode={mode}
        pressName={press.name}
        onClick={(action) => onSubscribe(press.id, action)}
      />
    </article>
  )
}
