import { useState } from 'react'

type ThumbnailPreviewProps = {
  src: string | null
  title: string
}

export function ThumbnailPreview({ src, title }: ThumbnailPreviewProps) {
  const [imageError, setImageError] = useState(false)

  if (!src || imageError) {
    return (
      <div className="flex h-[188px] items-center justify-center border border-[#D2DAE0] bg-[linear-gradient(135deg,#EFF1F6,#DDE3EC)] px-6 text-center text-sm font-medium tracking-[-0.01em] text-[#5F6E76]">
        {title}
      </div>
    )
  }

  return (
    <div className="h-[188px] overflow-hidden border border-[#D2DAE0] bg-[#F5F7F9]">
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
