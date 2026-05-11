import { useState, useEffect } from 'react';
import { mockPressData } from '../../../data/pressData';
import GridCell from './GridCell';
import type { Press } from '../../../types/press';
import { useNewsstandStore } from '../../../store/NewsstandContext';

const ITEMS_PER_PAGE = 24;

const PressGrid = () => {
  const { subscribedIds, toggleSubscription, activeTab } = useNewsstandStore();
  const [currentPage, setCurrentPage] = useState(0);

  // '전체 언론사' ↔ '내가 구독한 언론사' 탭 전환 시 항상 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  // 'sub' 탭일 때는 구독한 언론사만 필터링, 아니면 전체 언론사
  const filteredData = activeTab === 'sub' 
    ? mockPressData.filter(press => subscribedIds.has(press.id))
    : mockPressData;

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));

  const currentItems = filteredData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const cells: (Press | null)[] = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => currentItems[i] || null);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="relative w-[var(--width-content)] mt-[var(--spacing-48)]">
      {/* 구독 0개 상태: 그리드 중앙에 안내 메시지 */}
      {activeTab === 'sub' && filteredData.length === 0 ? (
        <div className="w-full h-[388px] bg-[var(--color-card)] border border-[var(--color-line)] flex items-center justify-center">
          <span className="text-[var(--color-mute)] font-medium">구독한 언론사가 없습니다.</span>
        </div>
      ) : (
        <div className="grid grid-cols-6 grid-rows-[repeat(4,96px)] bg-[var(--color-line)] border border-[var(--color-line)] gap-[1px] w-full">
          {cells.map((press, index) => (
            <GridCell 
              key={press ? press.id : `empty-${index}`} 
              press={press} 
              isSubscribed={press ? subscribedIds.has(press.id) : false}
              onToggleSubscription={toggleSubscription}
            />
          ))}
        </div>
      )}
      
      {currentPage > 0 && (
        <button 
          aria-label="이전 페이지"
          className="absolute top-1/2 -translate-y-1/2 text-[var(--color-mute)] flex items-center justify-center cursor-pointer -left-[60px] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]" 
          onClick={handlePrevPage}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M18 34L6 20L18 6" />
          </svg>
        </button>
      )}
      
      {currentPage < totalPages - 1 && (
        <button 
          aria-label="다음 페이지"
          className="absolute top-1/2 -translate-y-1/2 text-[var(--color-mute)] flex items-center justify-center cursor-pointer -right-[60px] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]" 
          onClick={handleNextPage}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M6 34L18 20L6 6" />
          </svg>
        </button>
      )}
    </main>
  );
};

export default PressGrid;
