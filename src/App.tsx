import { useState } from 'react'
import { NewsstandShell } from './components/NewsstandShell'
import { Pagination } from './components/Pagination'
import { PublisherGrid } from './components/PublisherGrid'
import { ScopeTabs } from './components/ScopeTabs'
import { ViewToggle } from './components/ViewToggle'
import { PUBLISHER_GRID_PAGE_SIZE } from './constants/newsStand'
import { PUBLISHERS } from './data/newsStand'
import { usePublisherSubscriptions } from './hooks/usePublisherSubscriptions'
import type { NewsstandViewMode, PublisherScope } from './types/newsStand'

function App() {
  const [scope, setScope] = useState<PublisherScope>('all')
  const [viewMode, setViewMode] = useState<NewsstandViewMode>('grid')
  const [pageIndex, setPageIndex] = useState(0)
  const { subscribedCount, subscribedPublisherIds } = usePublisherSubscriptions()
  const visiblePublishers =
    scope === 'all'
      ? PUBLISHERS
      : PUBLISHERS.filter((publisher) => subscribedPublisherIds.has(publisher.id))
  const pageCount = Math.ceil(visiblePublishers.length / PUBLISHER_GRID_PAGE_SIZE)
  const currentPageIndex = pageCount > 0 ? Math.min(pageIndex, pageCount - 1) : 0
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

  return (
    <NewsstandShell
      toolbar={
        <div className="flex h-full items-center justify-between">
          <ScopeTabs
            activeScope={scope}
            onScopeChange={(nextScope) => {
              setScope(nextScope)
              setPageIndex(0)
            }}
            subscribedCount={subscribedCount}
          />
          <ViewToggle activeMode={viewMode} onModeChange={setViewMode} />
        </div>
      }
    >
      {viewMode === 'grid' ? (
        <div className="relative">
          <PublisherGrid ariaLabel={gridLabel} publishers={pagePublishers} />
          <Pagination
            onNext={() => {
              setPageIndex((current) =>
                Math.min(current + 1, Math.max(pageCount - 1, 0)),
              )
            }}
            onPrevious={() => {
              setPageIndex((current) => Math.max(current - 1, 0))
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
