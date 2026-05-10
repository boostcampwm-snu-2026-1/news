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

export function FrontPagePanel({ publisher, frontPage, isActive }: FrontPagePanelProps) {
  const { mainArticle, subArticles, hotArticles, featureBox } = frontPage;

  return (
    <div
      className="bg-surface flex flex-col rounded-sm overflow-hidden"
      style={{ height: 416 }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={publisher.logoUrl}
            alt={publisher.name}
            className="h-6 object-contain"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              const span = document.createElement('span');
              span.textContent = publisher.name;
              span.className = 'font-bold text-sm text-text-primary';
              img.parentNode?.insertBefore(span, img);
            }}
          />
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
        <span className="text-xs text-text-secondary tabular-nums">
          {formatEditedAt(frontPage.editedAt)}
        </span>
      </div>

      {/* 바디: 3-컬럼 */}
      <div className="flex flex-1 min-h-0 divide-x divide-border">

        {/* 좌측 — subArticles 리스트 */}
        <div className="flex flex-col justify-between py-2 px-2.5 w-44 shrink-0">
          <ul className="flex flex-col gap-1.5">
            {subArticles.slice(0, 6).map((art) => (
              <li key={art.id}>
                <a
                  href={art.url ?? '#'}
                  className="text-xs text-text-primary leading-tight hover:underline line-clamp-2"
                >
                  {art.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 중앙 — 메인 기사 (+ featureBox 있으면 하단) */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* 메인 이미지 */}
          <div className="relative bg-border shrink-0" style={{ height: 176 }}>
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
          {/* 헤드라인 + 리드 */}
          <div className="flex flex-col gap-1 px-2.5 py-2 flex-1 min-h-0 overflow-hidden">
            <p className={`font-bold leading-snug line-clamp-2 ${isActive ? 'text-sm text-text-primary' : 'text-xs text-text-secondary'}`}>
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
                    className="w-full h-16 object-cover rounded-sm"
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
