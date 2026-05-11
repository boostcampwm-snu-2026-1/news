import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArticleListView } from './components/ArticleListView'
import { Header } from './components/Header'
import { NewsstandShell } from './components/NewsstandShell'
import { NewsTicker } from './components/NewsTicker'
import { Pagination } from './components/Pagination'
import { PublisherGrid } from './components/PublisherGrid'
import { ScopeTabs } from './components/ScopeTabs'
import { ViewToggle } from './components/ViewToggle'
import { PUBLISHER_GRID_PAGE_SIZE } from './constants/newsStand'
import { updatePublisherSubscription } from './api/newsStand'
import { useNewsstandData } from './hooks/useNewsstandData'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { usePublisherSubscriptions } from './hooks/usePublisherSubscriptions'
import type {
  CategoryMeta,
  NewsstandData,
  NewsstandViewMode,
  Publisher,
  PublisherCategory,
  PublisherScope,
  SubscriptionPayload,
  TickerItem,
} from './types/newsStand'

type GridFocusTarget =
  | { type: 'grid' }
  | { type: 'publisher-action'; publisherId: Publisher['id'] }

const OPENED_PROGRESS_DURATION_MS = 6000
const CONTENT_TRANSITION_CLASS =
  'motion-safe:animate-[content-enter_220ms_var(--ease-standard)] motion-reduce:animate-none'
const EMPTY_TICKER_ITEMS: readonly TickerItem[] = []

function App() {
  const newsstandDataState = useNewsstandData()

  if (newsstandDataState.status === 'loading') {
    return (
      <NewsstandShell
        header={<Header />}
        ticker={<NewsTicker items={EMPTY_TICKER_ITEMS} />}
      >
        <ContentMessage>뉴스스탠드 데이터를 불러오는 중입니다.</ContentMessage>
      </NewsstandShell>
    )
  }

  if (newsstandDataState.status === 'error') {
    return (
      <NewsstandShell
        header={<Header />}
        ticker={<NewsTicker items={EMPTY_TICKER_ITEMS} />}
      >
        <ContentMessage>
          뉴스스탠드 데이터를 불러오지 못했습니다.
          <br />
          {newsstandDataState.message}
        </ContentMessage>
      </NewsstandShell>
    )
  }

  return (
    <NewsstandExperience
      newsstandData={newsstandDataState.data}
      subscriptions={newsstandDataState.subscriptions}
    />
  )
}

interface NewsstandExperienceProps {
  newsstandData: NewsstandData
  subscriptions: SubscriptionPayload
}

function NewsstandExperience({
  newsstandData,
  subscriptions,
}: NewsstandExperienceProps) {
  const gridRegionRef = useRef<HTMLDivElement | null>(null)
  const pendingGridFocusRef = useRef<GridFocusTarget | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [scope, setScope] = useState<PublisherScope>('all')
  const [viewMode, setViewMode] = useState<NewsstandViewMode>('grid')
  const [pageIndex, setPageIndex] = useState(0)
  const [selectedPublisherId, setSelectedPublisherId] = useState<
    Publisher['id'] | null
  >(null)
  const categories = newsstandData.categories
  const publishers = newsstandData.publishers
  const tickerItems = newsstandData.tickerItems
  const {
    isPublisherSubscribed,
    subscriptionError,
    subscribedCount,
    subscribedPublisherIds,
    togglePublisherSubscription,
  } = usePublisherSubscriptions({
    initialPublisherIds: subscriptions.publisherIds,
    onUpdatePublisherSubscription: async (publisherId, subscribed) => {
      const response = await updatePublisherSubscription(publisherId, subscribed)

      return response.publisherIds
    },
  })
  const visiblePublishers =
    scope === 'all'
      ? publishers
      : publishers.filter((publisher) => subscribedPublisherIds.has(publisher.id))
  const pageCount = Math.ceil(visiblePublishers.length / PUBLISHER_GRID_PAGE_SIZE)
  const lastPageIndex = Math.max(pageCount - 1, 0)
  const currentPageIndex = Math.min(pageIndex, lastPageIndex)
  const pageStartIndex = currentPageIndex * PUBLISHER_GRID_PAGE_SIZE
  const pagePublishers = visiblePublishers.slice(
    pageStartIndex,
    pageStartIndex + PUBLISHER_GRID_PAGE_SIZE,
  )
  const selectedPublisher =
    publishers.find((publisher) => publisher.id === selectedPublisherId) ?? null
  const openedPublisherIndex = selectedPublisher
    ? getOpenedPublisherIndex(selectedPublisher.id, publishers, categories)
    : -1
  const openedPublisherStatus =
    openedPublisherIndex >= 0
      ? `${openedPublisherIndex + 1}/${publishers.length}`
      : `0/${publishers.length}`
  const isOpenedNavigationDisabled = publishers.length <= 1
  const selectedCategoryPublishers = selectedPublisher
    ? publishers.filter(
        (publisher) => publisher.category === selectedPublisher.category,
      )
    : []
  const categoryCounts = new Map(
    categories.map((category) => [
      category.key,
      publishers.filter((publisher) => publisher.category === category.key).length,
    ]),
  )
  const selectedCategoryIndex = selectedPublisher
    ? selectedCategoryPublishers.findIndex(
        (publisher) => publisher.id === selectedPublisher.id,
      ) + 1
    : 1
  const gridLabel = scope === 'all' ? '전체 언론사 그리드' : '구독한 언론사 그리드'

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

  useEffect(() => {
    if (!selectedPublisher || prefersReducedMotion) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedPublisherId((currentPublisherId) =>
        getNextOpenedPublisherId(currentPublisherId, publishers, categories),
      )
    }, OPENED_PROGRESS_DURATION_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [categories, prefersReducedMotion, publishers, selectedPublisher])

  const handleScopeChange = (nextScope: PublisherScope) => {
    pendingGridFocusRef.current = { type: 'grid' }
    setScope(nextScope)
    setPageIndex(0)
    setSelectedPublisherId(null)
  }

  const handleViewModeChange = (nextViewMode: NewsstandViewMode) => {
    setViewMode(nextViewMode)

    if (nextViewMode === 'grid') {
      setSelectedPublisherId(null)
      return
    }

    const nextPublisher = publishers[0]

    if (nextPublisher) {
      setSelectedPublisherId(nextPublisher.id)
    }
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

  const handleOpenPublisher = (publisherId: Publisher['id']) => {
    setViewMode('list')
    setSelectedPublisherId(publisherId)
  }

  const handleCategorySelect = (category: PublisherCategory) => {
    const nextPublisher = publishers.find(
      (publisher) => publisher.category === category,
    )

    if (nextPublisher) {
      setSelectedPublisherId(nextPublisher.id)
    }
  }

  const handlePreviousOpenedPublisher = () => {
    setSelectedPublisherId((currentPublisherId) =>
      getPreviousOpenedPublisherId(currentPublisherId, publishers, categories),
    )
  }

  const handleNextOpenedPublisher = () => {
    setSelectedPublisherId((currentPublisherId) =>
      getNextOpenedPublisherId(currentPublisherId, publishers, categories),
    )
  }

  const handleClosePublisher = () => {
    pendingGridFocusRef.current = { type: 'grid' }
    setViewMode('grid')
    setSelectedPublisherId(null)
  }

  return (
    <NewsstandShell
      header={<Header />}
      ticker={<NewsTicker items={tickerItems} />}
      toolbar={
        <div className="flex h-full items-center justify-between">
          <ScopeTabs
            activeScope={scope}
            onScopeChange={handleScopeChange}
            subscribedCount={subscribedCount}
          />
          <ViewToggle activeMode={viewMode} onModeChange={handleViewModeChange} />
        </div>
      }
    >
      {selectedPublisher ? (
        <div
          className={`relative ${CONTENT_TRANSITION_CLASS}`}
          key={`opened-${selectedPublisher.id}`}
        >
          <ArticleListView
            activeCategory={selectedPublisher.category}
            activeCategoryIndex={selectedCategoryIndex}
            categories={categories}
            categoryCounts={categoryCounts}
            isSubscribed={isPublisherSubscribed(selectedPublisher.id)}
            onCategorySelect={handleCategorySelect}
            onClose={handleClosePublisher}
            onToggleSubscription={togglePublisherSubscription}
            progressEnabled={!prefersReducedMotion}
            publisher={selectedPublisher}
          />
          <Pagination
            nextDisabled={isOpenedNavigationDisabled}
            nextLabel={`다음 언론사 (${openedPublisherStatus})`}
            onNext={handleNextOpenedPublisher}
            onPrevious={handlePreviousOpenedPublisher}
            pageCount={publishers.length}
            pageIndex={Math.max(openedPublisherIndex, 0)}
            previousDisabled={isOpenedNavigationDisabled}
            previousLabel={`이전 언론사 (${openedPublisherStatus})`}
          />
        </div>
      ) : subscriptionError ? (
        <ContentMessage>
          구독 상태를 저장하지 못했습니다.
          <br />
          {subscriptionError}
        </ContentMessage>
      ) : viewMode === 'grid' ? (
        <div
          aria-label={`${gridLabel} 페이지 영역`}
          className={`relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${CONTENT_TRANSITION_CLASS}`}
          key="publisher-grid"
          ref={gridRegionRef}
          role="region"
          tabIndex={-1}
        >
          <PublisherGrid
            ariaLabel={gridLabel}
            isPublisherSubscribed={isPublisherSubscribed}
            onOpenPublisher={handleOpenPublisher}
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
        <ContentMessage key="publisher-list-empty">
          목록 보기로 이동할 언론사가 없습니다.
        </ContentMessage>
      )}
    </NewsstandShell>
  )
}

export default App

function getNextOpenedPublisherId(
  currentPublisherId: Publisher['id'] | null,
  publishers: readonly Publisher[],
  categories: readonly CategoryMeta[],
) {
  const currentPublisher = publishers.find(
    (publisher) => publisher.id === currentPublisherId,
  )

  if (!currentPublisher) {
    return currentPublisherId
  }

  const categoryIndex = categories.findIndex(
    (category) => category.key === currentPublisher.category,
  )
  const currentCategoryPublishers = publishers.filter(
    (publisher) => publisher.category === currentPublisher.category,
  )
  const currentPublisherIndex = currentCategoryPublishers.findIndex(
    (publisher) => publisher.id === currentPublisher.id,
  )
  const nextPublisher = currentCategoryPublishers[currentPublisherIndex + 1]

  if (nextPublisher) {
    return nextPublisher.id
  }

  if (categories.length === 0) {
    return currentPublisher.id
  }

  const nextCategory =
    categories[(categoryIndex + 1) % categories.length] ?? categories[0]
  const nextCategoryPublisher = publishers.find(
    (publisher) => publisher.category === nextCategory.key,
  )

  return nextCategoryPublisher?.id ?? currentPublisher.id
}

function getPreviousOpenedPublisherId(
  currentPublisherId: Publisher['id'] | null,
  publishers: readonly Publisher[],
  categories: readonly CategoryMeta[],
) {
  const currentPublisher = publishers.find(
    (publisher) => publisher.id === currentPublisherId,
  )

  if (!currentPublisher) {
    return currentPublisherId
  }

  const currentCategoryPublishers = publishers.filter(
    (publisher) => publisher.category === currentPublisher.category,
  )
  const currentPublisherIndex = currentCategoryPublishers.findIndex(
    (publisher) => publisher.id === currentPublisher.id,
  )
  const previousPublisher = currentCategoryPublishers[currentPublisherIndex - 1]

  if (previousPublisher) {
    return previousPublisher.id
  }

  if (categories.length === 0) {
    return currentPublisher.id
  }

  const categoryIndex = categories.findIndex(
    (category) => category.key === currentPublisher.category,
  )
  const previousCategory =
    categories[
      categoryIndex > 0 ? categoryIndex - 1 : categories.length - 1
    ] ?? categories[categories.length - 1]
  const previousCategoryPublishers = publishers.filter(
    (publisher) => publisher.category === previousCategory.key,
  )

  return (
    previousCategoryPublishers[previousCategoryPublishers.length - 1]?.id ??
    currentPublisher.id
  )
}

function getOpenedPublisherIndex(
  publisherId: Publisher['id'],
  publishers: readonly Publisher[],
  categories: readonly CategoryMeta[],
) {
  const openedPublisherIds = categories.flatMap((category) =>
    publishers
      .filter((publisher) => publisher.category === category.key)
      .map((publisher) => publisher.id),
  )

  return openedPublisherIds.findIndex((openedPublisherId) => openedPublisherId === publisherId)
}

function ContentMessage({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex min-h-[var(--layout-content-height)] items-center justify-center border border-dashed border-line bg-card px-6 text-center ${CONTENT_TRANSITION_CLASS}`}
    >
      <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
        {children}
      </p>
    </div>
  )
}
