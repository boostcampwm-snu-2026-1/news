import { useState } from 'react'

import { Header } from './components/Header'
import { MediaGrid } from './components/newsStand/MediaGrid'
import { NewsListView } from './components/newsStand/NewsListView'
import { RotatingHeadlineBar } from './components/newsStand/RotatingHeadlineBar'
import { TabPanel } from './components/newsStand/TabPanel'
import { ViewModeButtonGroup } from './components/newsStand/ViewModeButtonGroup'
import {
  DEFAULT_TAB,
  DEFAULT_VIEW_MODE,
  type ViewMode,
} from './const/newsStand'
import {
  clampPagination,
  type CurrentTab,
  useNewsStandView,
} from './hooks/useNewsStandView'
import { useSubscription } from './hooks/useSubscription'

function App() {
  const { isSubscribed, toggleSubscription, user } = useSubscription()
  const [currentTab, setCurrentTab] = useState<CurrentTab>(DEFAULT_TAB)
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE)
  const [pagination, setPagination] = useState(0)
  const { visibleMedia, pageItems, totalPages, headlineScopeKey } =
    useNewsStandView({
      currentTab,
      pagination,
      subscribingMediaList: user.subscribingMediaList,
    })
  const currentView =
    viewMode === 'LIST' ? (
      <NewsListView
        items={visibleMedia}
        isSubscribed={isSubscribed}
        onToggleSubscription={toggleSubscription}
      />
    ) : (
      <MediaGrid
        items={pageItems}
        currentPage={pagination}
        totalPages={totalPages}
        isSubscribed={isSubscribed}
        onToggleSubscription={toggleSubscription}
        onPreviousPage={() =>
          setPagination((page) => clampPagination(page - 1, totalPages))
        }
        onNextPage={() =>
          setPagination((page) => clampPagination(page + 1, totalPages))
        }
      />
    )

  return (
    <main
      className="min-h-screen bg-[#FEFEFE] pb-16 text-[#14212B]"
      aria-label="News stand application"
    >
      <Header />
      <RotatingHeadlineBar
        key={headlineScopeKey}
        visibleMedia={visibleMedia}
      />
      <TabPanel
        currentTab={currentTab}
        onTabChange={(value) => {
          setCurrentTab(value)
          setPagination(0)
        }}
        subscribedCount={user.subscribingMediaList.length}
        actions={
          <ViewModeButtonGroup
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        }
      >
        {{
          all: currentView,
          subscribing: currentView,
        }}
      </TabPanel>
    </main>
  )
}

export default App
