import type { ReactNode } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/Tabs'
import { Badge } from '../ui/Badge'
import { NewsStandContent } from './Layout'

type CurrentTab = 'ALL' | 'SUBSCRIBING'

type TabPanelProps = {
  currentTab: CurrentTab
  onTabChange: (value: CurrentTab) => void
  subscribedCount: number
  actions?: ReactNode
  children: {
    all: ReactNode
    subscribing: ReactNode
  }
}

export function TabPanel({
  currentTab,
  onTabChange,
  subscribedCount,
  actions,
  children,
}: TabPanelProps) {
  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => onTabChange(value as CurrentTab)}
      className="pt-8"
    >
      <NewsStandContent className="flex h-6 items-center justify-between">
        <TabsList className="inline-flex items-center gap-6 rounded-none border-0 bg-transparent p-0">
          <TabsTrigger
            value="ALL"
            className="h-6 rounded-none bg-transparent px-0 text-base tracking-[-0.01em] data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#14212B] data-[state=inactive]:font-medium data-[state=inactive]:text-[#879298]"
          >
            전체 언론사
          </TabsTrigger>
          <TabsTrigger
            value="SUBSCRIBING"
            className="h-6 rounded-none bg-transparent px-0 text-base tracking-[-0.01em] data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#14212B] data-[state=inactive]:font-medium data-[state=inactive]:text-[#879298]"
          >
            <span className="inline-flex items-center gap-2">
              <span>내가 구독한 언론사</span>
              <Badge className="h-5 bg-[#7890E7] text-[rgba(255,255,255,0.7)]">
                {subscribedCount}
              </Badge>
            </span>
          </TabsTrigger>
        </TabsList>

        {actions}
      </NewsStandContent>

      <TabsContent value="ALL">{children.all}</TabsContent>
      <TabsContent value="SUBSCRIBING">{children.subscribing}</TabsContent>
    </Tabs>
  )
}
