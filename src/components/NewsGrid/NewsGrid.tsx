import type { Publisher } from '../../types';
import { NewsCard } from '../NewsCard/NewsCard';

interface NewsGridProps {
  publishers: Publisher[];
  subscribedIds: Set<string>;
  onToggle: (id: string) => void;
  emptyMessage?: string;
}

export function NewsGrid({ publishers, subscribedIds, onToggle, emptyMessage }: NewsGridProps) {
  if (publishers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-4xl">📭</span>
        <p className="text-text-secondary text-sm">
          {emptyMessage ?? '표시할 언론사가 없습니다.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {publishers.map((publisher) => (
        <NewsCard
          key={publisher.id}
          publisher={publisher}
          isSubscribed={subscribedIds.has(publisher.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
