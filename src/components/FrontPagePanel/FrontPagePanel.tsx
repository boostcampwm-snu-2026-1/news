import type { Publisher, FrontPage } from '../../types';
import { FrontPageHeader } from './FrontPageHeader';
import { HotList } from './HotList';

interface FrontPagePanelProps {
  publisher: Publisher;
  frontPage: FrontPage;
  isActive: boolean;
  isSubscribed: boolean;
  onToggleSubscribe: (id: string) => void;
}

export function FrontPagePanel({ publisher, frontPage, isSubscribed, onToggleSubscribe }: FrontPagePanelProps) {
  const { mainArticle, subArticles, hotArticles } = frontPage;

  return (
    <div
      className="bg-surface flex flex-col rounded-sm overflow-hidden"
      style={{ height: 450 }}
    >
      <FrontPageHeader
        publisher={publisher}
        editedAt={frontPage.editedAt}
        isSubscribed={isSubscribed}
        onToggleSubscribe={onToggleSubscribe}
      />

      {/* 바디: 좌(메인+서브) | 우(HOT) */}
      <div className="flex flex-1 min-h-0 divide-x divide-border">

        {/* 좌측 — 메인 기사 + 서브 기사 리스트 */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative bg-border shrink-0" style={{ height: 200 }}>
            {mainArticle.imageUrl ? (
              <img
                src={mainArticle.imageUrl}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-border flex items-center justify-center">
                <span className="text-xs text-text-secondary">{publisher.name}</span>
              </div>
            )}
          </div>

          <div className="px-3 pt-2 pb-1.5 shrink-0">
            <p className="text-sm font-bold text-text-primary leading-snug line-clamp-2">
              {mainArticle.title}
            </p>
            {mainArticle.lead && (
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mt-0.5">
                {mainArticle.lead}
              </p>
            )}
          </div>

          <div className="border-t border-border mx-3 shrink-0" />

          <ul className="flex flex-col flex-1 min-h-0 overflow-hidden px-3 py-1.5 gap-1">
            {subArticles.slice(0, 5).map((art) => (
              <li key={art.id} className="flex items-start gap-1.5">
                <span className="text-text-secondary text-xs mt-px shrink-0">•</span>
                <a
                  href={art.url ?? '#'}
                  className="text-xs text-text-primary leading-tight hover:underline line-clamp-1"
                >
                  {art.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <HotList articles={hotArticles} />
      </div>

      {/* 푸터 */}
      <div className="shrink-0 border-t border-border px-3 py-1 flex justify-end">
        <a
          href={publisher.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-text-secondary hover:text-text-primary transition-colors duration-150"
        >
          {publisher.name} 사이트 바로가기 →
        </a>
      </div>
    </div>
  );
}
