import { useState } from 'react';
import { Header } from './components/Header/Header';
import { TabBar } from './components/TabBar/TabBar';
import { NewsCard } from './components/NewsCard/NewsCard';
import type { TabType } from './types';
import publishersData from './data/publishers.json';
import type { Publisher } from './types';

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
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container-page py-6">
        {visiblePublishers.length === 0 ? (
          <p className="text-center text-text-secondary text-sm py-16">
            구독한 언론사가 없습니다. 관심 있는 언론사를 구독해 보세요.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visiblePublishers.map((publisher) => (
              <NewsCard
                key={publisher.id}
                publisher={publisher}
                isSubscribed={subscribedIds.has(publisher.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
