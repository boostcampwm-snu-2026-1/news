import { NewsStandContent } from './Layout'

type HeadlineBarProps = {
  leftHeadline: {
    mediaTitle: string
    newsTitle: string
  }
  rightHeadline: {
    mediaTitle: string
    newsTitle: string
  }
}

function HeadlineLane({
  mediaTitle,
  newsTitle,
}: {
  mediaTitle: string
  newsTitle: string
}) {
  return (
    <div className="flex h-12 items-center overflow-hidden border border-[#D2DAE0] bg-[#F5F7F9] px-5">
      <div
        key={`${mediaTitle}-${newsTitle}`}
        className="headline-slide-up flex min-w-0 w-full items-center"
      >
        <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium tracking-[-0.01em] text-[#14212B]">
          <span className="font-bold">{mediaTitle}</span>
          <span className="px-2 text-[#879298]">|</span>
          <span>{newsTitle}</span>
        </p>
      </div>
    </div>
  )
}

export function HeadlineBar({
  leftHeadline,
  rightHeadline,
}: HeadlineBarProps) {
  return (
    <NewsStandContent
      aria-label="Headline bar"
      className="mt-14 flex gap-2 px-0"
    >
      <div className="min-w-0 flex-1">
        <HeadlineLane
          mediaTitle={leftHeadline.mediaTitle}
          newsTitle={leftHeadline.newsTitle}
        />
      </div>
      <div className="min-w-0 flex-1">
        <HeadlineLane
          mediaTitle={rightHeadline.mediaTitle}
          newsTitle={rightHeadline.newsTitle}
        />
      </div>
    </NewsStandContent>
  )
}
