import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header/Header';
import { Ticker } from './components/Ticker/Ticker';
import { TabBar, type TabKey, type ViewerKey } from './components/TabBar/TabBar';
import { PressGrid } from './components/PressGrid/PressGrid';
import { PressOpen } from './components/PressOpen/PressOpen';
import { Chevron } from './components/Chevron/Chevron';
import { Toast } from './components/Toast/Toast';
import { PRESSES } from './data/presses';
import { TICKER_LANE_LEFT, TICKER_LANE_RIGHT } from './data/ticker';
import {
  clampPage,
  getPageCount,
  getPageItems,
  getSubscribedPresses,
} from './lib/pagination';
import { useSubscriptions } from './hooks/useSubscriptions';
import styles from './App.module.css';

export function App() {
  const [tab, setTab] = useState<TabKey>('all');
  const [viewer, setViewer] = useState<ViewerKey>('grid');
  const [page, setPage] = useState(0);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { subscribed, subscribe, unsubscribe, isSubscribed } = useSubscriptions();

  const subscribedPresses = useMemo(
    () => getSubscribedPresses(PRESSES, subscribed),
    [subscribed],
  );

  const pageCount = useMemo(
    () => getPageCount(tab, PRESSES.length, subscribedPresses.length),
    [tab, subscribedPresses.length],
  );

  // 구독 변동으로 sub 탭 페이지가 범위 밖이 될 수 있다 → clamp.
  useEffect(() => {
    setPage((p) => clampPage(p, pageCount));
  }, [pageCount]);

  const pageItems = useMemo(() => {
    if (tab === 'all') return getPageItems(PRESSES, page);
    return getPageItems(subscribedPresses, page);
  }, [tab, page, subscribedPresses]);

  const handleTabChange = useCallback((next: TabKey) => {
    setTab(next);
    setPage(0);
    setOpenedId(null);
  }, []);

  const handleSubscribe = useCallback(
    (id: string) => {
      subscribe(id);
      const press = PRESSES.find((p) => p.id === id);
      if (press) setToast(`${press.name}을(를) 구독했어요.`);
    },
    [subscribe],
  );

  const handleUnsubscribe = useCallback(
    (id: string) => {
      unsubscribe(id);
      const press = PRESSES.find((p) => p.id === id);
      if (press) setToast(`${press.name} 구독을 해지했어요.`);
    },
    [unsubscribe],
  );

  const openedPress = useMemo(
    () => (openedId ? PRESSES.find((p) => p.id === openedId) ?? null : null),
    [openedId],
  );

  // ESC로 오픈된 프레스 닫기 (a11y).
  useEffect(() => {
    if (!openedPress) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openedPress]);

  const subEmpty = tab === 'sub' && subscribedPresses.length === 0 && !openedPress;

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
          subCount={subscribed.size}
          viewer={viewer}
          onTabChange={handleTabChange}
          onViewerChange={setViewer}
        />
      </div>
      <div className={styles.content}>
        {openedPress ? (
          <PressOpen
            press={openedPress}
            subscribed={isSubscribed(openedPress.id)}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            onClose={() => setOpenedId(null)}
          />
        ) : subEmpty ? (
          <div className={styles.empty} role="status">
            <p className={styles.emptyTitle}>아직 구독한 언론사가 없어요.</p>
            <p className={styles.emptySub}>
              그리드의 언론사 카드에 마우스를 올려 ‘+ 구독하기’를 눌러보세요.
            </p>
          </div>
        ) : (
          <PressGrid
            items={pageItems}
            isSubscribed={isSubscribed}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            onOpen={setOpenedId}
          />
        )}
      </div>
      {!openedPress && !subEmpty && (
        <>
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
        </>
      )}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
