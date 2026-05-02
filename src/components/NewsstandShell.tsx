import type { ReactNode } from 'react'

interface NewsstandShellProps {
  header?: ReactNode
  ticker?: ReactNode
  toolbar?: ReactNode
  children: ReactNode
}

export function NewsstandShell({
  header,
  ticker,
  toolbar,
  children,
}: NewsstandShellProps) {
  return (
    <main className="min-h-svh overflow-x-hidden bg-page text-ink">
      <div className="mx-auto min-h-[var(--layout-canvas-height)] w-full max-w-[var(--layout-canvas-width)] px-4 pt-[var(--layout-header-top)] pb-12 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[var(--layout-content-width)]">
          <div className="h-[var(--layout-header-height)]">{header}</div>
          <div className="mt-10 h-[var(--layout-ticker-height)]">{ticker}</div>
          <div className="mt-8 h-[var(--layout-tabbar-height)]">{toolbar}</div>
          <section
            aria-label="뉴스스탠드 콘텐츠"
            className="mt-6 min-h-[var(--layout-content-height)]"
          >
            {children}
          </section>
        </div>
      </div>
    </main>
  )
}
