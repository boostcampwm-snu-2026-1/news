import { useRef, useEffect } from 'react';
import type { Publisher } from '../../types';

interface PublisherStripProps {
  publishers: Publisher[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PublisherStrip({ publishers, activeIndex, onSelect }: PublisherStripProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  return (
    <div className="flex justify-center gap-1 pt-1 pb-2">
      {publishers.map((pub, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={pub.id}
            type="button"
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 transition-all duration-150 focus:outline-none ${
              isActive ? 'opacity-100' : 'opacity-55 hover:opacity-85'
            }`}
            style={{ width: 64 }}
          >
            <div
              className={`bg-surface flex items-center justify-center overflow-hidden transition-all duration-150 ${
                isActive
                  ? 'border-2 border-text-primary'
                  : 'border border-border hover:border-text-secondary'
              }`}
              style={{ width: 64, height: 40 }}
            >
              <img
                src={pub.thumbnailUrl}
                alt={pub.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('span')) {
                    const span = document.createElement('span');
                    span.textContent = pub.name.slice(0, 2);
                    span.className = 'text-[10px] font-bold text-text-secondary';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
