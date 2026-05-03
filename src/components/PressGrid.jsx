import GridCell from './GridCell'

export default function PressGrid({ items, subscribed, mode, onSubscribe }) {
  return (
    <section className="press-grid" aria-label="언론사 목록">
      {items.map((press) => (
        <GridCell
          key={press.id}
          press={press}
          isSubscribed={subscribed.has(press.id)}
          mode={mode}
          onSubscribe={onSubscribe}
        />
      ))}
    </section>
  )
}
