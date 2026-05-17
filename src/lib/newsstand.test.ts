import { describe, expect, it } from "vitest";
import {
  CATEGORY_ORDER,
  INITIAL_SUBSCRIBED_IDS,
  PRESS_LIST
} from "../data/newsstand";
import {
  GRID_PAGE_SIZE,
  advanceOpenProgress,
  getGridPageCells,
  getPageCount
} from "./newsstand";

describe("newsstand utilities", () => {
  it("keeps three pages for the full outlet grid", () => {
    const pageCount = getPageCount(PRESS_LIST, "all", new Set(INITIAL_SUBSCRIBED_IDS));
    expect(pageCount).toBe(3);
  });

  it("pads subscribed pages up to 24 cells", () => {
    const subscribedIds = new Set(INITIAL_SUBSCRIBED_IDS.slice(0, 2));
    const cells = getGridPageCells(PRESS_LIST, "sub", subscribedIds, 0);

    expect(cells).toHaveLength(GRID_PAGE_SIZE);
    expect(cells.filter(Boolean)).toHaveLength(2);
    expect(cells[2]).toBeNull();
  });

  it("advances inside a category before moving to the next one", () => {
    const press = PRESS_LIST[0];
    const categoryKey = press.primaryCategoryKey;
    const next = advanceOpenProgress(press, { categoryKey, currentInTab: 0 });

    expect(next.categoryKey).toBe(categoryKey);
    expect(next.currentInTab).toBe(1);
  });

  it("rolls over to the next category after the last article", () => {
    const press = PRESS_LIST[0];
    const categoryKey = press.primaryCategoryKey;
    const lastIndex = press.categories[categoryKey].articles.length - 1;
    const expectedCategory =
      CATEGORY_ORDER[(CATEGORY_ORDER.findIndex((item) => item.key === categoryKey) + 1) % CATEGORY_ORDER.length]
        .key;

    const next = advanceOpenProgress(press, {
      categoryKey,
      currentInTab: lastIndex
    });

    expect(next.categoryKey).toBe(expectedCategory);
    expect(next.currentInTab).toBe(0);
  });
});
