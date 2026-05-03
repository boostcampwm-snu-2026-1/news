import { useState } from 'react'

import { SubscriptionButton } from './SubscriptionButton'

type MediaGridItemProps = {
  id: string
  title: string
  image: string
  subscribed: boolean
  onToggleSubscription: (mediaId: string) => void
}

export function MediaGridItem({
  id,
  title,
  image,
  subscribed,
  onToggleSubscription,
}: MediaGridItemProps) {
  const [imageError, setImageError] = useState(false)
  const baseBackground = subscribed
    ? 'bg-gradient-to-br from-white via-[#FCFCFF] to-[#F3F6FF]'
    : 'bg-white'

  return (
    <article
      id={id}
      className={`group relative aspect-video overflow-hidden transition-colors hover:bg-[#F5F7F9] ${baseBackground}`}
    >
      <div className="absolute inset-0 grid place-items-center transition-opacity group-hover:opacity-0">
        <div className="flex w-full max-w-[118px] flex-col items-center gap-2.5 px-3">
          <div className="relative flex h-10 w-full items-center justify-center overflow-hidden border border-[#D2DAE0] bg-[#F5F7F9] px-2">
            {!imageError ? (
              <img
                src={image}
                alt={`${title} logo`}
                className="h-full w-full object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="px-2 text-center text-[11px] font-semibold leading-tight tracking-[-0.01em] text-[#14212B]">
                {title}
              </span>
            )}
          </div>
          <div className="min-h-[32px] w-full text-center">
            <p className="break-keep text-sm leading-[1.15] font-medium tracking-[-0.01em] text-[#14212B]">
              {title}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="pointer-events-none group-hover:pointer-events-auto">
          <SubscriptionButton
            subscribed={subscribed}
            onClick={() => onToggleSubscription(id)}
          />
        </div>
      </div>
    </article>
  )
}
