import { useEffect, useMemo, useState } from "react";
import { articlesByCategory } from "../../data/articles";
import { categoryKeys, categoryLabels } from "../../data/categories";
import { presses } from "../../data/presses";
import type { Article, CategoryKey, Press } from "../../types/newsstand";
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
  const [currentArticle, setCurrentArticle] = useState<Article | null>(articles[0] ?? null);
  const displayPress = useMemo(
    () => presses.find((item) => item.id === currentArticle?.pressId) ?? press,
    [press, currentArticle?.pressId],
  );
  const isDisplayPressSubscribed = subscribedIds.has(displayPress.id);

  useEffect(() => {
    setActiveCategoryKey(press.primaryCategoryKey);
  }, [press.id, press.primaryCategoryKey]);

  useEffect(() => {
    setCurrentArticle(articles[0] ?? null);
  }, [articles]);

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
          <span>{currentArticle?.editedAt ?? "준비 중"}</span>
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
            <h2>{currentArticle?.title ?? "등록된 기사가 없습니다."}</h2>
          </section>
          <ul className={styles.list}>
            {currentArticle ? (
              currentArticle.content.map((paragraph) => <li key={paragraph}>{paragraph}</li>)
            ) : (
              <li>표시할 기사 내용이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
}
