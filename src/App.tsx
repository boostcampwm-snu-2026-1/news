import { useState } from 'react';
import { Header } from './components/Header/Header';
import { TabBar } from './components/TabBar/TabBar';
import { NewsGrid } from './components/NewsGrid/NewsGrid';
import type { Publisher, TabType } from './types';
import publishersData from './data/publishers.json';

const publishers = publishersData as Publisher[];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visiblePublishers =
    activeTab === 'all'
      ? publishers
      : publishers.filter((p) => subscribedIds.has(p.id));

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        subscribedCount={subscribedIds.size}
      />
      <main className="container-page py-6">
        <NewsGrid
          publishers={visiblePublishers}
          subscribedIds={subscribedIds}
          onToggle={handleToggle}
          emptyMessage="구독한 언론사가 없습니다. 관심 있는 언론사를 구독해 보세요."
        />
      </main>
    </div>
  );
}

export default App;
