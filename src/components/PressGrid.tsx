import PressWordmark, { type PressData } from './PressWordmark'
import './PressGrid.css'

interface PressGridProps {
  items: PressData[]
}

export default function PressGrid({ items }: PressGridProps) {
  // 24개 고정 — 빈 자리는 빈 셀로 채움
  const cells = Array.from({ length: 24 }, (_, i) => items[i] ?? null)

  return (
    <div className="press-grid">
      {cells.map((press, i) => (
        <div key={press?.id ?? `empty-${i}`} className="press-grid__cell">
          {press && <PressWordmark press={press} />}
        </div>
      ))}
    </div>
  )
}
