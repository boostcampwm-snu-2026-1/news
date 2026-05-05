import { useEffect, useRef, useState } from 'react'
import './Ticker.css'

interface TickerItem {
  press: string
  title: string
}

const MOCK_ITEMS: TickerItem[] = [
  { press: '연합뉴스', title: '[속보] 도심 공원 \'조용한 독서존\' 시범 운영… 시민 호응' },
  { press: '한국경제', title: '중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목' },
  { press: 'SBS Biz',  title: '전기요금도 이제 \'알림으로 다독다독\'… 생활관리 습관 확산' },
  { press: 'MBC',      title: '출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다' },
  { press: '조선일보', title: '\'기다림이 폭신해졌어요\' 동네 버스정류장 의자, 새 단장' },
  { press: '매일경제', title: '잠들기 전에 보는 조용한 영상 한 편… OTT 힐링 추천 기능 도입' },
]

interface TickerLaneProps {
  items: TickerItem[]
  startIndex: number
}

function TickerLane({ items, startIndex }: TickerLaneProps) {
  const [index, setIndex] = useState(startIndex % items.length)
  const [visible, setVisible] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // prefers-reduced-motion이면 자동 전환 안 함
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    intervalRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length)
        setVisible(true)
      }, 275) // crossfade 절반 (0.55s / 2)
    }, 3200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [items.length])

  const item = items[index]

  return (
    <div className={`ticker__lane ${visible ? 'ticker__lane--visible' : ''}`}>
      <span className="ticker__press">{item.press}</span>
      <span className="ticker__title">{item.title}</span>
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="ticker" aria-live="off">
      <TickerLane items={MOCK_ITEMS} startIndex={0} />
      <TickerLane items={MOCK_ITEMS} startIndex={3} />
    </div>
  )
}
