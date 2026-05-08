import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewer, setViewer] = useState<ViewType>('grid');
  const [subscribed, setSubscribed] = useState<Set<number>>(new Set());

  const handleToggle = (id: number) => {
    setSubscribed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const [page, setPage] = useState(0);
  const [openedPressId, setOpenedPressId] = useState<number | null>(null);

  const allItems = activeTab === 'all'
    ? pressData
    : pressData.filter((p) => subscribed.has(p.id));
  const totalPages = Math.max(1, Math.ceil(allItems.length / 24));
  const pageItems = allItems.slice(page * 24, (page + 1) * 24);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPage(0);
    setOpenedPressId(null);
  };

  const handleCellClick = (id: number) => {
    setOpenedPressId(id);
    setViewer('list');
  };

  const openedPress = openedPressId !== null
    ? pressData.find((p) => p.id === openedPressId) ?? null
    : null;

  return (
    <div className="newsstand-wrap">
      <Header date={getFormattedDate()} />
      <Ticker items={tickerData} />
      <TabBar
        activeTab={activeTab}
        subCount={subscribed.size}
        viewer={viewer}
        onTabChange={handleTabChange}
        onViewerChange={(v) => {
          setViewer(v);
          if (v === 'grid') setOpenedPressId(null);
        }}
      />
      {viewer === 'list' && openedPress ? (
        <PressOpen
          press={openedPress}
          isSubscribed={subscribed.has(openedPress.id)}
          onToggle={handleToggle}
        />
      ) : (
        <PressGrid
          items={pageItems}
          subscribedIds={subscribed}
          isSubTab={activeTab === 'sub'}
          onToggle={handleToggle}
          onCellClick={handleCellClick}
        />
      )}
      {!(viewer === 'list' && openedPress) && (
        <>
          <Chevron dir="left" disabled={page === 0} onClick={() => setPage((p) => p - 1)} />
          <Chevron dir="right" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} />
        </>
      )}
    </div>
  );
}

export default App;
