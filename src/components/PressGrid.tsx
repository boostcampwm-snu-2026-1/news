import { useMemo, useState } from 'react';
import type { Press } from '../types';
import PressGridCell from './PressGridCell';

const COLUMNS = 6;
const ROWS = 4;
const PAGE_SIZE = COLUMNS * ROWS;
const EMPTY_SUBSCRIBED_IDS: readonly string[] = [];

interface PressGridProps {
  presses: Press[];
  subscribedPressIds?: readonly string[];
  onToggleSubscription?: (pressId: string) => void;
}

export default function PressGrid({
  presses,
  subscribedPressIds = EMPTY_SUBSCRIBED_IDS,
  onToggleSubscription,
}: PressGridProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(presses.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const subscribedSet = useMemo(() => new Set(subscribedPressIds), [subscribedPressIds]);

  const pagePresses = presses.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  const cells = Array.from({ length: PAGE_SIZE }, (_, index) => pagePresses[index]);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < pageCount - 1;

  return (
    <section className="max-w-[1080px] mx-auto px-4 py-7">
      <div className="relative">
        {canGoPrev && (
          <PageButton direction="prev" onClick={() => setPage((current) => Math.max(0, current - 1))} />
        )}

        <div className="grid grid-cols-6 pl-px pt-px">
          {cells.map((press, index) => (
            <PressGridCell
              key={press?.id ?? `empty-${currentPage}-${index}`}
              press={press}
              isSubscribed={press ? subscribedSet.has(press.id) : false}
              onToggleSubscription={onToggleSubscription}
              className="-ml-px -mt-px"
            />
          ))}
        </div>

        {canGoNext && (
          <PageButton
            direction="next"
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
          />
        )}
      </div>
    </section>
  );
}

interface PageButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function PageButton({ direction, onClick }: PageButtonProps) {
  const isPrev = direction === 'prev';

  return (
    <button
      type="button"
      aria-label={isPrev ? '이전 언론사 페이지' : '다음 언론사 페이지'}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-14 w-10 -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4169e1] ${
        isPrev ? '-left-12' : '-right-12'
      }`}
    >
      <svg
        width="28"
        height="56"
        viewBox="0 0 28 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={isPrev ? 'M20 16L8 28L20 40' : 'M8 16L20 28L8 40'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
