import type { Press, PressCategory } from "../../_data/newsstand";

type ListPreviewProps = {
  activeCategory: PressCategory;
  categories: Array<{
    category: PressCategory;
    count: number;
  }>;
  emptyStateLabel: string;
  onSelectCategory: (category: PressCategory) => void;
  onToggleSubscription: (id: string) => void;
  progressKey: string;
  progressLabel: string;
  selectedPress?: Press;
};

export function ListPreview({
  activeCategory,
  categories,
  emptyStateLabel,
  onSelectCategory,
  onToggleSubscription,
  progressKey,
  progressLabel,
  selectedPress,
}: ListPreviewProps) {
  return (
    <section className="list-preview">
      <div className="field-tabs" role="tablist" aria-label="기사 카테고리">
        {categories.map(({ category, count }) => {
          const isActive = category === activeCategory;

          return (
            <button
              aria-selected={isActive}
              className={isActive ? "field-tab is-active" : "field-tab"}
              data-category={category}
              disabled={count === 0}
              key={category}
              role="tab"
              type="button"
              onClick={() => onSelectCategory(category)}
            >
              <span>{category}</span>
              {isActive ? <b>{progressLabel}</b> : null}
              {isActive && selectedPress ? (
                <span
                  aria-hidden="true"
                  className="field-progress"
                  key={progressKey}
                />
              ) : null}
            </button>
          );
        })}
      </div>
      {selectedPress ? (
        <div className="opened-press">
          <div className="opened-meta">
            <strong>{selectedPress.name}</strong>
            <span>{selectedPress.editedAt}</span>
            <button
              data-selected-press-action={selectedPress.id}
              type="button"
              onClick={() => onToggleSubscription(selectedPress.id)}
            >
              {selectedPress.subscribed ? "해지하기" : "구독하기"}
            </button>
          </div>
          <div className="opened-body">
            <div className="headline-image" data-headline-card={selectedPress.id}>
              <span>headline image</span>
              <strong>{selectedPress.headline}</strong>
            </div>
            <ul>
              {selectedPress.articles.map((article) => (
                <li key={article}>{article}</li>
              ))}
            </ul>
          </div>
          <p>{selectedPress.name} 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      ) : (
        <div className="list-empty-state">
          <strong>리스트 뷰를 열 수 없습니다.</strong>
          <p>{emptyStateLabel}</p>
        </div>
      )}
    </section>
  );
}
