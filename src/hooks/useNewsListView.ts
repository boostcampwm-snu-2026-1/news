import { useState } from 'react'

import type { Media, MediaCategory } from '../type/types'
import {
  CATEGORY_TABS,
  DEFAULT_CATEGORY_TAB,
  INITIAL_CATEGORY_MEDIA_INDEX_MAP,
  type CategoryTabState,
  type CategoryTabValue,
} from '../components/newsStand/newsListViewConfig'

type UseNewsListViewResult = {
  currentCategory: CategoryTabValue
  activeMedia: Media | null
  hasPreviousMedia: boolean
  hasNextMedia: boolean
  isTickerPaused: boolean
  setCurrentCategory: (value: CategoryTabValue) => void
  setIsTickerPaused: (value: boolean) => void
  moveToPreviousMedia: () => void
  moveToNextMedia: () => void
  advanceToNextMedia: () => void
  tabStates: CategoryTabState[]
}

export function useNewsListView(items: Media[]): UseNewsListViewResult {
  const [currentCategory, setCurrentCategory] =
    useState<CategoryTabValue>(DEFAULT_CATEGORY_TAB)
  const [categoryMediaIndexMap, setCategoryMediaIndexMap] = useState(
    INITIAL_CATEGORY_MEDIA_INDEX_MAP,
  )
  const [isTickerPaused, setIsTickerPaused] = useState(false)

  function getCategoryItems(categories: MediaCategory[]) {
    return items.filter((media) => categories.includes(media.category))
  }

  function getActiveMedia(tabValue: CategoryTabValue, categories: MediaCategory[]) {
    const categoryItems = getCategoryItems(categories)

    if (categoryItems.length === 0) {
      return null
    }

    const currentIndex = categoryMediaIndexMap[tabValue] % categoryItems.length

    return categoryItems[currentIndex]
  }

  function getNextCategoryValue(currentValue: CategoryTabValue) {
    const currentTabIndex = CATEGORY_TABS.findIndex(
      (tab) => tab.value === currentValue,
    )

    for (let offset = 1; offset <= CATEGORY_TABS.length; offset += 1) {
      const nextTab =
        CATEGORY_TABS[(currentTabIndex + offset) % CATEGORY_TABS.length]

      if (getCategoryItems(nextTab.categories).length > 0) {
        return nextTab.value
      }
    }

    return currentValue
  }

  function getPreviousCategoryValue(currentValue: CategoryTabValue) {
    const currentTabIndex = CATEGORY_TABS.findIndex(
      (tab) => tab.value === currentValue,
    )

    for (let offset = 1; offset <= CATEGORY_TABS.length; offset += 1) {
      const previousTab =
        CATEGORY_TABS[
          (currentTabIndex - offset + CATEGORY_TABS.length) %
            CATEGORY_TABS.length
        ]

      if (getCategoryItems(previousTab.categories).length > 0) {
        return previousTab.value
      }
    }

    return currentValue
  }

  const activeTabConfig = CATEGORY_TABS.find((tab) => tab.value === currentCategory)
  const activeMedia = activeTabConfig
    ? getActiveMedia(activeTabConfig.value, activeTabConfig.categories)
    : null

  function advanceToNextMedia() {
    if (!activeTabConfig) {
      return
    }

    const activeCategoryItems = getCategoryItems(activeTabConfig.categories)

    if (activeCategoryItems.length === 0) {
      return
    }

    const currentIndex = categoryMediaIndexMap[activeTabConfig.value]
    const isLastMedia = currentIndex >= activeCategoryItems.length - 1

    if (isLastMedia) {
      setCurrentCategory(getNextCategoryValue(activeTabConfig.value))
      return
    }

    setCategoryMediaIndexMap((currentMap) => ({
      ...currentMap,
      [activeTabConfig.value]: currentMap[activeTabConfig.value] + 1,
    }))
  }

  function moveToPreviousMedia() {
    if (!activeTabConfig) {
      return
    }

    const activeCategoryItems = getCategoryItems(activeTabConfig.categories)

    if (activeCategoryItems.length === 0) {
      return
    }

    const currentIndex = categoryMediaIndexMap[activeTabConfig.value]

    if (currentIndex > 0) {
      setCategoryMediaIndexMap((currentMap) => ({
        ...currentMap,
        [activeTabConfig.value]: currentMap[activeTabConfig.value] - 1,
      }))
      return
    }

    const previousCategoryValue = getPreviousCategoryValue(activeTabConfig.value)

    if (previousCategoryValue === activeTabConfig.value) {
      return
    }

    const previousCategoryConfig = CATEGORY_TABS.find(
      (tab) => tab.value === previousCategoryValue,
    )

    if (!previousCategoryConfig) {
      return
    }

    const previousCategoryItems = getCategoryItems(previousCategoryConfig.categories)

    setCategoryMediaIndexMap((currentMap) => ({
      ...currentMap,
      [previousCategoryValue]: Math.max(previousCategoryItems.length - 1, 0),
    }))
    setCurrentCategory(previousCategoryValue)
  }

  function moveToNextMedia() {
    advanceToNextMedia()
  }

  const hasPreviousMedia = (() => {
    if (!activeTabConfig) {
      return false
    }

    if (categoryMediaIndexMap[activeTabConfig.value] > 0) {
      return true
    }

    return getPreviousCategoryValue(activeTabConfig.value) !== activeTabConfig.value
  })()

  const hasNextMedia = (() => {
    if (!activeTabConfig) {
      return false
    }

    const activeCategoryItems = getCategoryItems(activeTabConfig.categories)
    const currentIndex = categoryMediaIndexMap[activeTabConfig.value]

    if (currentIndex < activeCategoryItems.length - 1) {
      return true
    }

    return getNextCategoryValue(activeTabConfig.value) !== activeTabConfig.value
  })()

  const tabStates: CategoryTabState[] = CATEGORY_TABS.map((tab) => {
    const categoryItems = getCategoryItems(tab.categories)
    const tabActiveMedia = getActiveMedia(tab.value, tab.categories)

    return {
      value: tab.value,
      label: tab.label,
      currentIndex: tabActiveMedia
        ? categoryItems.findIndex((media) => media.id === tabActiveMedia.id) + 1
        : 0,
      totalCount: categoryItems.length,
      activeMediaId: tabActiveMedia?.id ?? null,
      isActive: currentCategory === tab.value,
    }
  })

  return {
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
  }
}
