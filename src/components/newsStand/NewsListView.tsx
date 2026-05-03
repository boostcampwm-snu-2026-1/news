import type { Media } from '../../type/types'
import { useNewsListView } from '../../hooks/useNewsListView'
import { Tabs, TabsContent } from '../ui/Tabs'
import { ChevronRailButton } from './ChevronRailButton'
import { NewsStandContent } from './Layout'
import { NewsListViewDetail } from './NewsListViewDetail'
import { NewsListViewTabs } from './NewsListViewTabs'

type NewsListViewProps = {
  items: Media[]
  isSubscribed: (mediaId: string) => boolean
  onToggleSubscription: (mediaId: string) => void
}

export function NewsListView({
  items,
  isSubscribed,
  onToggleSubscription,
}: NewsListViewProps) {
  const {
    currentCategory,
    activeMedia,
    hasPreviousMedia,
    hasNextMedia,
    isTickerPaused,
    setCurrentCategory,
    setIsTickerPaused,
    moveToPreviousMedia,
    moveToNextMedia,
    advanceToNextMedia,
    tabStates,
  } = useNewsListView(items)

  return (
    <Tabs
      value={currentCategory}
      onValueChange={(value) => setCurrentCategory(value as typeof currentCategory)}
      className="mt-4"
    >
      <NewsStandContent>
        <div className="relative">
          <ChevronRailButton
            direction="left"
            onClick={moveToPreviousMedia}
            disabled={!hasPreviousMedia}
            ariaLabel="Previous media"
          />
          <div
            className="overflow-hidden border border-[#D2DAE0] bg-white"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
            onFocusCapture={() => setIsTickerPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsTickerPaused(false)
              }
            }}
          >
            <NewsListViewTabs
              currentCategory={currentCategory}
              tabStates={tabStates}
              paused={isTickerPaused}
              onAdvanceToNextMedia={advanceToNextMedia}
            />

            <TabsContent
              value={currentCategory}
              className="min-h-[388px] border-t border-[#D2DAE0] bg-white px-8 py-6"
            >
              <NewsListViewDetail
                media={activeMedia}
                isSubscribed={isSubscribed}
                onToggleSubscription={onToggleSubscription}
              />
            </TabsContent>
          </div>
          <ChevronRailButton
            direction="right"
            onClick={moveToNextMedia}
            disabled={!hasNextMedia}
            ariaLabel="Next media"
          />
        </div>
      </NewsStandContent>
    </Tabs>
  )
}
