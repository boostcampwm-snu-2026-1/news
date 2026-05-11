import type { CategoryKey, Press, PressId } from "./types";
import { CATEGORY_ORDER } from "./types";

export const PER_PAGE = 24;

/**
 * Visible press list for the current tab.
 * - "all": full press array as-is.
 * - "sub": subscribed ids resolved to Press, preserving subscription order,
 *         dropping ids that don't exist in `allPress`.
 */
export function getVisible(
  allPress: Press[],
  tab: "all" | "sub",
  subscribed: PressId[],
): Press[] {
  if (tab === "all") return allPress;
  const byId = new Map(allPress.map((p) => [p.id, p]));
  return subscribed
    .map((id) => byId.get(id))
    .filter((p): p is Press => p !== undefined);
}

export function getLastPage(visibleLength: number): number {
  return Math.max(0, Math.ceil(visibleLength / PER_PAGE) - 1);
}

export function getSafePage(page: number, lastPage: number): number {
  return Math.min(Math.max(0, page), lastPage);
}

export function getPageItems(visible: Press[], safePage: number): Press[] {
  return visible.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);
}

export function getCatOutlets(visible: Press[], tabKey: CategoryKey): Press[] {
  return visible.filter((p) => p.primaryCategory === tabKey);
}

export function getCurIdxInCat(
  catOutlets: Press[],
  opened: PressId | null,
): number {
  if (opened === null) return -1;
  return catOutlets.findIndex((p) => p.id === opened);
}

export function getCurrentInTab(curIdxInCat: number): number {
  return curIdxInCat >= 0 ? curIdxInCat + 1 : 1;
}

export function getCount(catOutlets: Press[]): number {
  return Math.max(1, catOutlets.length);
}

/**
 * Next category in CATEGORY_ORDER (wrapping) whose `visible` outlets list is
 * non-empty, starting strictly after `from`. null if no category in `visible`
 * has any outlets.
 */
export function findNextCategoryWithOutlets(
  visible: Press[],
  from: CategoryKey,
): CategoryKey | null {
  const idx = CATEGORY_ORDER.indexOf(from);
  for (let i = 1; i <= CATEGORY_ORDER.length; i++) {
    const next = CATEGORY_ORDER[(idx + i) % CATEGORY_ORDER.length];
    if (visible.some((p) => p.primaryCategory === next)) return next;
  }
  return null;
}
