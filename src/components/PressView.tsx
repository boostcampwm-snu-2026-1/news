import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNewsstandStore } from '../store/useNewsstandStore';
import { usePressListQuery, usePressDetailQuery } from '../hooks/useQueries';
import { CATEGORIES } from '../mocks/data';
import Chevron from './Chevron';

export default function PressView() {
  const { opened, setOpened, subscribed, subscribe, unsubscribe, tab } = useNewsstandStore();
  const { data: pressList = [], isLoading: isListLoading } = usePressListQuery();
  
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [activePressIndex, setActivePressIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // 현재 탭(모드)에 따라 보여줄 리스트 결정
  const activeList = useMemo(() => {
    return tab === 'sub' ? pressList.filter(p => subscribed.includes(p.id)) : pressList;
  }, [pressList, tab, subscribed]);

  // 카테고리별로 그룹화
  const groupedList = useMemo(() => {
    return CATEGORIES.map(cat => ({
      category: cat,
      presses: activeList.filter(p => p.category === cat)
    }));
  }, [activeList]);

  // Grid에서 특정 언론사를 클릭해서 넘어온 경우 해당 카테고리와 인덱스로 이동
  useEffect(() => {
    if (opened && activeList.length > 0) {
      for (let c = 0; c < groupedList.length; c++) {
        const pIdx = groupedList[c].presses.findIndex(p => p.id === opened);
        if (pIdx !== -1) {
          setActiveCatIndex(c);
          setActivePressIndex(pIdx);
          break;
        }
      }
    }
  }, [opened, activeList.length]);

  // 다음 언론사로 이동
  const handleNext = useCallback(() => {
    if (activeList.length <= 1) return;
    const currentCatPresses = groupedList[activeCatIndex].presses;
    if (activePressIndex < currentCatPresses.length - 1) {
      setActivePressIndex(prev => prev + 1);
    } else {
      let nextCatIndex = (activeCatIndex + 1) % CATEGORIES.length;
      let found = false;
      for (let i = 0; i < CATEGORIES.length; i++) {
        if (groupedList[nextCatIndex].presses.length > 0) {
          found = true;
          break;
        }
        nextCatIndex = (nextCatIndex + 1) % CATEGORIES.length;
      }
      if (found) {
        setActiveCatIndex(nextCatIndex);
        setActivePressIndex(0);
        setOpened(null);
      }
    }
    setProgress(0);
  }, [activeCatIndex, activePressIndex, groupedList, setOpened, activeList.length]);

  // 이전 언론사로 이동
  const handlePrev = useCallback(() => {
    if (activeList.length <= 1) return;
    if (activePressIndex > 0) {
      setActivePressIndex(prev => prev - 1);
    } else {
      let prevCatIndex = (activeCatIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
      let found = false;
      for (let i = 0; i < CATEGORIES.length; i++) {
        if (groupedList[prevCatIndex].presses.length > 0) {
          found = true;
          break;
        }
        prevCatIndex = (prevCatIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
      }
      if (found) {
        setActiveCatIndex(prevCatIndex);
        setActivePressIndex(groupedList[prevCatIndex].presses.length - 1);
        setOpened(null);
      }
    }
    setProgress(0);
  }, [activeCatIndex, activePressIndex, groupedList, setOpened, activeList.length]);

  // 6초 프로그레스 바 (전체/구독 언론사 모드 모두 동작)
  useEffect(() => {
    if (activeList.length === 0) return;

    setProgress(0);
    let currentProgress = 0;
    const duration = 6000;
    const interval = 50; 
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        handleNext();
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [tab, activeList.length, handleNext]);

  // 현재 렌더링할 데이터 결정 (안전장치 포함)
  const currentCatPresses = groupedList[activeCatIndex]?.presses || [];
  const validPressIndex = Math.min(activePressIndex, Math.max(0, currentCatPresses.length - 1));
  const currentPressId = currentCatPresses[validPressIndex]?.id || null;

  const { data: detailData, isLoading: isDetailLoading } = usePressDetailQuery(currentPressId);
  const isSubscribed = currentPressId ? subscribed.includes(currentPressId) : false;

  const handleSubscribe = () => {
    if (!currentPressId) return;
    if (isSubscribed) {
      unsubscribe(currentPressId);
    } else {
      subscribe(currentPressId);
    }
  };

  if (isListLoading) {
    return <div className="w-full h-[384px] flex items-center justify-center bg-card text-sub">데이터를 불러오는 중입니다...</div>;
  }

  // 상단 카테고리 탭 렌더링 컴포넌트
  const renderCategoryTabs = () => (
    <div className="flex h-10 bg-soft border-b border-line shrink-0">
      {CATEGORIES.map((cat, idx) => {
        const isActive = activeCatIndex === idx;
        const catPresses = groupedList[idx].presses;
        return (
          <button
            key={cat}
            onClick={() => {
              setActiveCatIndex(idx);
              setActivePressIndex(0);
              setOpened(null);
              setProgress(0);
            }}
            className={`relative flex-1 flex items-center justify-center text-sm cursor-pointer overflow-hidden
              ${isActive ? 'font-bold text-card bg-accent' : 'text-sub hover:bg-line/20'}
              border-r border-line last:border-r-0 outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent-deep
              ${catPresses.length === 0 ? 'opacity-50' : ''}
            `}
          >
            <div className="z-10 flex gap-2 items-center">
              <span>{cat}</span>
              {isActive && catPresses.length > 0 && (
                <span className="text-xs">{validPressIndex + 1} / {catPresses.length}</span>
              )}
            </div>
            {isActive && catPresses.length > 0 && (
              <div 
                className="absolute left-0 top-0 h-full bg-accent-deep transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  if (activeList.length === 0) {
    return (
      <div className="relative w-full h-[384px] flex flex-col bg-card">
        {renderCategoryTabs()}
        <div className="flex-1 flex items-center justify-center text-sub animate-fade-in">
          {tab === 'sub' ? '구독한 언론사가 없습니다.' : '언론사가 없습니다.'}
        </div>
      </div>
    );
  }

  if (!currentPressId || !detailData || isDetailLoading) {
    return (
      <div className="relative w-full h-[384px] flex flex-col bg-card">
        <Chevron direction="left" onClick={handlePrev} disabled={activeList.length <= 1} />
        <Chevron direction="right" onClick={handleNext} disabled={activeList.length <= 1} />
        {renderCategoryTabs()}
        <div className="flex-1 flex items-center justify-center text-sub animate-fade-in">
          {isDetailLoading ? '데이터를 불러오는 중입니다...' : '이 카테고리에는 언론사가 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[384px] flex flex-col bg-card">
      <Chevron direction="left" onClick={handlePrev} disabled={activeList.length <= 1} />
      <Chevron direction="right" onClick={handleNext} disabled={activeList.length <= 1} />

      {renderCategoryTabs()}

      {/* 하단 기사 렌더링 영역 */}
      <div key={currentPressId} className="flex flex-1 p-6 gap-8 animate-fade-in">
        {/* 좌측 메인 헤드라인 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-ink">{detailData.name}</span>
            <span className="text-xs text-mute">{detailData.date}</span>
            <button 
              onClick={handleSubscribe}
              className="px-3 py-1.5 text-xs border border-line rounded-full text-sub hover:bg-soft transition-colors flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {isSubscribed ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  해지하기
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  구독하기
                </>
              )}
            </button>
          </div>
          <div className="flex-1 group cursor-pointer flex flex-col">
            <div className="w-full h-[200px] overflow-hidden border border-line bg-soft mb-3 shrink-0">
              <img 
                src={detailData.headline.imageUrl} 
                alt="Headline" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <span className="text-ink text-base font-medium group-hover:underline line-clamp-2">
              {detailData.headline.title}
            </span>
          </div>
        </div>

        {/* 우측 6개의 일반 기사 리스트 */}
        <div className="flex-1 flex flex-col justify-between py-2 mt-8">
          <ul className="flex flex-col gap-4">
            {detailData.articles.map((title, idx) => (
              <li key={idx} className="text-ink hover:underline cursor-pointer truncate flex items-center gap-2">
                <span className="text-sub text-xs">●</span>
                {title}
              </li>
            ))}
          </ul>
          <div className="text-sub text-sm hover:underline cursor-pointer mt-4 font-medium">
            {detailData.name} 언론사에서 직접 편집한 뉴스입니다.
          </div>
        </div>
      </div>
    </div>
  );
}
