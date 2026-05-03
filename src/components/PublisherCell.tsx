import { PressWordmark } from './PressWordmark'
import type { Publisher } from '../types/newsStand'

interface PublisherCellProps {
  publisher: Pick<Publisher, 'id' | 'name' | 'wordmark'>
  isSubscribed: boolean
  onOpenPublisher: (publisherId: Publisher['id']) => void
  onToggleSubscription: (publisherId: Publisher['id']) => void
}

export function PublisherCell({
  publisher,
  isSubscribed,
  onOpenPublisher,
  onToggleSubscription,
}: PublisherCellProps) {
  const actionLabel = isSubscribed ? '해지하기' : '구독하기'
  const actionPrefix = isSubscribed ? '-' : '+'

  return (
    <div className="relative flex size-full items-center justify-center">
      <button
        aria-label={`${publisher.name} 기사 보기`}
        className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent"
        onClick={() => onOpenPublisher(publisher.id)}
        type="button"
      >
        <PressWordmark
          className="transition-opacity duration-150 motion-reduce:transition-none group-hover:opacity-0 group-focus-within:opacity-0"
          publisher={publisher}
        />
      </button>
      <button
        aria-label={`${publisher.name} ${actionLabel}`}
        className="absolute inset-auto flex h-7 items-center gap-1 rounded-pill border border-line bg-card px-3 text-[length:var(--text-badge-size)] font-medium leading-[var(--text-badge-leading)] text-sub opacity-0 shadow-pill transition-[background-color,color,opacity] duration-150 motion-reduce:transition-none hover:bg-soft focus:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent group-hover:opacity-100 group-focus-within:opacity-100"
        data-publisher-action-id={publisher.id}
        onClick={() => onToggleSubscription(publisher.id)}
        type="button"
      >
        <span aria-hidden="true" className="text-[10px] leading-none">
          {actionPrefix}
        </span>
        {actionLabel}
      </button>
    </div>
  )
}
