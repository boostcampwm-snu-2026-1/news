interface HeaderProps {
  date?: Date
}

interface FormattedHeaderDate {
  dateTime: string
  label: string
}

const headerDateFormatter = new Intl.DateTimeFormat('ko-KR', {
  day: '2-digit',
  month: '2-digit',
  timeZone: 'Asia/Seoul',
  weekday: 'long',
  year: 'numeric',
})

export function Header({ date = new Date() }: HeaderProps) {
  const formattedDate = formatHeaderDate(date)

  return (
    <header className="flex h-full items-center justify-between">
      <div className="flex items-center gap-2">
        <NewspaperIcon />
        <h1 className="text-[length:var(--text-display-size)] font-bold leading-[var(--text-display-leading)] tracking-[var(--text-display-tracking)] text-ink">
          뉴스스탠드
        </h1>
      </div>
      <time
        className="text-[length:var(--text-body-size)] font-medium leading-[var(--text-body-leading)] tracking-[var(--text-body-tracking)] text-sub"
        dateTime={formattedDate.dateTime}
      >
        {formattedDate.label}
      </time>
    </header>
  )
}

function formatHeaderDate(date: Date): FormattedHeaderDate {
  const parts = headerDateFormatter.formatToParts(date)
  const year = getDatePart(parts, 'year')
  const month = getDatePart(parts, 'month')
  const day = getDatePart(parts, 'day')
  const weekday = getDatePart(parts, 'weekday')

  return {
    dateTime: `${year}-${month}-${day}`,
    label: `${year}. ${month}. ${day}. ${weekday}`,
  }
}

function getDatePart(parts: Intl.DateTimeFormatPart[], type: string) {
  return parts.find((part) => part.type === type)?.value ?? ''
}

function NewspaperIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6 shrink-0 text-ink"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 6.5h12.5A1.5 1.5 0 0 1 19 8v9.5A2.5 2.5 0 0 1 16.5 20h-11A2.5 2.5 0 0 1 3 17.5V8.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M19 9h1.5a.5.5 0 0 1 .5.5v7.75A2.75 2.75 0 0 1 18.25 20H16.5M7 10h8M7 13h8M7 16h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
