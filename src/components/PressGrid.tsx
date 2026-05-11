import { useEffect, useState } from 'react'
import PressWordmark from './PressWordmark'

type Press = {
  id: string
  title: string
  category: string
}

type PressGridProps = {
  presses: Press[]
  selectedPressId?: string
  onSelectPress?: (press: Press) => void
}

export default function PressGrid({ presses, selectedPressId, onSelectPress }: PressGridProps) {
  const perPage = 24
  const [page, setPage] = useState(0)
  const [subs, setSubs] = useState<Record<string, boolean>>({})
  const [mode, setMode] = useState<'all' | 'subscribed'>('all')

  const subscribedPresses = presses.filter((press) => subs[press.id])
  const source = mode === 'all' ? presses : subscribedPresses
  const totalPages = Math.max(1, Math.ceil(source.length / perPage))
  const start = page * perPage
  const visible = source.slice(start, start + perPage)
  const padCount = mode === 'subscribed' && visible.length > 0 ? (6 - (visible.length % 6)) % 6 : 0

  useEffect(() => {
    setPage(0)
  }, [mode])

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1))
  }, [totalPages])

  function toggleSub(id: string) {
    setSubs((s) => ({ ...s, [id]: !s[id] }))
  }

  function getWordmarkProps(press: Press) {
    const titleLength = press.title.length
    const flagMap: Record<string, string> = {
      'weekly-khan': '주간',
      'boy-korea-ilbo': '소년',
      tvchosun: 'TV',
      'spotv-news': 'LIVE',
    }

    return {
      family: press.category === 'MAGAZINE' ? 'serif' : 'sans',
      italic: press.category === 'IT' || /News/i.test(press.title),
      weight: titleLength > 10 ? 500 : 700,
      tracking: titleLength > 12 ? 'tight' : titleLength > 8 ? 'normal' : 'wide',
      size: titleLength > 14 ? 'xs' : titleLength > 10 ? 'sm' : 'md',
      accent:
        press.category === 'BROADCAST'
          ? 'accent'
          : press.category === 'MAGAZINE'
            ? 'muted'
            : 'default',
      flag: flagMap[press.id],
    } as const
  }

  function handleSelectPress(press: Press) {
    onSelectPress?.(press)
  }

  const allTabId = 'press-grid-tab-all'
  const subscribedTabId = 'press-grid-tab-subscribed'
  const panelId = 'press-grid-panel'

  return (
    <section className="section-shell" aria-labelledby="press-grid-title">
      <div className="section-head">
        <div className="grid-head-left">
          <h1 id="press-grid-title">{mode === 'all' ? '전체 언론사' : '내가 구독한 언론사'}</h1>
          <div className="grid-view-tabs" role="tablist" aria-label="언론사 뷰 전환">
            <button
              id={allTabId}
              className={`grid-view-tab ${mode === 'all' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={mode === 'all'}
              aria-controls={panelId}
              tabIndex={mode === 'all' ? 0 : -1}
              onClick={() => setMode('all')}
            >
              전체
            </button>
            <button
              id={subscribedTabId}
              className={`grid-view-tab ${mode === 'subscribed' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={mode === 'subscribed'}
              aria-controls={panelId}
              tabIndex={mode === 'subscribed' ? 0 : -1}
              onClick={() => setMode('subscribed')}
            >
              구독
            </button>
          </div>
        </div>
        <div className="pagination">
          <button
            className="chevron"
            aria-label="previous page"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ‹
          </button>
          <span className="page-indicator">{page + 1} / {totalPages}</span>
          <button
            className="chevron"
            aria-label="next page"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            ›
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className="press-grid"
        role="tabpanel"
        aria-labelledby={mode === 'all' ? allTabId : subscribedTabId}
        aria-label={mode === 'all' ? '전체 언론사 그리드' : '내가 구독한 언론사 그리드'}
      >
        {mode === 'subscribed' && visible.length === 0 && (
          <p className="press-grid-empty">아직 구독한 언론사가 없습니다.</p>
        )}

        {visible.map((press, index) => {
          const subscribed = !!subs[press.id]

          return (
            <div
              key={press.id}
              className={`press-cell ${selectedPressId === press.id ? 'is-selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${press.title} (${press.category})`}
              aria-current={selectedPressId === press.id ? 'true' : undefined}
              onClick={() => handleSelectPress(press)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleSelectPress(press)
                }
              }}
            >
              <span className="press-category">{press.category}</span>
              <PressWordmark title={press.title} {...getWordmarkProps(press)} />
              <span className="press-meta">{String(start + index + 1).padStart(2, '0')}</span>
              <button
                className="subscribe-pill"
                type="button"
                aria-pressed={subscribed}
                aria-label={`${press.title} ${subscribed ? '구독 해제' : '구독'}`}
                onClick={(event) => {
                  event.stopPropagation()
                  toggleSub(press.id)
                }}
              >
                {subscribed ? '구독중' : '구독'}
              </button>
            </div>
          )
        })}

        {Array.from({ length: padCount }).map((_, idx) => (
          <div key={`pad-${idx}`} className="press-cell is-empty" aria-hidden="true" />
        ))}
      </div>
    </section>
  )
}
