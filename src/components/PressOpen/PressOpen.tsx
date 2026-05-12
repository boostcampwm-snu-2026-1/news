import { useEffect, useMemo, useState } from "react";
import { articlesByCategory } from "../../data/articles";
import { categoryKeys, categoryLabels } from "../../data/categories";
import { presses } from "../../data/presses";
import type { CategoryKey, Press } from "../../types/newsstand";
import { PressWordmark } from "../PressWordmark/PressWordmark";
import styles from "./PressOpen.module.css";

type PressOpenProps = {
  press: Press;
  subscribedIds: Set<string>;
  onBack: () => void;
  onSubscribe: (pressId: string) => void;
  onUnsubscribe: (pressId: string) => void;
};

export function PressOpen({ press, subscribedIds, onBack, onSubscribe, onUnsubscribe }: PressOpenProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey>(press.primaryCategoryKey);
  const articles = useMemo(() => articlesByCategory[activeCategoryKey], [activeCategoryKey]);
  const primaryArticle = articles[0];
  const displayPress = useMemo(
    () => presses.find((item) => item.id === primaryArticle?.pressId) ?? press,
    [press, primaryArticle?.pressId],
  );
  const isDisplayPressSubscribed = subscribedIds.has(displayPress.id);

  useEffect(() => {
    setActiveCategoryKey(press.primaryCategoryKey);
  }, [press.id, press.primaryCategoryKey]);

  return (
    <article className={styles.open}>
      <div className={styles.fieldTabs}>
        {categoryKeys.map((categoryKey) => (
          <button
            aria-selected={categoryKey === activeCategoryKey}
            key={categoryKey}
            role="tab"
            type="button"
            onClick={() => setActiveCategoryKey(categoryKey)}
          >
            {categoryLabels[categoryKey]}
          </button>
        ))}
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <PressWordmark wordmark={displayPress.wordmark} />
          <span>{primaryArticle?.editedAt ?? "준비 중"}</span>
          <button
            type="button"
            onClick={() => (isDisplayPressSubscribed ? onUnsubscribe(displayPress.id) : onSubscribe(displayPress.id))}
          >
            {isDisplayPressSubscribed ? "− 해지하기" : "+ 구독하기"}
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
