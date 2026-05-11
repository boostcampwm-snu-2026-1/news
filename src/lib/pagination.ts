/**
 * 페이지 분할 로직 — All/Sub 두 탭의 셀 24개 슬라이스.
 * Sub 탭은 sparse하지 않다 (구독 언론사들로 빽빽하게 채워 페이지 수를 동적으로 산출).
 */

import type { Press } from '@/types/press';

export const CELLS_PER_PAGE = 24;

export type Tab = 'all' | 'sub';

export function getPageCount(tab: Tab, allCount: number, subCount: number): number {
  const total = tab === 'all' ? allCount : subCount;
  if (total <= 0) return 1;
  return Math.ceil(total / CELLS_PER_PAGE);
}

export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  if (page < 0) return 0;
  if (page >= pageCount) return pageCount - 1;
  return page;
}

export function getPageItems(items: Press[], page: number): Press[] {
  const start = page * CELLS_PER_PAGE;
  return items.slice(start, start + CELLS_PER_PAGE);
}

/** Sub 탭용 — 구독 Set의 멤버를 PRESSES 정의 순서대로 정렬. */
export function getSubscribedPresses(
  all: Press[],
  subscribed: ReadonlySet<string>,
): Press[] {
  return all.filter((p) => subscribed.has(p.id));
}
