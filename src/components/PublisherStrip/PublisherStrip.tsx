import { useRef, useEffect } from 'react';
import type { Publisher } from '../../types';

interface PublisherStripProps {
  publishers: Publisher[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PublisherStrip({ publishers, activeIndex, onSelect }: PublisherStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // 활성 항목이 가시 영역 밖으로 나가면 스크롤
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  return (
    <div
      ref={stripRef}
      className="flex gap-2 overflow-x-auto py-3 px-4 scrollbar-hide"
      style={{ scrollbarWidth: 'none' }}
    >
      {publishers.map((pub, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={pub.id}
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 rounded transition-all duration-150 focus:outline-none ${
              isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90'
            }`}
          >
            {/* 썸네일 */}
            <div
              className={`bg-surface border flex items-center justify-center rounded-sm overflow-hidden transition-all duration-150 ${
                isActive ? 'border-2 border-text-primary' : 'border-border hover:border-text-secondary'
              }`}
              style={{ width: 96, height: 64 }}
            >
              <img
                src={pub.thumbnailUrl}
                alt={pub.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 이미지 없으면 이니셜 텍스트로 대체
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('span')) {
                    const span = document.createElement('span');
                    span.textContent = pub.name.slice(0, 2);
                    span.className = 'text-xs font-bold text-text-secondary';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            {/* 언론사명 */}
            <span className={`text-xs truncate max-w-[96px] ${isActive ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
              {pub.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
