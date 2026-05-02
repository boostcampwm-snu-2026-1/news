import { PressWordmark } from './PressWordmark'
import type { Publisher } from '../types/newsStand'

interface PublisherCellProps {
  publisher: Pick<Publisher, 'name' | 'wordmark'>
}

export function PublisherCell({ publisher }: PublisherCellProps) {
  return (
    <div className="flex size-full items-center justify-center">
      <PressWordmark publisher={publisher} />
    </div>
  )
}
