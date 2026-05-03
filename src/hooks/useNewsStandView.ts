import { mediaDummyList } from '../fixtures/mediaDummyList'
import type { Media } from '../type/types'

const MEDIA_PER_PAGE = 24

export type CurrentTab = 'ALL' | 'SUBSCRIBING'

type UseNewsStandViewParams = {
  currentTab: CurrentTab
  pagination: number
  subscribingMediaList: string[]
}

type UseNewsStandViewResult = {
  visibleMedia: Media[]
  pageItems: Media[]
  totalPages: number
  headlineScopeKey: string
}

export function clampPagination(page: number, totalPages: number) {
  return Math.min(Math.max(page, 0), Math.max(totalPages - 1, 0))
}

export function useNewsStandView({
  currentTab,
  pagination,
  subscribingMediaList,
}: UseNewsStandViewParams): UseNewsStandViewResult {
  const visibleMedia =
    currentTab === 'SUBSCRIBING'
      ? mediaDummyList.filter((media) =>
          subscribingMediaList.includes(media.id),
        )
      : mediaDummyList
  const totalPages = Math.ceil(visibleMedia.length / MEDIA_PER_PAGE)
  const pageStart = pagination * MEDIA_PER_PAGE
  const pageItems = visibleMedia.slice(pageStart, pageStart + MEDIA_PER_PAGE)
  const headlineScopeKey = `${currentTab}:${pagination}:${subscribingMediaList.join(',')}`

  return {
    visibleMedia,
    pageItems,
    totalPages,
    headlineScopeKey,
  }
}
