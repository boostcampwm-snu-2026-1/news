import React from 'react';
import { useNewsstandStore } from '../store/useNewsstandStore';

interface PressData {
  id: string;
  name: string;
  logo: string;
}

interface PressCellProps {
  press?: PressData;
}

export default function PressCell({ press }: PressCellProps) {
  const { subscribed, subscribe, unsubscribe } = useNewsstandStore();
  
  if (!press) {
    return <div className="w-full h-full bg-card" />;
  }

  const isSubscribed = subscribed.includes(press.id);

  const handleSubscribe = () => {
    if (isSubscribed) {
      unsubscribe(press.id);
    } else {
      subscribe(press.id);
    }
  };

  return (
    <div className="group relative w-full h-full flex items-center justify-center bg-card hover:bg-soft transition-colors cursor-pointer">
      {/* 기본 로고 표시 영역 */}
      <div className="group-hover:hidden flex items-center justify-center w-full h-full">
        {press.logo ? (
          <img src={press.logo} alt={press.name} className="max-w-[70%] max-h-[40%] object-contain" />
        ) : (
          <span className="text-sub text-sm font-medium">{press.name}</span>
        )}
      </div>

      {/* Hover 시 나타나는 버튼 영역 */}
      <div className="hidden group-hover:flex items-center justify-center w-full h-full absolute inset-0 bg-soft">
        <button
          onClick={handleSubscribe}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-line shadow-sm text-xs text-sub font-medium hover:bg-card/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {isSubscribed ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>해지하기</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>구독하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
