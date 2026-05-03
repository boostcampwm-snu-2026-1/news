import { TabsList, TabsTrigger } from '../ui/Tabs'
import { ActiveCategoryProgress } from './ActiveCategoryProgress'
import type { CategoryTabState, CategoryTabValue } from './newsListViewConfig'

type NewsListViewTabsProps = {
  currentCategory: CategoryTabValue
  tabStates: CategoryTabState[]
  paused: boolean
  onAdvanceToNextMedia: () => void
}

export function NewsListViewTabs({
  currentCategory,
  tabStates,
  paused,
  onAdvanceToNextMedia,
}: NewsListViewTabsProps) {
  return (
    <TabsList className="flex h-10 w-full rounded-none border-0 bg-[#F5F7F9] !p-0">
      {tabStates.map((tab) => {
        const isActive = currentCategory === tab.value

        return (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="group relative h-10 flex-1 overflow-hidden rounded-none border-r border-[#D2DAE0] bg-transparent px-3 text-sm font-medium tracking-[-0.01em] last:border-r-0 data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-white data-[state=inactive]:text-[#5F6E76]"
          >
            {isActive ? (
              <ActiveCategoryProgress
                key={`${tab.value}-${tab.activeMediaId ?? 'empty'}`}
                paused={paused}
                onComplete={onAdvanceToNextMedia}
              />
            ) : null}
            <span className="relative z-10 flex w-full items-center justify-between gap-2">
              <span className="truncate">{tab.label}</span>
              <span className="hidden font-mono text-xs font-medium tabular-nums text-current/70 group-data-[state=active]:inline-flex">
                <span className="text-current">{tab.currentIndex}</span>
                <span> / {tab.totalCount}</span>
              </span>
            </span>
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
