export default function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <section className="ticker" aria-label="알림 배너">
      <div className="ticker-layer primary" aria-hidden="false">
        <div className="ticker-track">
          {doubled.map((item, idx) => (
            <span key={`p-${item}-${idx}`} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="ticker-layer secondary" aria-hidden="true">
        <div className="ticker-track">
          {doubled.map((item, idx) => (
            <span key={`s-${item}-${idx}`} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
