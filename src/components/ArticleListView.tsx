import { useLayoutEffect, useRef } from 'react'
import { PressWordmark } from './PressWordmark'
import type { Publisher } from '../types/newsStand'

interface ArticleListViewProps {
  publisher: Publisher
  onClose: () => void
}

export function ArticleListView({ publisher, onClose }: ArticleListViewProps) {
  const viewRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    viewRef.current?.focus()
  }, [publisher.id])

  return (
    <article
      aria-labelledby="selected-publisher-title"
      className="min-h-[var(--layout-content-height)] border border-line bg-card px-8 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      ref={viewRef}
      tabIndex={-1}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <PressWordmark className="max-w-none" publisher={publisher} />
          <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
            {publisher.editedAt}
          </p>
        </div>
        <button
          className="shrink-0 text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={onClose}
          type="button"
        >
          언론사 목록으로 돌아가기
        </button>
      </div>
      <h2
        className="mt-8 text-[length:var(--text-heading-size)] font-bold leading-[1.45] text-ink"
        id="selected-publisher-title"
      >
        {publisher.name} 주요 기사
      </h2>
      <ul className="mt-5 mb-0 grid list-none gap-3 p-0">
        {publisher.articles.map((article) => (
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
    </article>
  )
}
