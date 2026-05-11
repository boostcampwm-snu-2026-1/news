import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

type Article = {
  title: string
  summary: string
  time: string
}

type TabPayload = {
  featuredKicker: string
  featuredSummary: string
  items: Article[]
}

type TabKey = 'main' | 'latest' | 'subs'

type ArticlesByTab = Record<TabKey, TabPayload>

type Press = { id: string; title: string; category: string }

export default function ArticleList({
  featured,
  articlesByTab,
  sectionRef,
}: {
  featured: Press
  articlesByTab: ArticlesByTab
  sectionRef?: RefObject<HTMLElement | null>
}) {
  const [active, setActive] = useState<TabKey>('main')
  const tabMainId = 'opened-tab-main'
  const tabLatestId = 'opened-tab-latest'
  const tabSubsId = 'opened-tab-subs'
  const panelId = 'opened-tabpanel'
  const currentPayload = articlesByTab[active]

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive((current) => {
        if (current === 'main') return 'latest'
        if (current === 'latest') return 'subs'
        return 'main'
      })
    }, 6000)

    return () => window.clearTimeout(timeout)
  }, [active])

  return (
    <section className="section-shell list-shell" aria-labelledby="opened-press-title" ref={sectionRef}>
      <div className="section-head list-head">
        <div>
          <p className="eyebrow">Opened Press</p>
          <h2 id="opened-press-title">구독한 언론사 기사 목록</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="언론사 탭 미리보기">
          <button
            id={tabMainId}
            className={`tab ${active === 'main' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'main'}
            aria-controls={panelId}
            tabIndex={active === 'main' ? 0 : -1}
            onClick={() => setActive('main')}
          >
            주요 기사
            {active === 'main' && <span key="progress-main" className="tab-progress" aria-hidden="true" />}
          </button>
          <button
            id={tabLatestId}
            className={`tab ${active === 'latest' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'latest'}
            aria-controls={panelId}
            tabIndex={active === 'latest' ? 0 : -1}
            onClick={() => setActive('latest')}
          >
            최신 기사
            {active === 'latest' && (
              <span key="progress-latest" className="tab-progress" aria-hidden="true" />
            )}
          </button>
          <button
            id={tabSubsId}
            className={`tab ${active === 'subs' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'subs'}
            aria-controls={panelId}
            tabIndex={active === 'subs' ? 0 : -1}
            onClick={() => setActive('subs')}
          >
            구독 현황
            {active === 'subs' && <span key="progress-subs" className="tab-progress" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={
          active === 'main' ? tabMainId : active === 'latest' ? tabLatestId : tabSubsId
        }
        className="list-layout"
      >
        <article className="featured-card">
          <p className="featured-kicker">{currentPayload.featuredKicker}</p>
          <div className="featured-visual" aria-hidden="true" />
          <h3>{featured.title}</h3>
          <p className="featured-source">{featured.category} · {featured.title}</p>
          <p>{currentPayload.featuredSummary}</p>
        </article>

        <ol className="article-list">
          {currentPayload.items.map((article, index) => (
            <li key={article.title}>
              <span className="article-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="article-body">
                <p className="article-title">{article.title}</p>
                <p className="article-summary">{article.summary}</p>
                <p className="article-time">{article.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
