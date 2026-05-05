import PressWordmark from './PressWordmark'
import type { PressData } from './PressWordmark'
import './PressOpen.css'

const MOCK_ARTICLES = [
  '전기요금도 이제 \'알림으로 다독다독\'… 생활관리 습관 확산',
  '출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다',
  '\'기다림이 폭신해졌어요\' 동네 버스정류장 의자, 새 단장',
  '데이터 걱정 내려놓기 실험… 통신사, \'마음 편한 요금제\' 선보여',
  '잠들기 전에 보는 조용한 영상 한 편… OTT, 힐링 추천 기능 도입',
  '\'길 잃지 않게 도와줄게요\' 친절해진 환승 안내 목소리',
]

interface PressOpenProps {
  press: PressData
  isSubscribed: boolean
  onSubscribe: () => void
  onUnsubscribe: () => void
}

export default function PressOpen({ press, isSubscribed, onSubscribe, onUnsubscribe }: PressOpenProps) {
  const editTime = '2026.01.14. 18:53 편집'

  return (
    <div className="press-open">
      <div className="press-open__head">
        <PressWordmark press={{ ...press }} />
        <span className="press-open__edit-time">{editTime}</span>
        <button
          className="press-open__pill"
          onClick={isSubscribed ? onUnsubscribe : onSubscribe}
        >
          {isSubscribed ? '− 해지하기' : '+ 구독하기'}
        </button>
      </div>

      <div className="press-open__body">
        <div className="press-open__image-col">
          <div className="press-open__image-box" aria-label="헤드라인 이미지" />
          <p className="press-open__headline">
            {MOCK_ARTICLES[0]}
          </p>
        </div>

        <ul className="press-open__article-list">
          {MOCK_ARTICLES.slice(1).map((title, i) => (
            <li key={i} className="press-open__article-item">
              <span className="press-open__bullet" aria-hidden="true" />
              {title}
            </li>
          ))}
          <li className="press-open__footnote">
            {press.name} 언론사에서 직접 편집한 뉴스입니다.
          </li>
        </ul>
      </div>
    </div>
  )
}
