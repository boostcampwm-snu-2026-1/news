import type { HotArticle } from '../../types';

interface HotListProps {
  articles: HotArticle[];
}

export function HotList({ articles }: HotListProps) {
  return (
    <div className="flex flex-col py-2 px-2.5 w-44 shrink-0 gap-2.5">
      <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">HOT</p>
      {articles.map((hot) => (
        <div key={hot.rank} className="flex gap-1.5 items-start">
          <span className="text-base font-bold text-primary leading-none w-3 shrink-0">
            {hot.rank}
          </span>
          <div className="flex flex-col gap-1 min-w-0">
            {hot.thumbUrl && (
              <img
                src={hot.thumbUrl}
                alt=""
                className="w-full h-14 object-cover rounded-sm"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <a
              href={hot.url ?? '#'}
              className="text-xs text-text-primary leading-tight hover:underline line-clamp-2"
            >
              {hot.title}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
