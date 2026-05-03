import { useState } from 'react';
import { Header } from './components/Header/Header';
import { TabBar } from './components/TabBar/TabBar';
import { NewsGrid } from './components/NewsGrid/NewsGrid';
import { Pagination } from './components/Pagination/Pagination';
import type { Publisher, TabType } from './types';
import publishersData from './data/publishers.json';

const publishers = publishersData as Publisher[];
const ITEMS_PER_PAGE = 24;

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleToggle = (id: string) => {
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered =
    activeTab === 'all'
      ? publishers
      : publishers.filter((p) => subscribedIds.has(p.id));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        subscribedCount={subscribedIds.size}
      />
      <main className="container-page py-6">
        <NewsGrid
          publishers={paginated}
          subscribedIds={subscribedIds}
          onToggle={handleToggle}
          emptyMessage="구독한 언론사가 없습니다. 관심 있는 언론사를 구독해 보세요."
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default App;
