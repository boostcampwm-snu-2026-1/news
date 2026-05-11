/**
 * 오픈 프레스 자동 진행 시퀀스 (디자인 시스템 §11 상태 모델).
 *
 * 6개 field tab × 각 N개 article. 매 6초마다:
 *   - tab 안에서 다음 article (currentInTab + 1)
 *   - tab의 article 다 보면 다음 tab의 0번
 *   - 모든 tab 다 돌면 첫 tab의 0번으로 (loop)
 *
 * 사용자가 탭/언론사 클릭으로 점프해도 동일 함수로 다음 step을 산출한다.
 */

import { CATEGORY_ORDER, type CategoryKey } from '@/types/press';

export type ArticleCursor = {
  tab: CategoryKey;
  index: number; // 0-based article index within tab
};

export function nextCursor(
  cur: ArticleCursor,
  countByTab: Record<CategoryKey, number>,
): ArticleCursor {
  const tabSize = countByTab[cur.tab] ?? 0;
  if (cur.index + 1 < tabSize) {
    return { tab: cur.tab, index: cur.index + 1 };
  }

  // tab 끝 → 다음 비어있지 않은 탭의 0번
  const startIdx = CATEGORY_ORDER.indexOf(cur.tab);
  for (let step = 1; step <= CATEGORY_ORDER.length; step++) {
    const candidate = CATEGORY_ORDER[(startIdx + step) % CATEGORY_ORDER.length];
    if ((countByTab[candidate] ?? 0) > 0) {
      return { tab: candidate, index: 0 };
    }
  }
  // 어떤 탭에도 article 없음 — cursor 유지
  return cur;
}

/** 사용자가 다른 탭 클릭 시 그 탭의 첫 번째 article로 이동. */
export function jumpToTab(tab: CategoryKey): ArticleCursor {
  return { tab, index: 0 };
}

/**
 * progress 변환: 시작 시각과 duration을 받아 0..1 ratio.
 * setInterval 콜백에서 매번 호출. 1.0 도달 시 nextCursor로 advance.
 */
export function progressRatio(
  elapsedMs: number,
  durationMs: number,
): number {
  if (elapsedMs <= 0) return 0;
  if (elapsedMs >= durationMs) return 1;
  return elapsedMs / durationMs;
}
