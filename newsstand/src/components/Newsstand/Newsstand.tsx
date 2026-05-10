import { useEffect, useReducer } from 'react'
import { PRESSES } from '../../data/presses'
import { PRESS_CONTENTS } from '../../data/articles'
import type { TabKey, ViewerKey } from '../TabBar/TabBar'
import { Header } from '../Header/Header'
import { Ticker } from '../Ticker/Ticker'
import { TabBar } from '../TabBar/TabBar'
import { PressGrid } from '../PressGrid/PressGrid'
import { PressOpen } from '../PressOpen/PressOpen'
import styles from './Newsstand.module.css'

const PAGE_SIZE = 24
const TICK_MS = 100
const PROGRESS_DURATION = 6000

interface State {
  tab: TabKey
  viewer: ViewerKey
  page: number
  opened: string | null
  tabKey: string
  progress: number        // 0..1
  currentInTab: number
  subscribed: Set<string>
}

type Action =
  | { type: 'SET_TAB'; tab: TabKey }
  | { type: 'SET_VIEWER'; viewer: ViewerKey }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'OPEN_PRESS'; id: string }
  | { type: 'CLOSE_PRESS' }
  | { type: 'SET_CATEGORY'; key: string }
  | { type: 'TICK' }
  | { type: 'SUBSCRIBE'; id: string }
  | { type: 'UNSUBSCRIBE'; id: string }

const FIRST_CATEGORY = 'politics'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.tab, page: 0, opened: null }
    case 'SET_VIEWER':
      return { ...state, viewer: action.viewer }
    case 'SET_PAGE':
      return { ...state, page: action.page }
    case 'OPEN_PRESS':
      return { ...state, opened: action.id, tabKey: FIRST_CATEGORY, progress: 0, currentInTab: 0 }
    case 'CLOSE_PRESS':
      return { ...state, opened: null }
    case 'SET_CATEGORY':
      return { ...state, tabKey: action.key, progress: 0, currentInTab: 0 }
    case 'TICK': {
      if (!state.opened) return state
      const next = state.progress + TICK_MS / PROGRESS_DURATION
      if (next < 1) return { ...state, progress: next }

      const content = PRESS_CONTENTS[state.opened]
      const cats = content?.categories ?? []
      const catIdx = cats.findIndex((c) => c.key === state.tabKey)
      const cat = cats[catIdx]
      const articleCount = cat?.articles.length ?? 0
      const nextInTab = state.currentInTab + 1

      if (nextInTab < articleCount) {
        return { ...state, progress: 0, currentInTab: nextInTab }
      }

      // 다음 카테고리로 이동 (cats가 비어있으면 현재 유지)
      if (cats.length === 0) return { ...state, progress: 0 }
      const nextCatIdx = (catIdx + 1) % cats.length
      return {
        ...state,
        progress: 0,
        currentInTab: 0,
        tabKey: cats[nextCatIdx]?.key ?? state.tabKey,
      }
    }
    case 'SUBSCRIBE': {
      const next = new Set(state.subscribed)
      next.add(action.id)
      return { ...state, subscribed: next }
    }
    case 'UNSUBSCRIBE': {
      const next = new Set(state.subscribed)
      next.delete(action.id)
      return { ...state, subscribed: next }
    }
    default:
      return state
  }
}

const INITIAL_STATE: State = {
  tab: 'all',
  viewer: 'grid',
  page: 0,
  opened: null,
  tabKey: FIRST_CATEGORY,
  progress: 0,
  currentInTab: 0,
  subscribed: new Set(),
}

const TICKER_LANES: [Parameters<typeof Ticker>[0]['lanes'][0], Parameters<typeof Ticker>[0]['lanes'][1]] = [
  [{ id: 't1', label: 'BREAKING', text: '국회 본회의 예산안 처리 논란 — 여야 막판 협상 난항' }],
  [{ id: 't2', label: 'MARKET', text: '코스피 2,640선 회복 마감 · 원달러 1,350원대 등락' }],
]

export function Newsstand() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // 6초 프로그레스 tick
  useEffect(() => {
    if (!state.opened) return
    const timer = setInterval(() => dispatch({ type: 'TICK' }), TICK_MS)
    return () => clearInterval(timer)
  }, [state.opened])

  const visiblePresses =
    state.tab === 'all'
      ? PRESSES
      : PRESSES.filter((p) => state.subscribed.has(p.id))

  const lastPage = Math.max(0, Math.ceil(visiblePresses.length / PAGE_SIZE) - 1)
  const pageItems = visiblePresses.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)

  const openedPress = state.opened ? PRESSES.find((p) => p.id === state.opened) ?? null : null
  const openedContent = state.opened ? PRESS_CONTENTS[state.opened] ?? null : null

  return (
    <div className={styles.root}>
      <Header date={new Date()} />
      <Ticker lanes={TICKER_LANES} />
      <TabBar
        activeTab={state.tab}
        subCount={state.subscribed.size}
        viewer={state.viewer}
        onTabChange={(tab) => dispatch({ type: 'SET_TAB', tab })}
        onViewerChange={(viewer) => dispatch({ type: 'SET_VIEWER', viewer })}
      />
      <div className={styles.content}>
        {openedPress && openedContent ? (
          <PressOpen
            press={openedPress}
            content={openedContent}
            tabKey={state.tabKey}
            progress={state.progress}
            currentInTab={state.currentInTab}
            onClose={() => dispatch({ type: 'CLOSE_PRESS' })}
            onCategoryChange={(key) => dispatch({ type: 'SET_CATEGORY', key })}
          />
        ) : (
          <div className={styles.gridArea}>
            <PressGrid
              items={pageItems}
              subscribedIds={state.subscribed}
              tab={state.tab}
              page={state.page}
              lastPage={lastPage}
              onPagePrev={() => dispatch({ type: 'SET_PAGE', page: state.page - 1 })}
              onPageNext={() => dispatch({ type: 'SET_PAGE', page: state.page + 1 })}
              onOpen={(id) => dispatch({ type: 'OPEN_PRESS', id })}
              onSubscribe={(id) => dispatch({ type: 'SUBSCRIBE', id })}
              onUnsubscribe={(id) => dispatch({ type: 'UNSUBSCRIBE', id })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
