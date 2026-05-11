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

  // -------------------------------------------------------------------
  // Scenario integration — selectors composed to simulate Newsstand
  // flows (visible → lastPage → safePage → pageItems → catOutlets →
  // curIdx). 단일 함수 단위가 아닌 한 사용자 시나리오를 한 케이스에서
  // 끝까지 따라간다.
  // -------------------------------------------------------------------
  describe("scenario integration", () => {
    it("[1] only one category visible → findNextCategoryWithOutlets wraps to itself", () => {
      // Auto-advance 분기: catOutlets 끝에 도달하면 다음 카테고리로 점프
      // 한다. 그런데 visible 안에 그 카테고리만 존재하면 wrap 한 결과는
      // 자기 자신이어야 한다 (그래야 같은 카테고리 첫 outlet 으로 loop).
      const onlyBroadcast = [B1];
      expect(
        findNextCategoryWithOutlets(onlyBroadcast, "general-economy"),
      ).toBe("broadcast-telecom");
      // 같은 카테고리에서 호출해도 자기 자신.
      expect(
        findNextCategoryWithOutlets(onlyBroadcast, "broadcast-telecom"),
      ).toBe("broadcast-telecom");
    });

    it("[2] sub tab + empty subscribed → lastPage=0, safePage clamps, pageItems=[]", () => {
      const visible = getVisible(ALL, "sub", []);
      expect(visible).toEqual([]);

      const lastPage = getLastPage(visible.length);
      expect(lastPage).toBe(0);

      // state.page 가 stale 하게 5 였더라도 safePage 가 0 으로 clamp.
      const safePage = getSafePage(5, lastPage);
      expect(safePage).toBe(0);

      expect(getPageItems(visible, safePage)).toEqual([]);
      // chevron 양쪽 disabled 가 자연스러운 상태:
      // page 0 = lastPage 이므로 prev/next 둘 다 끝.
      expect(safePage === 0 && safePage === lastPage).toBe(true);
    });

    it("[3] unsubscribe shrinks visible → lastPage drops, safePage clamps page back", () => {
      // 시작: subscribed 27 명 (PER_PAGE + 3) → 2 페이지 (lastPage=1).
      const many: Press[] = Array.from({ length: PER_PAGE + 3 }, (_, i) =>
        makePress(`m${i}`, "general-economy"),
      );
      const subscribedBefore: string[] = many.map((p) => p.id);
      const allWithMany = [...ALL, ...many];

      const visibleBefore = getVisible(allWithMany, "sub", subscribedBefore);
      expect(visibleBefore).toHaveLength(PER_PAGE + 3);
      const lastPageBefore = getLastPage(visibleBefore.length);
      expect(lastPageBefore).toBe(1);
      // 사용자가 page=1 (마지막 페이지) 에 있는 상태.
      expect(getSafePage(1, lastPageBefore)).toBe(1);

      // 25 명 unsubscribe → 2 명 남음.
      const subscribedAfter = subscribedBefore.slice(-2);
      const visibleAfter = getVisible(allWithMany, "sub", subscribedAfter);
      expect(visibleAfter).toHaveLength(2);
      const lastPageAfter = getLastPage(visibleAfter.length);
      expect(lastPageAfter).toBe(0);
      // page 가 1 인 채여도 selector 단계에서 0 으로 clamp.
      expect(getSafePage(1, lastPageAfter)).toBe(0);
      // pageItems 는 남은 2 명.
      expect(getPageItems(visibleAfter, getSafePage(1, lastPageAfter))).toHaveLength(
        2,
      );
    });

    it("[4] opened press unsubscribed → curIdx=-1, currentInTab=1", () => {
      // sub 탭, 같은 카테고리 두 명 구독 + a 를 열어둔 상태.
      const visibleBefore = getVisible(ALL, "sub", ["a1", "a2"]);
      expect(visibleBefore).toEqual([A1, A2]);
      const catBefore = getCatOutlets(visibleBefore, "general-economy");
      expect(catBefore).toEqual([A1, A2]);
      const idxBefore = getCurIdxInCat(catBefore, "a1");
      expect(idxBefore).toBe(0);
      expect(getCurrentInTab(idxBefore)).toBe(1);

      // a1 unsubscribe — opened 는 여전히 "a1" 인 채로 selector 호출.
      const visibleAfter = getVisible(ALL, "sub", ["a2"]);
      expect(visibleAfter).toEqual([A2]);
      const catAfter = getCatOutlets(visibleAfter, "general-economy");
      expect(catAfter).toEqual([A2]);
      // opened 가 visible 에서 사라졌으므로 -1.
      const idxAfter = getCurIdxInCat(catAfter, "a1");
      expect(idxAfter).toBe(-1);
      // currentInTab 은 floor=1 로 보호 (Newsstand 가 useEffect 로
      // 닫거나 점프하기 전 한 프레임에서도 NaN/음수가 새지 않음).
      expect(getCurrentInTab(idxAfter)).toBe(1);
    });

    it("[5] all → sub tab switch changes visible length & order", () => {
      const visAll = getVisible(ALL, "all", ["c1", "a1"]);
      // all 모드는 입력 reference 그대로.
      expect(visAll).toBe(ALL);
      expect(visAll).toHaveLength(ALL.length);

      const visSub = getVisible(ALL, "sub", ["c1", "a1"]);
      // sub 모드는 구독 순서 보존 (c1 먼저, a1 다음).
      expect(visSub).toEqual([C1, A1]);
      expect(visSub.length).toBeLessThan(visAll.length);
    });

    it("[6] empty visible → catOutlets [], curIdx -1, currentInTab 1, count 1", () => {
      const visible: Press[] = [];
      const cat = getCatOutlets(visible, "general-economy");
      expect(cat).toEqual([]);
      const idx = getCurIdxInCat(cat, "a1");
      expect(idx).toBe(-1);
      expect(getCurrentInTab(idx)).toBe(1);
      // count floor=1 — "1 / 1" 표시가 깨지지 않음.
      expect(getCount(cat)).toBe(1);
    });

    it("[7] 72 outlets all-tab → 3 pages, each exactly PER_PAGE=24", () => {
      const big: Press[] = Array.from({ length: PER_PAGE * 3 }, (_, i) =>
        makePress(`big${i}`, "general-economy"),
      );
      const visible = getVisible(big, "all", []);
      expect(visible).toHaveLength(72);
      const lastPage = getLastPage(visible.length);
      expect(lastPage).toBe(2);
      expect(getPageItems(visible, 0)).toHaveLength(PER_PAGE);
      expect(getPageItems(visible, 1)).toHaveLength(PER_PAGE);
      expect(getPageItems(visible, 2)).toHaveLength(PER_PAGE);
      // page 3 (오버슈트) — safePage 가 2 로 clamp.
      expect(getSafePage(3, lastPage)).toBe(2);
    });

    it("[8] 5 categories empty + 1 has outlets → wrap loops to that one", () => {
      // 'regional' 만 outlets 보유.
      const R1 = makePress("r1", "regional");
      const R2 = makePress("r2", "regional");
      const onlyRegional = [R1, R2];
      // 임의 시작점에서 호출 → regional.
      expect(
        findNextCategoryWithOutlets(onlyRegional, "general-economy"),
      ).toBe("regional");
      expect(findNextCategoryWithOutlets(onlyRegional, "it")).toBe("regional");
      // regional 자기 자신에서도 자기로 wrap.
      expect(findNextCategoryWithOutlets(onlyRegional, "regional")).toBe(
        "regional",
      );
    });

    it("[9] auto-advance one step — same category, idx+1 within bounds", () => {
      // visible=[A1,A2] 같은 카테고리, opened=A1 (idx 0).
      const visible = [A1, A2];
      const cat = getCatOutlets(visible, "general-economy");
      const curIdx = getCurIdxInCat(cat, "a1");
      expect(curIdx).toBe(0);

      // "다음 outlet" 분기: curIdx + 1 < cat.length 이면 같은 카테고리 안.
      const hasNextInCat = curIdx + 1 < cat.length;
      expect(hasNextInCat).toBe(true);
      const nextOutlet = cat[curIdx + 1];
      expect(nextOutlet).toBe(A2);
      // currentInTab 은 다음 프레임에 idx+1 +1 = 2.
      expect(getCurrentInTab(curIdx + 1)).toBe(2);
    });

    it("[10] auto-advance at last outlet of cat → jump to next category", () => {
      // visible=[A1, B1] — A1 만 general-economy, B1 은 broadcast-telecom.
      const visible = [A1, B1];
      const cat = getCatOutlets(visible, "general-economy");
      expect(cat).toEqual([A1]);
      const curIdx = getCurIdxInCat(cat, "a1");
      expect(curIdx).toBe(0);
      // 같은 카테고리 안 다음 outlet 없음 → wrap 분기.
      expect(curIdx + 1 < cat.length).toBe(false);
      const nextCat = findNextCategoryWithOutlets(visible, "general-economy");
      expect(nextCat).toBe("broadcast-telecom");
      // 점프 후 새 카테고리 첫 outlet.
      const nextCatOutlets = getCatOutlets(visible, nextCat!);
      expect(nextCatOutlets[0]).toBe(B1);
    });
  });
});
