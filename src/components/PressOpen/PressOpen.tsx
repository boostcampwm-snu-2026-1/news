import { useEffect, useMemo, useState } from "react";
import { articlesByCategory } from "../../data/articles";
import { categoryKeys, categoryLabels } from "../../data/categories";
import { presses } from "../../data/presses";
import type { CategoryKey, Press } from "../../types/newsstand";
import { Chevron } from "../shared/Chevron";
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
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const articles = useMemo(() => articlesByCategory[activeCategoryKey], [activeCategoryKey]);
  const currentArticle = articles[currentArticleIndex] ?? null;
  const activeCategoryIndex = categoryKeys.indexOf(activeCategoryKey);
  const previousCategoryKey = useMemo(() => {
    for (let index = activeCategoryIndex - 1; index >= 0; index -= 1) {
      const categoryKey = categoryKeys[index];

      if (articlesByCategory[categoryKey].length > 0) {
        return categoryKey;
      }
    }

    return null;
  }, [activeCategoryIndex]);
  const nextCategoryKey = useMemo(() => {
    for (let index = activeCategoryIndex + 1; index < categoryKeys.length; index += 1) {
      const categoryKey = categoryKeys[index];

      if (articlesByCategory[categoryKey].length > 0) {
        return categoryKey;
      }
    }

    return null;
  }, [activeCategoryIndex]);
  const displayPress = useMemo(
    () => presses.find((item) => item.id === currentArticle?.pressId) ?? press,
    [press, currentArticle?.pressId],
  );
  const isDisplayPressSubscribed = subscribedIds.has(displayPress.id);
  const canGoPrevious = currentArticleIndex > 0 || previousCategoryKey !== null;
  const canGoNext = currentArticleIndex < articles.length - 1 || nextCategoryKey !== null;

  useEffect(() => {
    setActiveCategoryKey(press.primaryCategoryKey);
    setCurrentArticleIndex(0);
  }, [press.id, press.primaryCategoryKey]);

  function handleCategoryChange(categoryKey: CategoryKey) {
    setActiveCategoryKey(categoryKey);
    setCurrentArticleIndex(0);
  }

  function goPreviousArticle() {
    if (currentArticleIndex > 0) {
      setCurrentArticleIndex((index) => index - 1);
      return;
    }

    if (previousCategoryKey) {
      const previousArticles = articlesByCategory[previousCategoryKey];
      setActiveCategoryKey(previousCategoryKey);
      setCurrentArticleIndex(previousArticles.length - 1);
    }
  }

  function goNextArticle() {
    if (currentArticleIndex < articles.length - 1) {
      setCurrentArticleIndex((index) => index + 1);
      return;
    }

    if (nextCategoryKey) {
      setActiveCategoryKey(nextCategoryKey);
      setCurrentArticleIndex(0);
    }
  }

  return (
    <>
      <article className={styles.open}>
        <div className={styles.fieldTabs}>
          {categoryKeys.map((categoryKey) => (
            <button
              aria-selected={categoryKey === activeCategoryKey}
              key={categoryKey}
              role="tab"
              type="button"
              onClick={() => handleCategoryChange(categoryKey)}
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
      <Chevron dir="left" disabled={!canGoPrevious} onClick={goPreviousArticle} />
      <Chevron dir="right" disabled={!canGoNext} onClick={goNextArticle} />
    </>
  );
}
