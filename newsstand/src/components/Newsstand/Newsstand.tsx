import { useReducer } from 'react'
import { PRESSES } from '../../data/presses'
import type { TabKey, ViewerKey } from '../TabBar/TabBar'
import { Header } from '../Header/Header'
import { Ticker } from '../Ticker/Ticker'
import { TabBar } from '../TabBar/TabBar'
import { PressGrid } from '../PressGrid/PressGrid'
import styles from './Newsstand.module.css'

const PAGE_SIZE = 24

interface State {
  tab: TabKey
  viewer: ViewerKey
  page: number
  opened: string | null
  subscribed: Set<string>
}

type Action =
  | { type: 'SET_TAB'; tab: TabKey }
  | { type: 'SET_VIEWER'; viewer: ViewerKey }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'OPEN_PRESS'; id: string }
  | { type: 'CLOSE_PRESS' }
  | { type: 'SUBSCRIBE'; id: string }
  | { type: 'UNSUBSCRIBE'; id: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.tab, page: 0, opened: null }
    case 'SET_VIEWER':
      return { ...state, viewer: action.viewer }
    case 'SET_PAGE':
      return { ...state, page: action.page }
    case 'OPEN_PRESS':
      return { ...state, opened: action.id }
    case 'CLOSE_PRESS':
      return { ...state, opened: null }
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
  subscribed: new Set(),
}

const TICKER_LANES: [Parameters<typeof Ticker>[0]['lanes'][0], Parameters<typeof Ticker>[0]['lanes'][1]] = [
  [{ id: 't1', label: 'BREAKING', text: '국회 본회의 예산안 처리 논란 — 여야 막판 협상 난항' }],
  [{ id: 't2', label: 'MARKET', text: '코스피 2,640선 회복 마감 · 원달러 1,350원대 등락' }],
]

export function Newsstand() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const visiblePresses =
    state.tab === 'all'
      ? PRESSES
      : PRESSES.filter((p) => state.subscribed.has(p.id))

  const lastPage = Math.max(0, Math.ceil(visiblePresses.length / PAGE_SIZE) - 1)
  const pageItems = visiblePresses.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)

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
        <div className={styles.gridArea}>
          <PressGrid
            items={pageItems}
            subscribedIds={state.subscribed}
            page={state.page}
            lastPage={lastPage}
            onPagePrev={() => dispatch({ type: 'SET_PAGE', page: state.page - 1 })}
            onPageNext={() => dispatch({ type: 'SET_PAGE', page: state.page + 1 })}
            onOpen={(id) => dispatch({ type: 'OPEN_PRESS', id })}
          />
        </div>
      </div>
    </div>
  )
}
