import { useEffect, useState } from 'react'

const TICKER_ITEMS = [
  {
    press: '서울경제',
    title: '반도체 투자 확대에 AI 인프라 수요도 함께 증가',
  },
  {
    press: 'SBS Biz',
    title: '금융권 생성형 AI 도입 속도, 내부 검증 체계가 변수',
  },
  {
    press: 'KBS WORLD',
    title: '글로벌 빅테크, 한국어 AI 서비스 고도화 경쟁',
  },
  {
    press: '전자신문',
    title: '클라우드 비용 최적화가 AI 서비스 운영의 핵심 과제로 부상',
  },
]

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export default function Ticker() {
  const [tickerState, setTickerState] = useState({
    activeIndex: 0,
    visibleLane: 0,
    lanes: [TICKER_ITEMS[0], TICKER_ITEMS[1]],
  })
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setTickerState((currentState) => {
        const nextIndex = (currentState.activeIndex + 1) % TICKER_ITEMS.length
        const nextLane = currentState.visibleLane === 0 ? 1 : 0
        const lanes = [...currentState.lanes]

        lanes[nextLane] = TICKER_ITEMS[nextIndex]

        return {
          activeIndex: nextIndex,
          visibleLane: nextLane,
          lanes,
        }
      })
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [isPaused, prefersReducedMotion])

  return (
    <section
      className="ticker"
      aria-label="주요 뉴스"
      tabIndex="0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="ticker__viewport" aria-live="polite" aria-atomic="true">
        {tickerState.lanes.map((item, laneIndex) => {
          const isVisible = tickerState.visibleLane === laneIndex

          return (
            <p
              className={`ticker__item ${isVisible ? 'ticker__item--active' : 'ticker__item--hidden'}`}
              aria-hidden={!isVisible}
              key={`${laneIndex}-${item.title}`}
            >
              <span className="ticker__press">{item.press}</span>
              <span className="ticker__title">{item.title}</span>
            </p>
          )
        })}
      </div>
    </section>
  )
}
