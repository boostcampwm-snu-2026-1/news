import { useState } from 'react'

type Article = {
  title: string
  summary: string
  time: string
}

type Press = { id: string; title: string; category: string }

export default function ArticleList({ featured, articles }: { featured: Press; articles: Article[] }) {
  const [active, setActive] = useState<'main' | 'latest' | 'subs'>('main')

  return (
    <section className="section-shell list-shell" aria-labelledby="opened-press-title">
      <div className="section-head list-head">
        <div>
          <p className="eyebrow">Opened Press</p>
          <h2 id="opened-press-title">구독한 언론사 기사 목록</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="언론사 탭 미리보기">
          <button
            className={`tab ${active === 'main' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'main'}
            onClick={() => setActive('main')}
          >
            주요 기사
          </button>
          <button
            className={`tab ${active === 'latest' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'latest'}
            onClick={() => setActive('latest')}
          >
            최신 기사
          </button>
          <button
            className={`tab ${active === 'subs' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={active === 'subs'}
            onClick={() => setActive('subs')}
          >
            구독 현황
          </button>
        </div>
      </div>

      <div className="list-layout">
        <article className="featured-card">
          <p className="featured-kicker">오늘의 대표 기사</p>
          <div className="featured-visual" aria-hidden="true" />
          <h3>{featured.title}</h3>
          <p className="featured-source">{featured.category} · {featured.title}</p>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum placerat lorem,
            vitae tincidunt nunc suscipit eget.
          </p>
        </article>

        <ol className="article-list">
          {articles.map((article, index) => (
            <li key={article.title}>
              <span className="article-index">0{index + 1}</span>
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
