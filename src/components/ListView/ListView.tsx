import { useCallback } from 'react';
import { useNewsstand } from '../../context/NewsstandContext';
import { getOutletsByCategory } from '../../data/outlets';
import { getArticleByOutletId } from '../../data/articles';
import type { Outlet, Article, Category } from '../../types';
import { useProgressTimer } from '../../hooks/useProgressTimer';
import CategoryTabBar from './CategoryTabBar';
import ArticleCard from './ArticleCard';
import ListChevron from './ListChevron';
import styles from './ListView.module.css';

export default function ListView() {
  const {
    activeCategory, setActiveCategory,
    currentOutletIndex, setCurrentOutletIndex,
    subscribed, toggleSubscription,
  } = useNewsstand();

  const outletArticles = getOutletsByCategory(activeCategory)
    .map(o => ({ outlet: o, article: getArticleByOutletId(o.id) }))
    .filter((x): x is { outlet: Outlet; article: Article } => x.article !== undefined);

  const safeIndex = outletArticles.length > 0
    ? currentOutletIndex % outletArticles.length
    : 0;

  const handleComplete = useCallback(() => {
    if (outletArticles.length > 0) {
      setCurrentOutletIndex((safeIndex + 1) % outletArticles.length);
    }
  }, [safeIndex, outletArticles.length, setCurrentOutletIndex]);

  const { progress, reset } = useProgressTimer(outletArticles.length > 0, 6000, handleComplete);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentOutletIndex(0);
    reset();
  };

  const handlePrev = () => {
    if (outletArticles.length === 0) return;
    setCurrentOutletIndex((safeIndex - 1 + outletArticles.length) % outletArticles.length);
    reset();
  };

  const handleNext = () => {
    if (outletArticles.length === 0) return;
    setCurrentOutletIndex((safeIndex + 1) % outletArticles.length);
    reset();
  };

  const current = outletArticles[safeIndex];

  return (
    <div className={styles.wrapper}>
      <CategoryTabBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        progress={progress}
        currentIndex={outletArticles.length > 0 ? safeIndex + 1 : 0}
        total={outletArticles.length}
      />
      <div className={styles.content}>
        <ListChevron direction="left" disabled={outletArticles.length <= 1} onClick={handlePrev} />
        {current ? (
          <ArticleCard
            outlet={current.outlet}
            article={current.article}
            isSubscribed={subscribed.has(current.outlet.id)}
            onToggleSubscription={() => toggleSubscription(current.outlet.id)}
          />
        ) : (
          <div className={styles.empty}>이 카테고리에 기사가 없습니다.</div>
        )}
        <ListChevron direction="right" disabled={outletArticles.length <= 1} onClick={handleNext} />
      </div>
    </div>
  );
}
