import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import type { PublisherScope } from '../types/newsStand'

const SCOPE_TABS = [
  { scope: 'all', label: '전체 언론사' },
  { scope: 'subscribed', label: '내가 구독한 언론사' },
] as const satisfies readonly { scope: PublisherScope; label: string }[]

interface ScopeTabsProps {
  activeScope: PublisherScope
  subscribedCount: number
  onScopeChange: (scope: PublisherScope) => void
}

export function ScopeTabs({
  activeScope,
  subscribedCount,
  onScopeChange,
}: ScopeTabsProps) {
  const tabRefs = useRef<Record<PublisherScope, HTMLButtonElement | null>>({
    all: null,
    subscribed: null,
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const nextScopeByKey: Partial<Record<string, PublisherScope>> = {
      ArrowLeft: activeScope === 'all' ? 'subscribed' : 'all',
      ArrowRight: activeScope === 'all' ? 'subscribed' : 'all',
      Home: 'all',
      End: 'subscribed',
    }
    const nextScope = nextScopeByKey[event.key]

    if (!nextScope) {
      return
    }

    event.preventDefault()
    onScopeChange(nextScope)
    requestAnimationFrame(() => tabRefs.current[nextScope]?.focus())
  }

  return (
    <div
      aria-label="언론사 표시 범위"
      className="flex h-full items-center gap-6"
      role="tablist"
    >
      {SCOPE_TABS.map((tab) => {
        const isActive = tab.scope === activeScope

        return (
          <button
            aria-controls="newsstand-content"
            aria-selected={isActive}
            className={`flex h-6 items-center gap-2 text-[length:var(--text-body-size)] leading-none tracking-[var(--text-body-tracking)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
              isActive
                ? 'font-bold text-ink'
                : 'font-medium text-mute hover:text-sub'
            }`}
            id={`scope-tab-${tab.scope}`}
            key={tab.scope}
            onClick={() => onScopeChange(tab.scope)}
            onKeyDown={handleKeyDown}
            ref={(node) => {
              tabRefs.current[tab.scope] = node
            }}
            role="tab"
            type="button"
          >
            <span>{tab.label}</span>
            {tab.scope === 'subscribed' ? (
              <span
                aria-label={`구독한 언론사 ${subscribedCount}개`}
                className="flex size-5 items-center justify-center rounded-badge bg-accent text-[length:var(--text-badge-size)] font-medium leading-[var(--text-badge-leading)] text-badge-ink"
              >
                {subscribedCount}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
