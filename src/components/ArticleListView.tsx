import { useLayoutEffect, useRef } from 'react'
import { PressWordmark } from './PressWordmark'
import type {
  CategoryMeta,
  Publisher,
  PublisherCategory,
} from '../types/newsStand'

interface ArticleListViewProps {
  activeCategory: PublisherCategory
  activeCategoryIndex: number
  categories: readonly CategoryMeta[]
  categoryCounts: ReadonlyMap<PublisherCategory, number>
  publisher: Publisher
  progressEnabled: boolean
  isSubscribed: boolean
  onCategorySelect: (category: PublisherCategory) => void
  onClose: () => void
  onToggleSubscription: (publisherId: Publisher['id']) => void
}

export function ArticleListView({
  activeCategory,
  activeCategoryIndex,
  categories,
  categoryCounts,
  publisher,
  progressEnabled,
  isSubscribed,
  onCategorySelect,
  onClose,
  onToggleSubscription,
}: ArticleListViewProps) {
  const viewRef = useRef<HTMLElement | null>(null)
  const leadArticle = publisher.articles.find((article) => article.isLead)
  const listArticles = publisher.articles.slice(0, 6)
  const subscriptionLabel = isSubscribed ? '해지하기' : '구독하기'
  const subscriptionPrefix = isSubscribed ? '-' : '+'
  const imageSeed = encodeURIComponent(
    `${publisher.id}-${leadArticle?.id ?? 'lead'}`,
  )
  const imageSrc = `https://picsum.photos/seed/${imageSeed}/680/376`

  useLayoutEffect(() => {
    viewRef.current?.focus()
  }, [publisher.id])

  return (
    <div className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      <div
        aria-label="언론사 분야"
        className="flex h-10 border border-line bg-soft"
        role="tablist"
      >
        {categories.map((category, index) => {
          const isActive = category.key === activeCategory
          const categoryCount = categoryCounts.get(category.key) ?? 0

          return (
            <button
              aria-controls="selected-publisher-panel"
              aria-selected={isActive}
              className={`relative flex min-w-0 flex-1 items-center justify-between gap-2 overflow-hidden px-4 text-left text-[14px] transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent ${
                isActive
                  ? 'bg-accent font-bold text-card'
                  : 'font-medium text-sub hover:bg-card'
              } ${index === 0 ? '' : 'border-l border-line'}`}
              key={category.key}
              onClick={() => onCategorySelect(category.key)}
              role="tab"
              type="button"
            >
              {isActive ? (
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-full origin-left bg-accent-deep ${
                    progressEnabled
                      ? 'animate-[field-tab-progress_var(--duration-progress)_linear_forwards]'
                      : 'scale-x-0'
                  }`}
                  key={publisher.id}
                />
              ) : null}
              <span className="relative z-10 truncate">{category.label}</span>
              <span
                className={`relative z-10 shrink-0 font-mono text-[length:var(--text-mono-tab-size)] font-medium leading-[var(--text-mono-tab-leading)] ${
                  isActive ? 'text-card/80' : 'text-mute'
                }`}
              >
                {isActive ? activeCategoryIndex : 1}/{categoryCount}
              </span>
            </button>
          )
        })}
      </div>
      <article
        aria-labelledby="selected-publisher-title"
        className="flex h-[calc(var(--layout-content-height)-40px)] flex-col border-x border-b border-line bg-card px-8 py-6"
        id="selected-publisher-panel"
        ref={viewRef}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <PressWordmark className="max-w-none" publisher={publisher} />
            <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
              {publisher.editedAt}
            </p>
            <button
              aria-label={`${publisher.name} ${subscriptionLabel}`}
              className="flex h-7 shrink-0 items-center gap-1 rounded-pill border border-line bg-card px-3 text-[length:var(--text-badge-size)] font-medium leading-[var(--text-badge-leading)] text-sub shadow-pill hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
              onClick={() => onToggleSubscription(publisher.id)}
              type="button"
            >
              <span aria-hidden="true" className="text-[10px] leading-none">
                {subscriptionPrefix}
              </span>
              {subscriptionLabel}
            </button>
          </div>
          <button
            className="shrink-0 text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={onClose}
            type="button"
          >
            언론사 목록으로 돌아가기
          </button>
        </div>
        <div className="mt-1 flex min-h-0 flex-1 gap-6">
          <section className="flex w-[340px] shrink-0 flex-col">
            <div className="h-[188px] overflow-hidden border border-line bg-soft">
              <img
                alt={leadArticle?.title ?? `${publisher.name} 주요 기사 이미지`}
                className="size-full object-cover"
                height="188"
                loading="lazy"
                src={imageSrc}
                width="340"
              />
            </div>
            <h2
              className="mt-3 text-[length:var(--text-heading-size)] font-bold leading-[1.45] text-ink"
              id="selected-publisher-title"
            >
              {leadArticle?.title ?? `${publisher.name} 주요 기사`}
            </h2>
          </section>
          <section
            aria-label={`${publisher.name} 기사 목록`}
            className="flex min-w-0 flex-1 flex-col"
          >
            <ul className="m-0 grid list-none gap-3 p-0">
              {listArticles.map((article) => (
                <li
                  className="flex items-start gap-2 text-[length:var(--text-list-item-size)] font-medium leading-[var(--text-list-item-leading)] text-ink"
                  key={article.id}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] size-[3px] shrink-0 bg-ink"
                  />
                  {article.title}
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-mute">
              {publisher.name} 언론사에서 직접 편집한 뉴스입니다.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
