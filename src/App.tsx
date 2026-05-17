import { useState, useMemo } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import TabBar from './components/TabBar';
import type { TabType, ViewType } from './components/TabBar';
import PressGrid from './components/PressGrid';
import PressOpen from './components/PressOpen';
import Chevron from './components/Chevron';
import { tickerData, pressData } from './data/press';

function getFormattedDate(): string {
  const now = new Date();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}. ${days[now.getDay()]}`;
}

function App() {
  // ── Newsstand root state ──
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewer, setViewer] = useState<ViewType>('grid');
  const [page, setPage] = useState(0);
  const [openedPressId, setOpenedPressId] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState<Set<number>>(new Set());

  // ── Derived ──
  const allItems = useMemo(
    () => activeTab === 'all'
      ? pressData
      : pressData.filter((p) => subscribed.has(p.id)),
    [activeTab, subscribed],
  );
  const totalPages = Math.max(1, Math.ceil(allItems.length / 24));
  const pageItems = allItems.slice(page * 24, (page + 1) * 24);

  const openedPress = openedPressId !== null
    ? pressData.find((p) => p.id === openedPressId) ?? null
    : null;

  const showListView = viewer === 'list' && openedPress !== null;

  // ── Handlers ──
  const handleToggle = (id: number) => {
    setSubscribed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPage(0);
    setOpenedPressId(null);
    setViewer('grid');
  };

  const handleViewerChange = (v: ViewType) => {
    setViewer(v);
    if (v === 'grid') {
      setOpenedPressId(null);
    } else if (v === 'list' && openedPressId === null) {
      const firstItem = allItems[0];
      if (firstItem) {
        setOpenedPressId(firstItem.id);
      } else {
        setViewer('grid');
      }
    }
  };

  const handleCellClick = (id: number) => {
    setOpenedPressId(id);
    setViewer('list');
  };

  return (
    <div className="newsstand-wrap">
      <Header date={getFormattedDate()} />
      <Ticker items={tickerData} />
      <TabBar
        activeTab={activeTab}
        subCount={subscribed.size}
        viewer={viewer}
        onTabChange={handleTabChange}
        onViewerChange={handleViewerChange}
      />
      <div className="view-container">
        {showListView ? (
          <div className="view-panel view-panel--list" key={`list-${openedPressId}`}>
            <PressOpen
              press={openedPress!}
              isSubscribed={subscribed.has(openedPress!.id)}
              onToggle={handleToggle}
            />
          </div>
        ) : (
          <div className="view-panel view-panel--grid" key={`grid-${page}`}>
            <PressGrid
              items={pageItems}
              subscribedIds={subscribed}
              isSubTab={activeTab === 'sub'}
              onToggle={handleToggle}
              onCellClick={handleCellClick}
            />
          </div>
        )}
      </div>
      {!showListView && (
        <>
          <Chevron dir="left" disabled={page === 0} onClick={() => setPage((p) => p - 1)} />
          <Chevron dir="right" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} />
        </>
      )}
    </div>
  );
}

export default App;
