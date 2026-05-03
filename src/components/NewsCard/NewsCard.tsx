import type { Publisher } from '../../types';

interface NewsCardProps {
  publisher: Publisher;
  isSubscribed: boolean;
  onToggle: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  '종합': 'bg-blue-100 text-blue-700',
  '경제': 'bg-orange-100 text-orange-700',
  'IT/과학': 'bg-emerald-100 text-emerald-700',
  '스포츠': 'bg-red-100 text-red-700',
  '방송/연예': 'bg-purple-100 text-purple-700',
  '지역': 'bg-gray-100 text-gray-600',
};

export function NewsCard({ publisher, isSubscribed, onToggle }: NewsCardProps) {
  const { id, name, logoUrl, category, description } = publisher;
  const badgeClass = CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600';

  return (
    <article className="card p-4 flex flex-col gap-3">
      <img
        src={logoUrl}
        alt={`${name} 로고`}
        className="h-10 w-auto object-contain self-start"
      />

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">{name}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${badgeClass}`}>
            {category}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <button
        onClick={() => onToggle(id)}
        className={`btn-subscribe self-start ${isSubscribed ? 'subscribed' : ''}`}
        aria-pressed={isSubscribed}
      >
        {isSubscribed ? '✓ 구독중' : '+ 구독'}
      </button>
    </article>
  );
}
