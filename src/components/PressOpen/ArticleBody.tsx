import type { CategoryArticles } from '@/data/articles';
import styles from './ArticleBody.module.css';

type ArticleBodyProps = {
  articles: CategoryArticles;
  /** 0 = lead, 1..6 = list[i-1]가 현재 reading */
  currentInTab: number;
};

/**
 * 기사 본문 (디자인 시스템 §6.10 List view).
 *  - 좌: lead image + caption + 큰 헤드라인 (이미지 swatch는 CSS gradient — 오프라인 보장)
 *  - 우: 6개 article 목록 (14/500, gap 12, currentInTab 항목 강조)
 */
export function ArticleBody({ articles, currentInTab }: ArticleBodyProps) {
  return (
    <div className={styles.body}>
      <div className={styles.lead}>
        <div
          className={styles.swatch}
          style={{ background: articles.lead.swatch }}
          role="img"
          aria-label={articles.lead.caption}
        />
        <div className={styles.leadText}>
          <p className={styles.caption}>{articles.lead.caption}</p>
          <h3
            className={`${styles.leadTitle} ${currentInTab === 0 ? styles.leadActive : ''}`}
          >
            {articles.lead.title}
          </h3>
        </div>
      </div>

      <ol className={styles.list} aria-label="기사 목록">
        {articles.list.map((a, i) => {
          const isCurrent = currentInTab === i + 1;
          return (
            <li
              key={i}
              className={`${styles.item} ${isCurrent ? styles.itemActive : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              {a.title}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
