import { describe, it, expect } from "vitest";
import type { Press, PressWordmarkSpec } from "./types";
import {
  PER_PAGE,
  getVisible,
  getLastPage,
  getSafePage,
  getPageItems,
  getCatOutlets,
  getCurIdxInCat,
  getCurrentInTab,
  getCount,
  findNextCategoryWithOutlets,
} from "./selectors";

const wm: PressWordmarkSpec = { name: "x", color: "#000" };

function makePress(id: string, cat: Press["primaryCategory"]): Press {
  return { id, wordmark: { ...wm, name: id }, primaryCategory: cat, editTime: "" };
}

const A1 = makePress("a1", "general-economy");
const A2 = makePress("a2", "general-economy");
const B1 = makePress("b1", "broadcast-telecom");
const C1 = makePress("c1", "it");

const ALL: Press[] = [A1, A2, B1, C1];

describe("selectors", () => {
  describe("getVisible", () => {
    it("'all' returns full list reference (no filtering)", () => {
      expect(getVisible(ALL, "all", [])).toBe(ALL);
      expect(getVisible(ALL, "all", ["a1"])).toBe(ALL);
    });

    it("'sub' resolves ids preserving subscription order", () => {
      expect(getVisible(ALL, "sub", ["b1", "a1"])).toEqual([B1, A1]);
    });

    it("'sub' empty subscribed → empty array", () => {
      expect(getVisible(ALL, "sub", [])).toEqual([]);
    });

    it("'sub' drops ids not in allPress", () => {
      expect(getVisible(ALL, "sub", ["a1", "ghost", "c1"])).toEqual([A1, C1]);
    });
  });

  describe("getLastPage", () => {
    it("0 for empty / partial first page", () => {
      expect(getLastPage(0)).toBe(0);
      expect(getLastPage(1)).toBe(0);
      expect(getLastPage(PER_PAGE)).toBe(0);
    });

    it("rolls to next page exactly at PER_PAGE+1", () => {
      expect(getLastPage(PER_PAGE + 1)).toBe(1);
      expect(getLastPage(PER_PAGE * 3)).toBe(2);
      expect(getLastPage(PER_PAGE * 3 + 1)).toBe(3);
    });
  });

  describe("getSafePage", () => {
    it("clamps both ends", () => {
      expect(getSafePage(-5, 2)).toBe(0);
      expect(getSafePage(0, 2)).toBe(0);
      expect(getSafePage(1, 2)).toBe(1);
      expect(getSafePage(2, 2)).toBe(2);
      expect(getSafePage(99, 2)).toBe(2);
    });
  });

  describe("getPageItems", () => {
    const big: Press[] = Array.from({ length: PER_PAGE * 2 + 3 }, (_, i) =>
      makePress(`p${i}`, "general-economy"),
    );

    it("first page", () => {
      const r = getPageItems(big, 0);
      expect(r).toHaveLength(PER_PAGE);
      expect(r[0].id).toBe("p0");
      expect(r[PER_PAGE - 1].id).toBe(`p${PER_PAGE - 1}`);
    });

    it("last (partial) page", () => {
      const r = getPageItems(big, 2);
      expect(r).toHaveLength(3);
      expect(r[0].id).toBe(`p${PER_PAGE * 2}`);
    });
  });

  describe("getCatOutlets / getCurIdxInCat / getCurrentInTab / getCount", () => {
    it("filters by primaryCategory", () => {
      expect(getCatOutlets(ALL, "general-economy")).toEqual([A1, A2]);
      expect(getCatOutlets(ALL, "broadcast-telecom")).toEqual([B1]);
      expect(getCatOutlets(ALL, "regional")).toEqual([]);
    });

    it("getCurIdxInCat returns -1 when nothing opened", () => {
      expect(getCurIdxInCat([A1, A2], null)).toBe(-1);
    });

    it("getCurIdxInCat returns -1 when opened not in cat", () => {
      expect(getCurIdxInCat([A1, A2], "b1")).toBe(-1);
    });

    it("getCurIdxInCat returns 0-based index", () => {
      expect(getCurIdxInCat([A1, A2], "a2")).toBe(1);
    });

    it("getCurrentInTab is 1 when not in cat, idx+1 otherwise", () => {
      expect(getCurrentInTab(-1)).toBe(1);
      expect(getCurrentInTab(0)).toBe(1);
      expect(getCurrentInTab(3)).toBe(4);
    });

    it("getCount has floor of 1", () => {
      expect(getCount([])).toBe(1);
      expect(getCount([A1])).toBe(1);
      expect(getCount([A1, A2])).toBe(2);
    });
  });

  describe("findNextCategoryWithOutlets", () => {
    it("finds next non-empty category in CATEGORY_ORDER", () => {
      // ALL has general-economy(2), broadcast-telecom(1), it(1)
      expect(findNextCategoryWithOutlets(ALL, "general-economy")).toBe(
        "broadcast-telecom",
      );
      expect(findNextCategoryWithOutlets(ALL, "broadcast-telecom")).toBe("it");
    });

    it("wraps around past the end", () => {
      // 'it' is index 2; next non-empty wrapping is 'general-economy'
      expect(findNextCategoryWithOutlets(ALL, "it")).toBe("general-economy");
    });

    it("returns null when visible is empty", () => {
      expect(findNextCategoryWithOutlets([], "general-economy")).toBeNull();
    });

    it("skips empty categories", () => {
      const onlyB = [B1];
      // From general-economy, skip to broadcast-telecom (the only one with outlets)
      expect(findNextCategoryWithOutlets(onlyB, "general-economy")).toBe(
        "broadcast-telecom",
      );
      // From broadcast-telecom (the only one), wraps fully back to itself
      expect(findNextCategoryWithOutlets(onlyB, "broadcast-telecom")).toBe(
        "broadcast-telecom",
      );
    });
  });
});
