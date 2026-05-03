import { formatKoreanDate } from '../../libs/date'
import type { Media } from '../../type/types'
import { SubscriptionButton } from './SubscriptionButton'
import { ThumbnailPreview } from './ThumbnailPreview'

type NewsListViewDetailProps = {
  media: Media | null
  isSubscribed: (mediaId: string) => boolean
  onToggleSubscription: (mediaId: string) => void
}

function getDisplayNewsTitle(mediaTitle: string, newsTitle: string) {
  const prefix = `${mediaTitle} | `

  if (newsTitle.startsWith(prefix)) {
    return newsTitle.slice(prefix.length)
  }

  return newsTitle
}

export function NewsListViewDetail({
  media,
  isSubscribed,
  onToggleSubscription,
}: NewsListViewDetailProps) {
  if (!media) {
    return (
      <div className="flex min-h-[388px] items-center justify-center text-sm text-[#879298]">
        표시할 언론사가 없습니다.
      </div>
    )
  }

  const featuredNews = media.news[0]
  const remainingNews = media.news.slice(1)
  const featuredNewsTitle = featuredNews
    ? getDisplayNewsTitle(media.title, featuredNews.title)
    : media.title

  return (
    <div className="flex h-full gap-6">
      <div className="flex w-[340px] shrink-0 flex-col gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <h3 className="w-[104px] shrink-0 truncate text-base font-bold tracking-[-0.01em] text-[#14212B]">
            {media.title}
          </h3>
          <p className="text-xs font-medium tabular-nums text-[#5F6E76]">
            {formatKoreanDate(new Date())}
          </p>
          <SubscriptionButton
            subscribed={isSubscribed(media.id)}
            onClick={() => onToggleSubscription(media.id)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <ThumbnailPreview
            src={featuredNews?.thumbnail ?? null}
            title={featuredNewsTitle}
          />
          <p className="text-base font-bold leading-[1.45] tracking-[-0.01em] text-[#14212B]">
            {featuredNewsTitle}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col pt-11">
        <div className="grid gap-4">
          {remainingNews.map((news) => (
            <div key={news.id} className="flex items-start gap-4">
              <div className="mt-1 h-[3px] w-[3px] shrink-0 bg-[#14212B]" />
              <p className="min-w-0 text-sm leading-[1.5] tracking-[-0.01em] text-[#14212B]">
                {getDisplayNewsTitle(media.title, news.title)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
