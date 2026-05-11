import { useEffect, useMemo, useRef, useState } from 'react';
import type { Press } from '@/types/press';
import { CATEGORY_ORDER, type CategoryKey } from '@/types/press';
import { PressWordmark } from '@/components/PressWordmark/PressWordmark';
import { SubscribePill } from '@/components/SubscribePill/SubscribePill';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  SHARED_ARTICLES,
  getArticleCount,
  type CategoryArticles,
} from '@/data/articles';
import { FieldTabs } from './FieldTabs';
import { ArticleBody } from './ArticleBody';
import styles from './PressOpen.module.css';

const PROGRESS_DURATION = 6000;
const TICK_MS = 100;

type PressOpenProps = {
  press: Press;
  subscribed: boolean;
  onSubscribe: (id: string) => void;
  onUnsubscribe: (id: string) => void;
  onClose: () => void;
};

/**
 * 오픈 프레스 뷰 (디자인 시스템 §6.10, §11 상태 모델).
 *
 * - 6개 카테고리 field tab + 6초 progress fill
 * - 활성 카테고리의 lead (image+caption) 좌, 기사 6개 리스트 우
 * - currentInTab이 진행되며 list의 해당 항목을 highlight
 * - tab 끝 → 다음 비어있지 않은 카테고리, 모든 카테고리 끝 → 첫 카테고리로 loop
 * - prefers-reduced-motion: 자동 진행 중지 (사용자 클릭으로만 이동)
 */
export function PressOpen({
  press,
  subscribed,
  onSubscribe,
  onUnsubscribe,
  onClose,
}: PressOpenProps) {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<CategoryKey>(press.category);
  const [currentInTab, setCurrentInTab] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const articles = useMemo<CategoryArticles>(
    () => SHARED_ARTICLES[activeTab],
    [activeTab],
  );
  const tabCount = getArticleCount(articles);

  // 카테고리별 article 개수 — auto-advance 시 빈 카테고리 건너뜀에 사용.
  const countByTab = useMemo(() => {
    const map = {} as Record<CategoryKey, number>;
    for (const k of CATEGORY_ORDER) {
      map[k] = getArticleCount(SHARED_ARTICLES[k]);
    }
    return map;
  }, []);

  // press 변경 시 cursor 리셋 (오픈하자마자 그 언론사의 기본 카테고리 0번부터).
  const lastPressIdRef = useRef(press.id);
  useEffect(() => {
    if (lastPressIdRef.current !== press.id) {
      lastPressIdRef.current = press.id;
      setActiveTab(press.category);
      setCurrentInTab(0);
      setElapsed(0);
    }
  }, [press.id, press.category]);

  // 6초 progress tick — reduced motion이면 작동 안 함.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setElapsed((e) => e + TICK_MS);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, activeTab, currentInTab]);

  // elapsed가 PROGRESS_DURATION에 도달하면 cursor advance.
  useEffect(() => {
    if (elapsed < PROGRESS_DURATION) return;
    const nextIdx = currentInTab + 1;
    if (nextIdx < tabCount) {
      setCurrentInTab(nextIdx);
      setElapsed(0);
      return;
    }
    // tab 끝 — 다음 비어있지 않은 카테고리로
    const startIdx = CATEGORY_ORDER.indexOf(activeTab);
    for (let step = 1; step <= CATEGORY_ORDER.length; step++) {
      const cand = CATEGORY_ORDER[(startIdx + step) % CATEGORY_ORDER.length];
      if (countByTab[cand] > 0) {
        setActiveTab(cand);
        setCurrentInTab(0);
        setElapsed(0);
        return;
      }
    }
  }, [elapsed, currentInTab, tabCount, activeTab, countByTab]);

  const progress = Math.min(1, elapsed / PROGRESS_DURATION);

  const handleTabClick = (next: CategoryKey) => {
    setActiveTab(next);
    setCurrentInTab(0);
    setElapsed(0);
  };

  return (
    <div className={styles.frame} role="region" aria-label={`${press.name} 기사 보기`}>
      <div className={styles.headStrip}>
        <div className={styles.headLeft}>
          <PressWordmark name={press.name} style={press.wordmark} />
          <span className={styles.update}>편집 {formatNow()}</span>
        </div>
        <div className={styles.headRight}>
          <SubscribePill
            subscribed={subscribed}
            pressName={press.name}
            onClick={() =>
              subscribed ? onUnsubscribe(press.id) : onSubscribe(press.id)
            }
          />
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      </div>

      <FieldTabs
        active={activeTab}
        currentInTab={currentInTab}
        tabCount={tabCount}
        progress={progress}
        countByTab={countByTab}
        onTabClick={handleTabClick}
      />

      <ArticleBody articles={articles} currentInTab={currentInTab} />
    </div>
  );
}

function formatNow(): string {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm} 기준`;
}
