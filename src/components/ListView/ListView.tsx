import { useState, useMemo } from 'react';
import type { Publisher, Category } from '../../types';
import { CATEGORIES } from '../../types';
import { getMockArticles } from '../../data/mockArticles';

interface ListViewProps {
  publishers: Publisher[];
  subscribedIds: Set<string>;
  onSubscribe: (id: string) => void;
  onUnsubscribeRequest: (id: string) => void;
}

export function ListView({ publishers, subscribedIds, onSubscribe, onUnsubscribeRequest }: ListViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('종합');
  const [pubIndex, setPubIndex] = useState(0);

  const categoryPublishers = useMemo(
    () => publishers.filter((p) => p.category === selectedCategory),
    [publishers, selectedCategory],
  );

  const handleCategoryChange = (cat: Category) => {
    setSelectedCategory(cat);
    setPubIndex(0);
  };

  const total = categoryPublishers.length;
  const publisher = total > 0 ? categoryPublishers[pubIndex % total] : null;
  const isSubscribed = publisher ? subscribedIds.has(publisher.id) : false;

  const articles = useMemo(
    () => (publisher ? getMockArticles(selectedCategory, pubIndex * 3) : []),
    [publisher?.id, selectedCategory],
  );

  return (
    <div className="flex gap-0 min-h-96 card overflow-hidden">
      {/* 왼쪽: 분야 사이드바 */}
      <aside className="w-28 shrink-0 border-r border-border bg-gray-50">
        <p className="px-3 pt-3 pb-2 text-xs font-bold text-text-secondary uppercase tracking-wide">
          분야
        </p>
        <ul>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={[
                  'w-full text-left px-3 py-2.5 text-sm font-medium border-l-2 transition-colors',
                  selectedCategory === cat
                    ? 'border-primary text-primary bg-green-50'
                    : 'border-transparent text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* 오른쪽: 언론사 + 기사 */}
      {publisher ? (
        <div className="flex-1 p-5">
          {/* 언론사 헤더 */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src={publisher.logoUrl}
                alt={`${publisher.name} 로고`}
                className="h-8 w-auto object-contain"
              />
              <span className="font-semibold text-sm text-text-primary">
                {publisher.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  isSubscribed
                    ? onUnsubscribeRequest(publisher.id)
                    : onSubscribe(publisher.id)
                }
                className={[
                  'px-3 py-1.5 text-xs font-semibold rounded border transition-colors',
                  isSubscribed
                    ? 'border-red-400 text-red-500 hover:bg-red-50'
                    : 'border-primary text-primary hover:bg-green-50',
                ].join(' ')}
              >
                {isSubscribed ? '해지' : '+ 구독'}
              </button>

              {/* 언론사 이전/다음 */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPubIndex((i) => (i - 1 + total) % total)}
                  disabled={total <= 1}
                  className="w-7 h-7 flex items-center justify-center rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 transition-colors text-lg leading-none"
                  aria-label="이전 언론사"
                >
                  &#8249;
                </button>
                <span className="text-xs text-text-secondary tabular-nums w-8 text-center">
                  {pubIndex + 1}/{total}
                </span>
                <button
                  onClick={() => setPubIndex((i) => (i + 1) % total)}
                  disabled={total <= 1}
                  className="w-7 h-7 flex items-center justify-center rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 transition-colors text-lg leading-none"
                  aria-label="다음 언론사"
                >
                  &#8250;
                </button>
              </div>
            </div>
          </div>

          {/* 기사 목록 */}
          <ul className="flex flex-col gap-3">
            {articles.map((article, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 group"
              >
                <span className="text-sm text-text-primary group-hover:text-primary cursor-pointer transition-colors leading-snug">
                  {article.title}
                </span>
                <span className="text-xs text-text-secondary shrink-0">
                  {article.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
          선택한 분야의 언론사가 없습니다.
        </div>
      )}
    </div>
  );
}
