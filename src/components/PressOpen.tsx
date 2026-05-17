import { CATEGORY_ORDER, type CategoryKey, type Press } from "../data/newsstand";
import { PressWordmark } from "./PressWordmark";

interface PressOpenProps {
  press: Press;
  categoryKey: CategoryKey;
  currentInTab: number;
  progress: number;
  subscribed: boolean;
  reducedMotion: boolean;
  onCategoryChange: (categoryKey: CategoryKey) => void;
  onToggleSubscription: (pressId: string) => void;
}

export function PressOpen({
  press,
  categoryKey,
  currentInTab,
  progress,
  subscribed,
  reducedMotion,
  onCategoryChange,
  onToggleSubscription
}: PressOpenProps) {
  const articles = press.categories[categoryKey].articles;
  const activeArticle = articles[currentInTab] ?? articles[0];
  const listStart = Math.max(0, Math.min(currentInTab - 2, articles.length - 6));
  const visibleArticles = articles.slice(listStart, listStart + 6);

  return (
    <section className="open-panel" aria-label={`${press.name} 기사 리스트 뷰`}>
      <div className="field-tabs" role="tablist" aria-label="기사 카테고리">
        {CATEGORY_ORDER.map((category) => {
          const count = press.categories[category.key].articles.length;
          const isActive = category.key === categoryKey;

          return (
            <button
              key={category.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? "field-tab is-active" : "field-tab"}
              onClick={() => onCategoryChange(category.key)}
            >
              {isActive && (
                <span
                  className="field-tab__progress"
                  style={{ width: `${Math.max(0, Math.min(progress, 1)) * 100}%` }}
                />
              )}
              <span className="field-tab__label">{category.label}</span>
              <span className="field-tab__count">
                {isActive ? currentInTab + 1 : 1} / {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="open-panel__frame">
        <div className="open-panel__head">
          <PressWordmark press={press} compact />
          <span className="open-panel__edited-at">{activeArticle.editedAt} 편집</span>
          <button
            type="button"
            className="subscribe-pill"
            onClick={() => onToggleSubscription(press.id)}
          >
            {subscribed ? "− 해지하기" : "+ 구독하기"}
          </button>
        </div>

        <div className="open-panel__body">
          <div className="open-panel__lead">
            <div className="headline-image" aria-hidden="true">
              <span>{press.name}</span>
              <small>{press.categories[categoryKey].label}</small>
            </div>
            <div>
              <p className="open-panel__kicker">{press.descriptor}</p>
              <h2 className="open-panel__headline">{activeArticle.title}</h2>
              <p className="open-panel__summary">{activeArticle.summary}</p>
            </div>
          </div>

          <div className="open-panel__list">
            <ul>
              {visibleArticles.map((article) => {
                const isCurrent = article.id === activeArticle.id;

                return (
                  <li key={article.id} className={isCurrent ? "is-current" : ""}>
                    {article.title}
                  </li>
                );
              })}
            </ul>
            <p className="open-panel__footnote">
              {press.name} 언론사에서 직접 편집한 뉴스입니다.
              {reducedMotion ? " 모션 감소 설정이 감지되어 자동 전환은 멈춘 상태입니다." : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
