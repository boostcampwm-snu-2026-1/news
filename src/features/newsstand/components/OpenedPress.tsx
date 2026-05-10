import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import { PressWordmark } from "./PressWordmark";
import { categoryLabels, categoryOrder } from "../data/categories";
import type { Press, PressCategory } from "../types";

type OpenedPressProps = {
  press: Press;
  isSubscribed: boolean;
  onToggleSubscribe: (pressId: string) => void;
  onClose: () => void;
};

export function OpenedPress({ press, isSubscribed, onToggleSubscribe, onClose }: OpenedPressProps) {
  const [activeCategory, setActiveCategory] = useState<PressCategory>(press.primaryCategory);

  useEffect(() => {
    setActiveCategory(press.primaryCategory);
  }, [press.id, press.primaryCategory]);

  const articles = press.articles.filter((article) => article.category === activeCategory);

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
          return (
            <button
              key={category}
              className={`field-tab${isActive ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          );
        })}
      </div>

      <ol className="opened-press-articles">
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="opened-press-article">
              {article.title}
            </li>
          ))
        ) : (
          <li className="opened-press-empty">선택한 카테고리의 기사가 없습니다.</li>
        )}
      </ol>
    </article>
  );
}
