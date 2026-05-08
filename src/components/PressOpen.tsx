import { useState, useEffect, useRef, useCallback } from 'react';
import type { PressOutlet, Category } from '../data/press';
import { CATEGORIES, mockArticles } from '../data/press';
import PressWordmark from './PressWordmark';
import SubscribePill from './SubscribePill';
import FieldTab from './FieldTab';
import './PressOpen.css';

const PROGRESS_DURATION = 6000;
const TICK_INTERVAL = 100;

interface PressOpenProps {
  press: PressOutlet;
  isSubscribed: boolean;
  onToggle: (id: number) => void;
}

function PressOpen({ press, isSubscribed, onToggle }: PressOpenProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [currentArticle, setCurrentArticle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
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

  const totalArticlesRef = useRef(totalArticles);
  totalArticlesRef.current = totalArticles;

  useEffect(() => {
    if (reducedMotion.current || paused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / PROGRESS_DURATION) * 100;
        if (next >= 100) {
          const total = totalArticlesRef.current;
          setCurrentArticle((cur) => {
            const nextArticle = cur + 1;
            if (nextArticle >= total) {
              setActiveCategory((prevCat) => {
                const idx = CATEGORIES.indexOf(prevCat);
                return CATEGORIES[(idx + 1) % CATEGORIES.length];
              });
              return 0;
            }
            return nextArticle;
          });
          progressKeyRef.current += 1;
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="press-open"
      role="tabpanel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
