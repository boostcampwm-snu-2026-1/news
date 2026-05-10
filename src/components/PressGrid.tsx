import { useState } from 'react';
import { PRESS_LIST } from '../data/mockData';
import PressGridCell from './PressGridCell';
import type { TabKind } from '../types';

const PAGE_SIZE = 24;

interface PressGridProps {
  tab: TabKind;
  subscribedIds: Set<string>;
  onToggleSubscription: (pressId: string) => void;
}

export default function PressGrid({ tab, subscribedIds, onToggleSubscription }: PressGridProps) {
  const [page, setPage] = useState(0);

  const presses =
    tab === 'all' ? PRESS_LIST : PRESS_LIST.filter((p) => subscribedIds.has(p.id));

  const totalPages = Math.max(1, Math.ceil(presses.length / PAGE_SIZE));

  const start = page * PAGE_SIZE;
  const pagePresses = presses.slice(start, start + PAGE_SIZE);
  const cells = Array.from({ length: PAGE_SIZE }, (_, i) => pagePresses[i]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-4">
      <div className="flex items-stretch">
        <div className="w-10 flex items-center justify-center shrink-0">
          <button
            type="button"
            aria-label="이전 페이지"
            onClick={() => setPage((p) => p - 1)}
            className={`p-2 text-gray-400 hover:text-gray-700 transition-colors ${!canPrev ? 'invisible pointer-events-none' : ''}`}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M7 1L1 7l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-6 border-l border-t border-[#e0e0e0]">
          {cells.map((press, i) => (
            <PressGridCell
              key={press?.id ?? `empty-${i}`}
              press={press}
              isSubscribed={press ? subscribedIds.has(press.id) : false}
              onToggleSubscription={onToggleSubscription}
            />
          ))}
        </div>

        <div className="w-10 flex items-center justify-center shrink-0">
          <button
            type="button"
            aria-label="다음 페이지"
            onClick={() => setPage((p) => p + 1)}
            className={`p-2 text-gray-400 hover:text-gray-700 transition-colors ${!canNext ? 'invisible pointer-events-none' : ''}`}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M1 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
