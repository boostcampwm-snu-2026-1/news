import { useState } from 'react'
import { NewsstandShell } from './components/NewsstandShell'
import { ScopeTabs } from './components/ScopeTabs'
import { INITIAL_SUBSCRIBED_PUBLISHER_IDS } from './data/newsStand'
import type { Publisher, PublisherScope } from './types/newsStand'

function App() {
  const [scope, setScope] = useState<PublisherScope>('all')
  const [subscribedPublisherIds] = useState<ReadonlySet<Publisher['id']>>(
    () => new Set<Publisher['id']>(INITIAL_SUBSCRIBED_PUBLISHER_IDS),
  )
  const subscribedCount = subscribedPublisherIds.size
  const placeholderMessage =
    scope === 'all'
      ? '전체 언론사 그리드가 이 영역에 들어갑니다.'
      : subscribedCount > 0
        ? '구독한 언론사 그리드가 이 영역에 들어갑니다.'
        : '아직 구독한 언론사가 없습니다.'

  return (
    <NewsstandShell
      toolbar={
        <ScopeTabs
          activeScope={scope}
          onScopeChange={setScope}
          subscribedCount={subscribedCount}
        />
      }
    >
      <div className="flex min-h-[var(--layout-content-height)] items-center justify-center border border-dashed border-line bg-card px-6 text-center">
        <p className="text-[length:var(--text-caption-size)] font-medium leading-[var(--text-caption-leading)] text-sub">
          930px 뉴스스탠드 콘텐츠 영역
          <br />
          {placeholderMessage}
        </p>
      </div>
    </NewsstandShell>
  )
}

export default App
