import type { Publisher } from '../../types';

interface NewsCardProps {
  publisher: Publisher;
  isSubscribed: boolean;
  onToggle: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  '종합':     'bg-blue-100 text-blue-700',
  '경제':     'bg-orange-100 text-orange-700',
  'IT/과학':  'bg-emerald-100 text-emerald-700',
  '스포츠':   'bg-red-100 text-red-700',
  '방송/연예': 'bg-purple-100 text-purple-700',
  '지역':     'bg-gray-100 text-gray-600',
};

export function NewsCard({ publisher, isSubscribed, onToggle }: NewsCardProps) {
  const { id, name, logoUrl, category } = publisher;
  const badgeClass = CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600';

  return (
    <article className="card overflow-hidden">
      {/* 로고 영역 */}
      <div className="relative h-24 bg-gray-50 flex items-center justify-center group">
        <img
          src={logoUrl}
          alt={`${name} 로고`}
          className="h-10 w-auto object-contain"
        />

        {/* 호버 오버레이 — 로고는 그대로, 버튼만 좌우로 */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80">
          <button
            onClick={() => onToggle(id)}
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
          <button className="px-3 py-1.5 text-xs font-semibold rounded border border-gray-400 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
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

      {/* 구독 중 하단 바 */}
      {isSubscribed && (
        <div className="h-0.5 bg-primary" />
      )}
    </article>
  );
}
