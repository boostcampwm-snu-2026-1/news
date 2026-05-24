import { useEffect, useRef, useState } from 'react'
import './FieldTab.css'

const CATEGORIES = ['종합/경제', '방송/통신', 'IT', '스포츠/연예', '매거진/전문지', '지역'] as const
export type Category = typeof CATEGORIES[number]

const DURATION = 6000 // 6초
const TICK = 100      // 100ms마다 progress 업데이트

interface FieldTabProps {
  activeCategory: Category
  articleCount: number  // 현재 탭의 총 기사 수
  currentIndex: number  // 현재 보고 있는 기사 순서
  onCategoryChange: (cat: Category) => void
}

export default function FieldTab({ activeCategory, articleCount, currentIndex, onCategoryChange }: FieldTabProps) {
  const [progress, setProgress] = useState(0)
  const elapsed = useRef(0)

  useEffect(() => {
    elapsed.current = 0
    setProgress(0)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const timer = setInterval(() => {
      elapsed.current += TICK
      const next = elapsed.current / DURATION
      if (next >= 1) {
        elapsed.current = 0
        setProgress(0)
        const currentIdx = CATEGORIES.indexOf(activeCategory)
        const nextIdx = (currentIdx + 1) % CATEGORIES.length
        onCategoryChange(CATEGORIES[nextIdx])
      } else {
        setProgress(next)
      }
    }, TICK)

    return () => clearInterval(timer)
  }, [activeCategory, onCategoryChange])

  return (
    <div className="field-tab" role="tablist">
      {CATEGORIES.map(cat => {
        const isActive = cat === activeCategory
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            className={`field-tab__item ${isActive ? 'field-tab__item--active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            <span className="field-tab__label">
              {cat}
              {isActive && (
                <span className="field-tab__counter">
                  <span className="field-tab__counter-current">{currentIndex}</span>
                  <span className="field-tab__counter-total"> / {articleCount}</span>
                </span>
              )}
            </span>
            {isActive && (
              <span
                className="field-tab__progress"
                style={{ width: `${progress * 100}%` }}
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export { CATEGORIES }
