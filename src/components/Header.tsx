import { formatKoreanDate } from '../libs/date'
import { NewsStandContent } from './newsStand/Layout'

export function Header() {
  return (
    <header className="pt-10">
      <NewsStandContent className="flex min-h-[29px] items-center justify-between">
        <div
          className="inline-flex min-w-0 items-center gap-3"
          aria-label="News stand"
        >
          <svg
            className="h-6 w-6 shrink-0 text-[#14212B]"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M4.5 5.5H12.5C14.433 5.5 16 7.067 16 9V18.5H8C6.067 18.5 4.5 16.933 4.5 15V5.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M19.5 5.5H12.5C10.567 5.5 9 7.067 9 9V18.5H16C17.933 18.5 19.5 16.933 19.5 15V5.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M7 9H10.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M7 12H10.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 9H17" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 12H17" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <h1 className="m-0 text-2xl font-bold leading-none tracking-[-0.02em] text-[#14212B]">
            뉴스스탠드
          </h1>
        </div>
        <p className="m-0 text-base font-medium tracking-[-0.01em] text-[#5F6E76]">
          {formatKoreanDate(new Date())}
        </p>
      </NewsStandContent>
    </header>
  )
}
