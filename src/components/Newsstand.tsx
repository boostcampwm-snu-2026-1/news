import { useEffect, useMemo, useState } from 'react';
import type { CategoryKey, PressId, Tab, Viewer } from '../types';
import {
  PRESSES,
  PRESSES_BY_ID,
  PAGE_SIZE,
} from '../data/presses';
import { CATEGORY_KEYS, TAB_TOTAL } from '../data/categories';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { TICKER_LANES } from '../data/ticker';
import { getArticle } from '../data/articles';
import Header from './Header';
import Ticker from './Ticker';
import TabBar from './TabBar';
import PressGrid from './PressGrid';
import Chevron from './Chevron';
import FieldTab from './FieldTab';
import PressOpen from './PressOpen';
import styles from './Newsstand.module.css';

const TODAY = '2026. 01. 14. 수요일';
const PROGRESS_TICK_MS = 100;
const PROGRESS_DURATION_MS = 6000;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Newsstand() {
  const [tab, setTab] = useState<Tab>('all');
  const [viewer, setViewer] = useState<Viewer>('grid');
  const [page, setPage] = useState(0);
  const [opened, setOpened] = useState<PressId | null>(null);
  const [tabKey, setTabKey] = useState<CategoryKey>(CATEGORY_KEYS[0]);
  const [progress, setProgress] = useState(0);
  const [currentInTab, setCurrentInTab] = useState(1);
  const { subscribed, subscribe, unsubscribe } = useSubscriptions();

  /* derive page items */
  const subscribedList = useMemo(
    () => PRESSES.filter((p) => subscribed.has(p.id)),
    [subscribed],
  );
  const sourceList = tab === 'all' ? PRESSES : subscribedList;
  const totalPages = Math.max(1, Math.ceil(sourceList.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = sourceList.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  /* progress driver — runs only when an opened press is shown */
  useEffect(() => {
    if (!opened) return;
    if (prefersReducedMotion()) return;
    let elapsed = progress * PROGRESS_DURATION_MS;
    const id = window.setInterval(() => {
      elapsed += PROGRESS_TICK_MS;
      const frac = Math.min(1, elapsed / PROGRESS_DURATION_MS);
      setProgress(frac);
      if (frac >= 1) {
        elapsed = 0;
        setProgress(0);
        advanceCurrent();
      }
    }, PROGRESS_TICK_MS);
    return () => window.clearInterval(id);
    /* deliberately exclude `progress` from deps so the interval keeps a
       single elapsed counter rather than restarting on every tick */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, tabKey, currentInTab]);

  function advanceCurrent() {
    setCurrentInTab((cur) => {
      if (cur < TAB_TOTAL) return cur + 1;
      // exhausted: advance category, loop back to first when last finishes
      setTabKey((k) => {
        const i = CATEGORY_KEYS.indexOf(k);
        return CATEGORY_KEYS[(i + 1) % CATEGORY_KEYS.length];
      });
      return 1;
    });
  }

  /* event handlers */
  const onTabChange = (t: Tab) => {
    setTab(t);
    setPage(0);
  };

  const onOpen = (id: PressId) => {
    const press = PRESSES_BY_ID[id];
    if (!press) return;
    setOpened(id);
    setViewer('list');
    setTabKey(press.primaryCategory);
    setCurrentInTab(1);
    setProgress(0);
  };

  const onCloseOpened = () => {
    setOpened(null);
    setViewer('grid');
    setProgress(0);
  };

  const handleViewerChange = (v: Viewer) => {
    setViewer(v);
    if (v === 'grid') onCloseOpened();
  };

  const openedPress = opened ? PRESSES_BY_ID[opened] : null;
  const article = openedPress
    ? getArticle(openedPress.id, tabKey, openedPress.name)
    : null;

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Header date={TODAY} />
        <Ticker lanes={TICKER_LANES} />
        <TabBar
          activeTab={tab}
          viewer={viewer}
          subCount={subscribed.size}
          onTabChange={onTabChange}
          onViewerChange={handleViewerChange}
        />

        <div className={styles.contentBlock}>
          {opened && openedPress && article ? (
            <>
              <FieldTab
                activeKey={tabKey}
                currentInTab={currentInTab}
                progress={progress}
                onSelect={(k) => {
                  setTabKey(k);
                  setCurrentInTab(1);
                  setProgress(0);
                }}
              />
              <PressOpen
                press={openedPress}
                isSubscribed={subscribed.has(openedPress.id)}
                editTime={article.editTime}
                headline={article.headline}
                list={article.list}
                onSubscribe={subscribe}
                onUnsubscribe={unsubscribe}
              />
            </>
          ) : (
            <PressGrid
              items={pageItems}
              subscribedIds={subscribed}
              onSubscribe={subscribe}
              onUnsubscribe={unsubscribe}
              onOpen={onOpen}
            />
          )}

          {!opened && (
            <>
              <Chevron
                dir="left"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              />
              <Chevron
                dir="right"
                disabled={safePage >= totalPages - 1}
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
