import { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import TabBar from './components/TabBar';
import type { TabType, ViewType } from './components/TabBar';
import PressGrid from './components/PressGrid';
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
  const [page] = useState(0);

  const pageItems = activeTab === 'all'
    ? pressData.slice(page * 24, (page + 1) * 24)
    : pressData.filter((p) => subscribed.has(p.id)).slice(page * 24, (page + 1) * 24);

  return (
    <div className="newsstand-wrap">
      <Header date={getFormattedDate()} />
      <Ticker items={tickerData} />
      <TabBar
        activeTab={activeTab}
        subCount={subscribed.size}
        viewer={viewer}
        onTabChange={setActiveTab}
        onViewerChange={setViewer}
      />
      <PressGrid
          items={pageItems}
          subscribedIds={subscribed}
          isSubTab={activeTab === 'sub'}
          onToggle={handleToggle}
        />
    </div>
  );
}

export default App;
