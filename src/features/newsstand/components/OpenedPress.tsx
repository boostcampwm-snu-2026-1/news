import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import { PressWordmark } from "./PressWordmark";
import { categoryLabels, categoryOrder } from "../data/categories";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import type { Press, PressCategory } from "../types";

const TICK_MS = 6000;

type OpenedPressProps = {
  press: Press;
  isSubscribed: boolean;
  onToggleSubscribe: (pressId: string) => void;
  onClose: () => void;
};

export function OpenedPress({ press, isSubscribed, onToggleSubscribe, onClose }: OpenedPressProps) {
  const [activeCategory, setActiveCategory] = useState<PressCategory>(press.primaryCategory);
  const [currentInTab, setCurrentInTab] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setActiveCategory(press.primaryCategory);
    setCurrentInTab(0);
  }, [press.id, press.primaryCategory]);

  const totalInTab = press.categoryStats.find((stat) => stat.key === activeCategory)?.count ?? 0;

  useEffect(() => {
    if (prefersReducedMotion || totalInTab === 0) return;

    const timer = window.setTimeout(() => {
      if (currentInTab + 1 >= totalInTab) {
        const idx = categoryOrder.indexOf(activeCategory);
        const nextCategory = categoryOrder[(idx + 1) % categoryOrder.length];
        setActiveCategory(nextCategory);
        setCurrentInTab(0);
      } else {
        setCurrentInTab((prev) => prev + 1);
      }
    }, TICK_MS);

    return () => window.clearTimeout(timer);
  }, [activeCategory, currentInTab, totalInTab, prefersReducedMotion]);

  const handleCategoryClick = (category: PressCategory) => {
    setActiveCategory(category);
    setCurrentInTab(0);
  };

  const lead = press.articles[0];
  const listItems = press.articles.slice(0, 6);

  return (
    <article className="opened-press" aria-label={`${press.name} 기사 목록`}>
      <header className="opened-press-head">
        <div className="opened-press-brand">
          <PressWordmark press={press} />
          <span className="opened-press-edit">{press.editTime}</span>
        </div>
        <div className="opened-press-actions">
          <button
            className="opened-press-subscribe"
            type="button"
            onClick={() => onToggleSubscribe(press.id)}
          >
            {isSubscribed ? <Minus size={12} strokeWidth={1.3} /> : <Plus size={12} strokeWidth={1.3} />}
            {isSubscribed ? "해지하기" : "구독하기"}
          </button>
          <button
            className="opened-press-close"
            type="button"
            aria-label="닫기"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="opened-press-tabs" role="tablist" aria-label="카테고리">
        {categoryOrder.map((category) => {
          const isActive = category === activeCategory;
          const stat = press.categoryStats.find((entry) => entry.key === category);
          return (
            <button
              key={category}
              className={`field-tab${isActive ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryClick(category)}
            >
              {isActive && (
                <span
                  key={`${category}-${currentInTab}`}
                  className="field-tab-progress"
                  aria-hidden="true"
                  style={{ animationDuration: `${TICK_MS}ms` }}
                />
              )}
              <span className="field-tab-label">{categoryLabels[category]}</span>
              {isActive && stat && (
                <span className="field-tab-count" aria-live="polite">
                  {currentInTab + 1} / {stat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="opened-press-body">
        <div className="opened-press-headline">
          <div className="opened-press-image" aria-hidden="true" />
          {lead && <p className="opened-press-headline-title">{lead.title}</p>}
        </div>
        <ol className="opened-press-articles">
          {listItems.map((article, index) => (
            <li key={article.id} className="opened-press-article">
              <span className="opened-press-article-number">{index + 1}</span>
              <span className="opened-press-article-title">{article.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="opened-press-footnote">기사는 언론사가 직접 편집한 콘텐츠로 제공됩니다.</p>
    </article>
  );
}
