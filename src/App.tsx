import { useState } from 'react';
import { Header } from './components/Header/Header';
import { TabBar } from './components/TabBar/TabBar';
import { NewsGrid } from './components/NewsGrid/NewsGrid';
import { Pagination } from './components/Pagination/Pagination';
import { SubscribeModal } from './components/SubscribeModal/SubscribeModal';
import type { Publisher, TabType } from './types';
import publishersData from './data/publishers.json';

const publishers = publishersData as Publisher[];
const ITEMS_PER_PAGE = 24;

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [pendingUnsubscribeId, setPendingUnsubscribeId] = useState<string | null>(null);

  // localStorage로 구독 목록 초기화 및 유지 (#9)
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('news-subscribed');
    return stored ? new Set<string>(JSON.parse(stored) as string[]) : new Set<string>();
  });

  const saveSubscribed = (next: Set<string>) => {
    localStorage.setItem('news-subscribed', JSON.stringify([...next]));
    setSubscribedIds(next);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSubscribe = (id: string) => {
    const next = new Set(subscribedIds);
    next.add(id);
    saveSubscribed(next);
  };

  // 해지 버튼 → 모달 열기 (#10)
  const handleUnsubscribeRequest = (id: string) => {
    setPendingUnsubscribeId(id);
  };

  const handleUnsubscribeConfirm = () => {
    if (!pendingUnsubscribeId) return;
    const next = new Set(subscribedIds);
    next.delete(pendingUnsubscribeId);
    saveSubscribed(next);
    setPendingUnsubscribeId(null);
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

  const pendingPublisher = pendingUnsubscribeId
    ? publishers.find((p) => p.id === pendingUnsubscribeId)
    : null;

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        subscribedCount={subscribedIds.size}
      />

      <main className="container-page py-6">
        {/* 뷰 전환 토글 (#11) */}
        <div className="flex justify-end mb-4 gap-1">
          <button
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            title="카드형 보기"
            className={[
              'w-8 h-8 flex items-center justify-center rounded border transition-colors',
              viewMode === 'grid'
                ? 'border-primary text-primary bg-green-50'
                : 'border-border text-text-secondary hover:border-primary hover:text-primary',
            ].join(' ')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor"/>
              <rect x="8" y="0" width="6" height="6" rx="1" fill="currentColor"/>
              <rect x="0" y="8" width="6" height="6" rx="1" fill="currentColor"/>
              <rect x="8" y="8" width="6" height="6" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            title="리스트형 보기"
            className={[
              'w-8 h-8 flex items-center justify-center rounded border transition-colors',
              viewMode === 'list'
                ? 'border-primary text-primary bg-green-50'
                : 'border-border text-text-secondary hover:border-primary hover:text-primary',
            ].join(' ')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="14" height="2.5" rx="1" fill="currentColor"/>
              <rect x="0" y="5.5" width="14" height="2.5" rx="1" fill="currentColor"/>
              <rect x="0" y="11" width="14" height="2.5" rx="1" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <NewsGrid
          publishers={paginated}
          subscribedIds={subscribedIds}
          onSubscribe={handleSubscribe}
          onUnsubscribeRequest={handleUnsubscribeRequest}
          viewMode={viewMode}
          emptyMessage="구독한 언론사가 없습니다. 관심 있는 언론사를 구독해 보세요."
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* 해지 확인 모달 (#10) */}
      {pendingPublisher && (
        <SubscribeModal
          publisher={pendingPublisher}
          onConfirm={handleUnsubscribeConfirm}
          onCancel={() => setPendingUnsubscribeId(null)}
        />
      )}
    </div>
  );
}

export default App;
