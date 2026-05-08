import { useState, useEffect, useRef, useCallback } from 'react';
import type { PressOutlet, Category } from '../data/press';
import { CATEGORIES, mockArticles } from '../data/press';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import FieldTab from './FieldTab';
import './PressOpen.css';

const PROGRESS_DURATION = 6000;
const TICK_INTERVAL = 100;
const PROGRESS_INCREMENT = (TICK_INTERVAL / PROGRESS_DURATION) * 100;

interface PressOpenProps {
  press: PressOutlet;
  isSubscribed: boolean;
  onToggle: (id: number) => void;
}

function PressOpen({ press, isSubscribed, onToggle }: PressOpenProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [currentArticle, setCurrentArticle] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const progressKeyRef = useRef(0);

  const article = mockArticles[press.name];
  const headline = article?.headline ?? '기사 제목이 없습니다';
  const articles = article?.articles ?? [];
  const editTime = article?.editTime ?? '';
  const totalArticles = articles.length || 1;

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const resetProgress = useCallback(() => {
    setProgress(0);
    progressKeyRef.current += 1;
  }, []);

  const handleCategorySelect = useCallback((cat: Category) => {
    setActiveCategory(cat);
    setCurrentArticle(0);
    resetProgress();
  }, [resetProgress]);

  // All mutable state for the timer lives in refs to avoid
  // StrictMode double-invocation of setState updaters.
  const progressRef = useRef(0);
  const currentArticleRef = useRef(0);
  const activeCategoryRef = useRef<Category>(CATEGORIES[0]);
  const totalArticlesRef = useRef(totalArticles);
  totalArticlesRef.current = totalArticles;

  // Sync refs when user manually selects a category
  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);
  useEffect(() => {
    currentArticleRef.current = currentArticle;
  }, [currentArticle]);

  useEffect(() => {
    if (reducedMotion.current) return;

    const timer = setInterval(() => {
      if (pausedRef.current) return;

      const nextProgress = progressRef.current + PROGRESS_INCREMENT;

      if (nextProgress >= 100) {
        progressRef.current = 0;
        const total = totalArticlesRef.current;
        const nextArticle = currentArticleRef.current + 1;

        if (nextArticle >= total) {
          // Advance to next category
          const idx = CATEGORIES.indexOf(activeCategoryRef.current);
          const nextCat = CATEGORIES[(idx + 1) % CATEGORIES.length];
          activeCategoryRef.current = nextCat;
          currentArticleRef.current = 0;
          progressKeyRef.current += 1;

          setActiveCategory(nextCat);
          setCurrentArticle(0);
          setProgress(0);
        } else {
          // Advance to next article
          currentArticleRef.current = nextArticle;
          progressKeyRef.current += 1;

          setCurrentArticle(nextArticle);
          setProgress(0);
        }
      } else {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="press-open"
      role="tabpanel"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
    >
      {/* Head row */}
      <div className="press-open__head">
        <PressWordmark name={press.name} style={press.wordmark} scale={1.05} />
        {editTime && (
          <span className="press-open__edit-time">{editTime}</span>
        )}
        <div className="press-open__head-pill">
          <SubscribePill
            subscribed={isSubscribed}
            onClick={() => onToggle(press.id)}
          />
        </div>
      </div>

      {/* Tab row: field tabs + counter */}
      <div className="press-open__tab-row">
        <div className="press-open__tab-strip">
          <FieldTab
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
            progress={progress}
            progressKey={`${activeCategory}-${progressKeyRef.current}`}
          />
        </div>
        <div className="press-open__counter">
          <span className="press-open__counter-current">{currentArticle + 1}</span>
          <span className="press-open__counter-slash"> / </span>
          <span className="press-open__counter-total">{totalArticles}</span>
        </div>
      </div>

      {/* Article body */}
      <div className="press-open__body">
        <div className="press-open__left">
          <div className="press-open__hero-img" aria-label="헤드라인 이미지" />
          <p className="press-open__hero-title">{headline}</p>
        </div>
        <div className="press-open__right">
          <ul className="press-open__articles">
            {articles.map((title, i) => (
              <li key={i} className="press-open__article-item">
                <span className="press-open__bullet" aria-hidden="true" />
                <span>{title}</span>
              </li>
            ))}
          </ul>
          {editTime && (
            <p className="press-open__footnote">
              {press.name} 언론사에서 직접 편집한 뉴스입니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PressOpen;
