import type { Tab, Viewer } from '../../types'

interface TabBarProps {
  activeTab: Tab
  subCount: number
  viewer: Viewer
  onTabChange: (tab: Tab) => void
  onViewerChange: (viewer: Viewer) => void
}

export function TabBar(_props: TabBarProps) {
  return null
}
