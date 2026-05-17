import {
  CATEGORY_ORDER,
  type ActiveTab,
  type CategoryKey,
  type Press
} from "../data/newsstand";

export const GRID_PAGE_SIZE = 24;

export interface OpenSequenceState {
  categoryKey: CategoryKey;
  currentInTab: number;
}

export function getFilteredPresses(
  presses: Press[],
  activeTab: ActiveTab,
  subscribedIds: Set<string>
): Press[] {
  if (activeTab === "all") {
    return presses;
  }

  return presses.filter((press) => subscribedIds.has(press.id));
}

export function getPageCount(
  presses: Press[],
  activeTab: ActiveTab,
  subscribedIds: Set<string>
): number {
  const visiblePresses = getFilteredPresses(presses, activeTab, subscribedIds);
  return Math.max(1, Math.ceil(visiblePresses.length / GRID_PAGE_SIZE));
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(page, 0), Math.max(totalPages - 1, 0));
}

export function getGridPageCells(
  presses: Press[],
  activeTab: ActiveTab,
  subscribedIds: Set<string>,
  page: number
): Array<Press | null> {
  const visiblePresses = getFilteredPresses(presses, activeTab, subscribedIds);
  const safePage = clampPage(page, getPageCount(presses, activeTab, subscribedIds));
  const start = safePage * GRID_PAGE_SIZE;
  const slice = visiblePresses.slice(start, start + GRID_PAGE_SIZE);
  const blanks = Array.from({ length: GRID_PAGE_SIZE - slice.length }, () => null);
  return [...slice, ...blanks];
}

export function getFallbackPress(cells: Array<Press | null>): Press | null {
  return cells.find((cell): cell is Press => cell !== null) ?? null;
}

export function advanceOpenProgress(
  press: Press,
  state: OpenSequenceState
): OpenSequenceState {
  const currentArticles = press.categories[state.categoryKey].articles;

  if (state.currentInTab + 1 < currentArticles.length) {
    return {
      categoryKey: state.categoryKey,
      currentInTab: state.currentInTab + 1
    };
  }

  const categoryKeys = CATEGORY_ORDER.map((category) => category.key);
  const categoryIndex = categoryKeys.indexOf(state.categoryKey);
  const nextCategoryKey = categoryKeys[(categoryIndex + 1) % categoryKeys.length];

  return {
    categoryKey: nextCategoryKey,
    currentInTab: 0
  };
}
