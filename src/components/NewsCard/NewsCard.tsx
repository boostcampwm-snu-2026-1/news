import type { Publisher } from '../../types';

interface NewsCardProps {
  publisher: Publisher;
  isSubscribed: boolean;
  onSubscribe: (id: string) => void;
  onUnsubscribeRequest: (id: string) => void;
  viewMode: 'grid' | 'list';
}

const CATEGORY_COLORS: Record<string, string> = {
  '종합':     'bg-blue-100 text-blue-700',
  '경제':     'bg-orange-100 text-orange-700',
  'IT/과학':  'bg-emerald-100 text-emerald-700',
  '스포츠':   'bg-red-100 text-red-700',
  '방송/연예': 'bg-purple-100 text-purple-700',
  '지역':     'bg-gray-100 text-gray-600',
};

export function NewsCard({ publisher, isSubscribed, onSubscribe, onUnsubscribeRequest, viewMode }: NewsCardProps) {
  const { id, name, logoUrl, category, description } = publisher;
  const badgeClass = CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600';

  const handleActionClick = () => {
    if (isSubscribed) {
      onUnsubscribeRequest(id);
    } else {
      onSubscribe(id);
    }
  };

  if (viewMode === 'list') {
    return (
      <article className="card flex items-center gap-4 px-4 py-3">
        <img src={logoUrl} alt={`${name} 로고`} className="h-8 w-20 object-contain shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-text-primary">{name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${badgeClass}`}>{category}</span>
          </div>
          <p className="text-xs text-text-secondary truncate">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleActionClick}
            className="px-3 py-1.5 text-xs font-semibold rounded border transition-colors border-primary text-primary bg-white hover:bg-green-50"
          >
            기사보기
          </button>
          <button
            onClick={handleActionClick}
            aria-pressed={isSubscribed}
            className={[
              'px-3 py-1.5 text-xs font-semibold rounded border transition-colors',
              isSubscribed
                ? 'border-red-400 text-red-500 bg-white hover:bg-red-50'
                : 'border-primary text-primary bg-white hover:bg-green-50',
            ].join(' ')}
          >
            {isSubscribed ? '해지' : '+ 구독'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="card overflow-hidden">
      {/* 로고 영역 — 호버 시 초록 오버레이 */}
      <div className="relative h-24 bg-gray-50 flex items-center justify-center group">
        <img
          src={logoUrl}
          alt={`${name} 로고`}
          className="h-10 w-auto object-contain"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary/90">
          <button
            onClick={handleActionClick}
            aria-pressed={isSubscribed}
            className={[
              'px-3 py-1.5 text-xs font-semibold rounded border transition-colors',
              isSubscribed
                ? 'border-white/60 text-white bg-red-500/80 hover:bg-red-500'
                : 'border-white text-primary bg-white hover:bg-green-50',
            ].join(' ')}
          >
            {isSubscribed ? '해지' : '+ 구독'}
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold rounded border border-white text-primary bg-white hover:bg-green-50 transition-colors">
            기사보기
          </button>
        </div>
      </div>

      {/* 카드 하단 */}
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-text-primary truncate">{name}</span>
        <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${badgeClass}`}>
          {category}
        </span>
      </div>

      {isSubscribed && <div className="h-0.5 bg-primary" />}
    </article>
  );
}
