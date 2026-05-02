import { useLayoutEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { NewsstandShell } from './components/NewsstandShell'
import { Pagination } from './components/Pagination'
import { PublisherGrid } from './components/PublisherGrid'
import { ScopeTabs } from './components/ScopeTabs'
import { ViewToggle } from './components/ViewToggle'
import { PUBLISHER_GRID_PAGE_SIZE } from './constants/newsStand'
import { PUBLISHERS } from './data/newsStand'
import { usePublisherSubscriptions } from './hooks/usePublisherSubscriptions'
import type { NewsstandViewMode, Publisher, PublisherScope } from './types/newsStand'

type GridFocusTarget =
  | { type: 'grid' }
  | { type: 'publisher-action'; publisherId: Publisher['id'] }

function App() {
  const gridRegionRef = useRef<HTMLDivElement | null>(null)
  const pendingGridFocusRef = useRef<GridFocusTarget | null>(null)
  const [scope, setScope] = useState<PublisherScope>('all')
  const [viewMode, setViewMode] = useState<NewsstandViewMode>('grid')
  const [pageIndex, setPageIndex] = useState(0)
  const {
    isPublisherSubscribed,
    subscribedCount,
    subscribedPublisherIds,
    togglePublisherSubscription,
  } = usePublisherSubscriptions()
  const visiblePublishers =
    scope === 'all'
      ? PUBLISHERS
      : PUBLISHERS.filter((publisher) => subscribedPublisherIds.has(publisher.id))
  const pageCount = Math.ceil(visiblePublishers.length / PUBLISHER_GRID_PAGE_SIZE)
  const lastPageIndex = Math.max(pageCount - 1, 0)
  const currentPageIndex = Math.min(pageIndex, lastPageIndex)
  const pageStartIndex = currentPageIndex * PUBLISHER_GRID_PAGE_SIZE
  const pagePublishers = visiblePublishers.slice(
    pageStartIndex,
    pageStartIndex + PUBLISHER_GRID_PAGE_SIZE,
  )
  const gridLabel = scope === 'all' ? '전체 언론사 그리드' : '구독한 언론사 그리드'
  const placeholderMessage =
    scope === 'all'
      ? '전체 언론사 목록 보기 영역입니다.'
      : subscribedCount > 0
        ? '구독한 언론사 목록 보기 영역입니다.'
        : '아직 구독한 언론사가 없습니다.'

  useLayoutEffect(() => {
    const focusTarget = pendingGridFocusRef.current

    if (!focusTarget) {
      return
    }

    pendingGridFocusRef.current = null

    if (focusTarget.type === 'publisher-action') {
      const actionButton = Array.from(
        gridRegionRef.current?.querySelectorAll<HTMLButtonElement>(
          '[data-publisher-action-id]',
        ) ?? [],
      ).find(
        (button) => button.dataset.publisherActionId === focusTarget.publisherId,
      )

      if (actionButton) {
        actionButton.focus()
        return
      }
    }

    gridRegionRef.current?.focus()
  })

  const handleScopeChange = (nextScope: PublisherScope) => {
    pendingGridFocusRef.current = { type: 'grid' }
    setScope(nextScope)
    setPageIndex(0)
  }

  const handleTogglePublisherSubscription = (publisherId: Publisher['id']) => {
    if (scope === 'subscribed' && subscribedPublisherIds.has(publisherId)) {
      const currentPublisherIndex = visiblePublishers.findIndex(
        (publisher) => publisher.id === publisherId,
      )
      const nextFocusPublisher =
        currentPublisherIndex >= 0
          ? visiblePublishers[currentPublisherIndex + 1] ??
            visiblePublishers[currentPublisherIndex - 1] ??
            null
          : null

      pendingGridFocusRef.current = nextFocusPublisher
        ? { type: 'publisher-action', publisherId: nextFocusPublisher.id }
        : { type: 'grid' }
    }

    togglePublisherSubscription(publisherId)
  }

  return (
    <NewsstandShell
      header={<Header />}
      toolbar={
        <div className="flex h-full items-center justify-between">
          <ScopeTabs
            activeScope={scope}
            onScopeChange={handleScopeChange}
            subscribedCount={subscribedCount}
          />
          <ViewToggle activeMode={viewMode} onModeChange={setViewMode} />
        </div>
      }
    >
      {viewMode === 'grid' ? (
        <div
          aria-label={`${gridLabel} 페이지 영역`}
          className="relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          ref={gridRegionRef}
          role="region"
          tabIndex={-1}
        >
          <PublisherGrid
            ariaLabel={gridLabel}
            isPublisherSubscribed={isPublisherSubscribed}
            onToggleSubscription={handleTogglePublisherSubscription}
            publishers={pagePublishers}
          />
          <Pagination
            onNext={() => {
              pendingGridFocusRef.current = { type: 'grid' }
              setPageIndex(Math.min(currentPageIndex + 1, lastPageIndex))
            }}
            onPrevious={() => {
              pendingGridFocusRef.current = { type: 'grid' }
              setPageIndex(Math.max(currentPageIndex - 1, 0))
            }}
            pageCount={pageCount}
            pageIndex={currentPageIndex}
          />
        </div>
      ) : (
        <div className="flex min-h-[var(--layout-content-height)] items-center justify-center border border-dashed border-line bg-card px-6 text-center">
          <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
            930px 뉴스스탠드 콘텐츠 영역
            <br />
            {placeholderMessage}
          </p>
        </div>
      )}
    </NewsstandShell>
  )
}

export default App
