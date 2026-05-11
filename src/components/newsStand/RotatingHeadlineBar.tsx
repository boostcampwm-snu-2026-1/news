import { useState } from 'react'

import {
  LEFT_HEADLINE_CATEGORIES,
  RIGHT_HEADLINE_CATEGORIES,
} from '../../const/newsStand'
import { mediaDummyList } from '../../fixtures/mediaDummyList'
import { useTimer } from '../../hooks/useTimer'
import { HeadlineBar } from './HeadlineBar'

type RotatingHeadlineBarProps = {
  visibleMedia: typeof mediaDummyList
}

function getHeadlineContent(mediaTitle: string, newsTitle: string) {
  const prefix = `${mediaTitle} | `

  if (newsTitle.startsWith(prefix)) {
    return newsTitle.slice(prefix.length)
  }

  return newsTitle
}

function buildHeadlineItems(
  mediaList: typeof mediaDummyList,
  categories: readonly string[],
) {
  return mediaList
    .filter((media) => categories.includes(media.category))
    .flatMap((media) =>
      media.news.map((news) => ({
        mediaId: media.id,
        mediaTitle: media.title,
        newsTitle: getHeadlineContent(media.title, news.title),
      })),
    )
}

export function RotatingHeadlineBar({
  visibleMedia,
}: RotatingHeadlineBarProps) {
  const allHeadlineItems = visibleMedia.flatMap((media) =>
    media.news.map((news) => ({
      mediaId: media.id,
      mediaTitle: media.title,
      newsTitle: getHeadlineContent(media.title, news.title),
    })),
  )
  const leftHeadlineItems = buildHeadlineItems(
    visibleMedia,
    LEFT_HEADLINE_CATEGORIES,
  )
  const rightHeadlineItems = buildHeadlineItems(
    visibleMedia,
    RIGHT_HEADLINE_CATEGORIES,
  )
  const [leftHeadlineIndex, setLeftHeadlineIndex] = useState(0)
  const [rightHeadlineIndex, setRightHeadlineIndex] = useState(0)
  const fallbackHeadline = {
    mediaId: mediaDummyList[0]?.id ?? '',
    mediaTitle: mediaDummyList[0]?.title ?? '',
    newsTitle: mediaDummyList[0]?.news[0]?.title ?? '',
  }
  const leftHeadline =
    leftHeadlineItems[leftHeadlineIndex] ??
    allHeadlineItems[0] ??
    fallbackHeadline
  const rightHeadline =
    rightHeadlineItems[rightHeadlineIndex] ??
    allHeadlineItems.find((item) => item.mediaId !== leftHeadline.mediaId) ??
    fallbackHeadline

  useTimer(
    () => {
      setLeftHeadlineIndex((currentIndex) => {
        if (leftHeadlineItems.length <= 1) {
          return 0
        }

        return (currentIndex + 1) % leftHeadlineItems.length
      })

      setRightHeadlineIndex((currentIndex) => {
        if (rightHeadlineItems.length <= 1) {
          return 0
        }

        return (currentIndex + 1) % rightHeadlineItems.length
      })
    },
    {
      delay: 5200,
      enabled: allHeadlineItems.length > 1,
    },
  )

  if (!leftHeadline.mediaTitle || !leftHeadline.newsTitle) {
    return null
  }

  return (
    <HeadlineBar
      leftHeadline={leftHeadline}
      rightHeadline={rightHeadline}
    />
  )
}
