import React, { useMemo, useEffect } from 'react';
import { useNewsstandStore } from '../store/useNewsstandStore';
import PressCell from './PressCell';
import Chevron from './Chevron';
import { usePressListQuery } from '../hooks/useQueries';

const ITEMS_PER_PAGE = 24;

export default function PressGrid() {
  const { page, setPage, tab, subscribed } = useNewsstandStore();
  const { data: pressList = [], isLoading } = usePressListQuery();
  
  // '전체 언론사' / '구독한 언론사' 필터링
  const filteredList = useMemo(() => {
    if (tab === 'sub') {
      return pressList.filter(press => subscribed.includes(press.id));
    }
    return pressList;
  }, [pressList, tab, subscribed]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE) || 1;

  // 탭이 바뀌거나 데이터가 변경되어 현재 페이지가 총 페이지 수를 초과하면 1페이지로 리셋
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page, setPage]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredList.slice(start, end);
  }, [filteredList, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading) {
    return <div className="w-full h-[384px] flex items-center justify-center bg-card text-sub">데이터를 불러오는 중입니다...</div>;
  }

  if (filteredList.length === 0 && tab === 'sub') {
    return <div className="w-full h-[384px] flex items-center justify-center bg-card text-sub">구독한 언론사가 없습니다.</div>;
  }

  return (
    <div className="relative w-full h-full bg-card">
      <Chevron direction="left" onClick={handlePrev} disabled={page <= 1} />
      
      {/* 6x4 그리드 레이아웃. 셀 단위 경계선을 통해 전체 테두리 효과까지 완성 */}
      <div key={page} className="grid grid-cols-6 grid-rows-4 w-full h-[384px] animate-fade-in">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => {
          const item = currentItems[idx];
          const isLastCol = idx % 6 === 5;
          const isLastRow = Math.floor(idx / 6) === 3;
          
          return (
            <div 
              key={item?.id || `empty-${idx}`} 
              className={`flex items-center justify-center w-full h-full
                ${!isLastCol ? 'border-r border-line' : ''} 
                ${!isLastRow ? 'border-b border-line' : ''}
              `}
            >
              <PressCell press={item} />
            </div>
          );
        })}
      </div>
      
      <Chevron direction="right" onClick={handleNext} disabled={page >= totalPages} />
    </div>
  );
}
