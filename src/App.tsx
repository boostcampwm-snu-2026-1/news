import { useMemo, useState } from 'react';
import { Header } from './components/Header/Header';
import { Ticker } from './components/Ticker/Ticker';
import { TabBar, type TabKey, type ViewerKey } from './components/TabBar/TabBar';
import { PressGrid } from './components/PressGrid/PressGrid';
import { Chevron } from './components/Chevron/Chevron';
import { CELLS_PER_PAGE, PRESSES } from './data/presses';
import { TICKER_LANE_LEFT, TICKER_LANE_RIGHT } from './data/ticker';
import styles from './App.module.css';

export function App() {
  const [tab, setTab] = useState<TabKey>('all');
  const [viewer, setViewer] = useState<ViewerKey>('grid');
  const [page, setPage] = useState(0);
  // Week 2의 구독 상태가 아직 없으므로 frame 01 화면을 재현하기 위해 임시로 8로 표시.
  const subCount = 8;

  const pageCount = useMemo(() => {
    if (tab === 'all') return Math.ceil(PRESSES.length / CELLS_PER_PAGE); // 3
    return Math.max(1, Math.ceil(subCount / CELLS_PER_PAGE));
  }, [tab, subCount]);

  const pageItems = useMemo(() => {
    if (tab === 'all') {
      const start = page * CELLS_PER_PAGE;
      return PRESSES.slice(start, start + CELLS_PER_PAGE);
    }
    return [];
  }, [tab, page]);

  // 탭 전환 시 페이지 리셋 (페이지 수가 탭마다 다르므로)
  const handleTabChange = (next: TabKey) => {
    setTab(next);
    setPage(0);
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.ticker}>
        <Ticker laneLeft={TICKER_LANE_LEFT} laneRight={TICKER_LANE_RIGHT} />
      </div>
      <div className={styles.tabbar}>
        <TabBar
          activeTab={tab}
          subCount={subCount}
          viewer={viewer}
          onTabChange={handleTabChange}
          onViewerChange={setViewer}
        />
      </div>
      <div className={styles.content}>
        <PressGrid items={pageItems} />
      </div>
      <div className={`${styles.chevron} ${styles.chevronLeft}`}>
        <Chevron
          dir="left"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        />
      </div>
      <div className={`${styles.chevron} ${styles.chevronRight}`}>
        <Chevron
          dir="right"
          disabled={page >= pageCount - 1}
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        />
      </div>
    </div>
  );
}
