import { useState } from 'react';
import type { Publisher, FrontPage } from '../../types';

interface FrontPagePanelProps {
  publisher: Publisher;
  frontPage: FrontPage;
  isActive: boolean;
}

function formatEditedAt(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `편집 ${hh}:${mm}`;
}

export function FrontPagePanel({ publisher, frontPage }: FrontPagePanelProps) {
  const [logoError, setLogoError] = useState(false);
  const { mainArticle, subArticles, hotArticles, featureBox } = frontPage;

  return (
    <div
      className="bg-surface flex flex-col rounded-sm overflow-hidden"
      style={{ height: 416 }}
    >
      {/* 헤더 — 2행: 로고+편집시각 / 버튼 */}
      <div className="flex flex-col px-3 pt-2.5 pb-2 border-b border-border shrink-0 gap-1.5">
        <div className="flex items-center justify-between">
          {logoError ? (
            <span className="font-bold text-base text-text-primary">{publisher.name}</span>
          ) : (
            <img
              src={publisher.logoUrl}
              alt={publisher.name}
              className="h-8 object-contain"
              onError={() => setLogoError(true)}
            />
          )}
          <span className="text-xs text-text-secondary tabular-nums">
            {formatEditedAt(frontPage.editedAt)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {['구독하기', '이용자 한마디', '공유'].map((label) => (
            <button
              key={label}
              className="text-xs text-text-secondary border border-border rounded px-1.5 py-0.5 hover:border-text-secondary transition-colors duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 바디: 3-컬럼 */}
      <div className="flex flex-1 min-h-0 divide-x divide-border">

        {/* 좌측 — subArticles 리스트 */}
        <div className="flex flex-col py-2 px-2.5 w-44 shrink-0">
          <ul className="flex flex-col gap-1.5">
            {subArticles.slice(0, 6).map((art) => (
              <li key={art.id}>
                <a
                  href={art.url ?? '#'}
                  className="text-xs text-text-primary leading-tight hover:underline line-clamp-2 block"
                >
                  {art.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 중앙 — 메인 기사 */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative bg-border shrink-0" style={{ height: 160 }}>
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
          <div className="flex flex-col gap-1 px-2.5 py-2 flex-1 min-h-0 overflow-hidden">
            <p className="text-sm font-bold text-text-primary leading-snug line-clamp-2">
              {mainArticle.title}
            </p>
            {mainArticle.lead && (
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {mainArticle.lead}
              </p>
            )}
            {featureBox && (
              <div className="mt-auto pt-1.5 border-t border-border">
                <p className="text-xs font-bold text-text-primary line-clamp-1">{featureBox.name}</p>
                {featureBox.subtitle && (
                  <p className="text-xs text-text-secondary">{featureBox.subtitle}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 우측 — HOT 뉴스 1·2·3 */}
        <div className="flex flex-col py-2 px-2.5 w-44 shrink-0 gap-2">
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">HOT</p>
          {hotArticles.map((hot) => (
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
                  href="#"
                  className="text-xs text-text-primary leading-tight hover:underline line-clamp-2"
                >
                  {hot.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className="shrink-0 border-t border-border px-3 py-1.5">
        <a
          href={publisher.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
        >
          {publisher.name} 사이트 바로가기 →
        </a>
      </div>
    </div>
  );
}
