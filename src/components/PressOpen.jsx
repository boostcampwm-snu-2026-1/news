import { getPressArticleDeck } from '../data/pressData'
import FieldTab from './FieldTab'
import PressWordmark from './PressWordmark'

export default function PressOpen({
  press,
  tabKey,
  progress,
  currentInTab,
  onTabChange,
  onClose,
}) {
  if (!press) {
    return (
      <section className="press-open press-open--empty" role="status">
        리스트로 열 언론사를 선택해 주세요
      </section>
    )
  }

  const tabs = getPressArticleDeck(press)
  const activeTab = tabs.find((tab) => tab.key === tabKey) ?? tabs[0]
  const activeArticleIndex = Math.min(currentInTab, activeTab.articles.length - 1)

  return (
    <section
      className="press-open"
      aria-label={`${press.name} 기사 목록`}
    >
      <div className="press-open__header">
        <div className="press-open__identity">
          <PressWordmark press={press} />
          <span className="press-open__meta">{press.category}</span>
        </div>
        <button className="press-open__close" type="button" aria-label="리스트 닫기" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <FieldTab tabs={tabs} activeKey={activeTab.key} progress={progress} onTabChange={onTabChange} />

      <div
        className="press-open__article-panel"
        id="press-open-panel"
        role="tabpanel"
        aria-label={`${activeTab.label} 기사`}
      >
        <ol className="press-open__articles">
          {activeTab.articles.map((article, index) => {
            const isCurrent = index === activeArticleIndex

            return (
              <li
                className={`press-open__article ${isCurrent ? 'press-open__article--current' : ''}`}
                aria-current={isCurrent ? 'true' : undefined}
                key={article.id}
              >
                <span className="press-open__article-index">{index + 1}</span>
                <span className="press-open__article-text">{article.title}</span>
                <span className="press-open__article-meta">{article.meta}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
