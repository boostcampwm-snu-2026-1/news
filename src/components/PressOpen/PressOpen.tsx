import { categoryLabels } from "../../data/categories";
import type { Article, CategoryKey, Press } from "../../types/newsstand";
import { PressWordmark } from "../PressWordmark/PressWordmark";
import styles from "./PressOpen.module.css";

type PressOpenProps = {
  activeCategoryKey: CategoryKey;
  articles: Article[];
  isSubscribed: boolean;
  press: Press;
  onBack: () => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
};

export function PressOpen({ activeCategoryKey, articles, isSubscribed, press, onBack, onSubscribe, onUnsubscribe }: PressOpenProps) {
  const primaryArticle = articles[0];

  return (
    <article className={styles.open}>
      <div className={styles.fieldTabs}>
        {press.categoryKeys.map((categoryKey) => (
          <button aria-selected={categoryKey === activeCategoryKey} key={categoryKey} role="tab" type="button">
            {categoryLabels[categoryKey]}
          </button>
        ))}
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <PressWordmark wordmark={press.wordmark} />
          <span>{primaryArticle?.editedAt ?? "준비 중"}</span>
          <button type="button" onClick={isSubscribed ? onUnsubscribe : onSubscribe}>
            {isSubscribed ? "− 해지하기" : "+ 구독하기"}
          </button>
          <button type="button" onClick={onBack}>
            돌아가기
          </button>
        </header>
        <div className={styles.columns}>
          <section className={styles.lead}>
            <div className={styles.imageBox} aria-hidden="true" />
            <h2>{primaryArticle?.title ?? "등록된 기사가 없습니다."}</h2>
          </section>
          <ul className={styles.list}>
            {articles.map((article) => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
