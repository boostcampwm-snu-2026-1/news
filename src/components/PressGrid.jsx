import GridCell from './GridCell'
import { PRESS_PAGE_SIZE } from '../data/pressData'

export default function PressGrid({ items, subscribed, mode, isEmpty, onSubscribe }) {
  const slots = Array.from({ length: PRESS_PAGE_SIZE }, (_, index) => items[index] ?? null)

  return (
    <section className="press-grid" role="grid" aria-label="언론사 목록">
      {isEmpty && (
        <p className="press-grid__empty" role="status">
          구독한 언론사가 없습니다
        </p>
      )}
      {slots.map((press, index) => (
        <GridCell
          key={press?.id ?? `empty-${index}`}
          press={press}
          isSubscribed={press ? subscribed.has(press.id) : false}
          mode={mode}
          onSubscribe={onSubscribe}
        />
      ))}
    </section>
  )
}
