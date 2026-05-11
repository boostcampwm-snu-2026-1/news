import { describe, it, expect } from "vitest";
import {
  initialNewsstandState,
  newsstandReducer,
} from "./newsstandReducer";

describe("newsstandReducer", () => {
  describe("subscribe / unsubscribe", () => {
    it("adds press to subscribed", () => {
      const next = newsstandReducer(initialNewsstandState, {
        type: "subscribe",
        pressId: "sbs-biz",
      });
      expect(next.subscribed).toEqual(["sbs-biz"]);
    });

    it("does not duplicate when subscribing twice", () => {
      const once = newsstandReducer(initialNewsstandState, {
        type: "subscribe",
        pressId: "sbs-biz",
      });
      const twice = newsstandReducer(once, { type: "subscribe", pressId: "sbs-biz" });
      expect(twice).toBe(once);
      expect(twice.subscribed).toEqual(["sbs-biz"]);
    });

    it("removes press on unsubscribe", () => {
      const seeded = { ...initialNewsstandState, subscribed: ["sbs-biz", "mbc"] };
      const next = newsstandReducer(seeded, { type: "unsubscribe", pressId: "sbs-biz" });
      expect(next.subscribed).toEqual(["mbc"]);
    });

    it("preserves insertion order across multiple subscribes", () => {
      let s = initialNewsstandState;
      for (const id of ["a", "b", "c", "d"]) {
        s = newsstandReducer(s, { type: "subscribe", pressId: id });
      }
      expect(s.subscribed).toEqual(["a", "b", "c", "d"]);
    });
  });

  describe("tab / page", () => {
    it("resets page when switching tab", () => {
      const seeded = { ...initialNewsstandState, page: 2, tab: "all" as const };
      const next = newsstandReducer(seeded, { type: "tab/set", tab: "sub" });
      expect(next.tab).toBe("sub");
      expect(next.page).toBe(0);
    });

    it("page/next increments and page/prev clamps to 0", () => {
      const a = newsstandReducer(initialNewsstandState, { type: "page/next" });
      expect(a.page).toBe(1);
      const b = newsstandReducer(a, { type: "page/prev" });
      expect(b.page).toBe(0);
      const c = newsstandReducer(b, { type: "page/prev" });
      expect(c.page).toBe(0);
    });
  });

  describe("press/open + close", () => {
    it("sets opened, tabKey, resets progress and currentInTab", () => {
      const seeded = { ...initialNewsstandState, progress: 0.7, currentInTab: 30 };
      const next = newsstandReducer(seeded, {
        type: "press/open",
        pressId: "sbs-biz",
        primaryCategory: "broadcast-telecom",
      });
      expect(next.opened).toBe("sbs-biz");
      expect(next.tabKey).toBe("broadcast-telecom");
      expect(next.progress).toBe(0);
      expect(next.currentInTab).toBe(1);
    });

    it("press/close clears opened + resets progress", () => {
      const seeded = {
        ...initialNewsstandState,
        opened: "sbs-biz",
        progress: 0.4,
        currentInTab: 5,
      };
      const next = newsstandReducer(seeded, { type: "press/close" });
      expect(next.opened).toBeNull();
      expect(next.progress).toBe(0);
      expect(next.currentInTab).toBe(1);
    });
  });

  describe("progress / field-tab", () => {
    it("progress/set clamps to [0, 1]", () => {
      const a = newsstandReducer(initialNewsstandState, {
        type: "progress/set",
        progress: 1.5,
      });
      expect(a.progress).toBe(1);
      const b = newsstandReducer(initialNewsstandState, {
        type: "progress/set",
        progress: -0.2,
      });
      expect(b.progress).toBe(0);
    });

    it("field-tab/set resets currentInTab and progress", () => {
      const seeded = {
        ...initialNewsstandState,
        tabKey: "broadcast-telecom" as const,
        currentInTab: 30,
        progress: 0.7,
      };
      const next = newsstandReducer(seeded, {
        type: "field-tab/set",
        tabKey: "it",
      });
      expect(next.tabKey).toBe("it");
      expect(next.currentInTab).toBe(1);
      expect(next.progress).toBe(0);
    });

    it("field-tab/advance-current increments currentInTab and resets progress", () => {
      const seeded = {
        ...initialNewsstandState,
        currentInTab: 5,
        progress: 0.99,
      };
      const next = newsstandReducer(seeded, { type: "field-tab/advance-current" });
      expect(next.currentInTab).toBe(6);
      expect(next.progress).toBe(0);
    });
  });

  describe("subscribed/hydrate", () => {
    it("replaces subscribed wholesale", () => {
      const seeded = { ...initialNewsstandState, subscribed: ["x"] };
      const next = newsstandReducer(seeded, {
        type: "subscribed/hydrate",
        subscribed: ["a", "b"],
      });
      expect(next.subscribed).toEqual(["a", "b"]);
    });
  });

  describe("edge cases — idempotency / clamping / boundary", () => {
    it("tab/set with same tab returns identical reference (idempotency guard)", () => {
      const seeded = { ...initialNewsstandState, tab: "all" as const, page: 2 };
      const next = newsstandReducer(seeded, { type: "tab/set", tab: "all" });
      expect(next).toBe(seeded);
      // page must NOT be reset because the action was a no-op
      expect(next.page).toBe(2);
    });

    it("subscribe with already-subscribed press returns identical reference", () => {
      const seeded = { ...initialNewsstandState, subscribed: ["a", "b"] };
      const next = newsstandReducer(seeded, { type: "subscribe", pressId: "a" });
      expect(next).toBe(seeded);
      expect(next.subscribed).toBe(seeded.subscribed);
    });

    it("unsubscribe of a non-subscribed press returns identical reference", () => {
      const seeded = { ...initialNewsstandState, subscribed: ["a", "b"] };
      const next = newsstandReducer(seeded, { type: "unsubscribe", pressId: "ghost" });
      expect(next).toBe(seeded);
      expect(next.subscribed).toBe(seeded.subscribed);
    });

    it("page/set clamps negative values to 0", () => {
      const next = newsstandReducer(initialNewsstandState, {
        type: "page/set",
        page: -3,
      });
      expect(next.page).toBe(0);
    });

    it("page/prev at page 0 keeps page at 0 (no negative)", () => {
      const next = newsstandReducer(initialNewsstandState, { type: "page/prev" });
      expect(next.page).toBe(0);
    });

    it("progress/set above 1 clamps to 1.0", () => {
      const next = newsstandReducer(initialNewsstandState, {
        type: "progress/set",
        progress: 99,
      });
      expect(next.progress).toBe(1);
    });

    it("progress/set below 0 clamps to 0.0", () => {
      const seeded = { ...initialNewsstandState, progress: 0.5 };
      const next = newsstandReducer(seeded, {
        type: "progress/set",
        progress: -10,
      });
      expect(next.progress).toBe(0);
    });

    it("press/open forces progress=0 and currentInTab=1 even from mid values", () => {
      const seeded = {
        ...initialNewsstandState,
        progress: 0.7,
        currentInTab: 30,
      };
      const next = newsstandReducer(seeded, {
        type: "press/open",
        pressId: "sbs-biz",
        primaryCategory: "it",
      });
      expect(next.progress).toBe(0);
      expect(next.currentInTab).toBe(1);
    });

    it("press/open preserves subscribed list", () => {
      const seeded = { ...initialNewsstandState, subscribed: ["a", "b"] };
      const next = newsstandReducer(seeded, {
        type: "press/open",
        pressId: "sbs-biz",
        primaryCategory: "it",
      });
      expect(next.subscribed).toEqual(["a", "b"]);
      // and the same reference — press/open does not touch subscribed
      expect(next.subscribed).toBe(seeded.subscribed);
    });

    it("subscribed/hydrate preserves all other fields", () => {
      const seeded = {
        ...initialNewsstandState,
        page: 2,
        tab: "sub" as const,
        tabKey: "it" as const,
        opened: "x",
        progress: 0.4,
        currentInTab: 3,
      };
      const next = newsstandReducer(seeded, {
        type: "subscribed/hydrate",
        subscribed: ["a", "b"],
      });
      expect(next.page).toBe(2);
      expect(next.tab).toBe("sub");
      expect(next.tabKey).toBe("it");
      expect(next.opened).toBe("x");
      expect(next.progress).toBe(0.4);
      expect(next.currentInTab).toBe(3);
      expect(next.subscribed).toEqual(["a", "b"]);
    });

    it("field-tab/advance-current preserves opened / subscribed / tab / page", () => {
      const seeded = {
        ...initialNewsstandState,
        opened: "sbs-biz",
        subscribed: ["a", "b"],
        tab: "sub" as const,
        page: 1,
        currentInTab: 5,
        progress: 0.9,
      };
      const next = newsstandReducer(seeded, { type: "field-tab/advance-current" });
      expect(next.opened).toBe("sbs-biz");
      expect(next.subscribed).toBe(seeded.subscribed);
      expect(next.tab).toBe("sub");
      expect(next.page).toBe(1);
      // and the touched fields are still correct
      expect(next.currentInTab).toBe(6);
      expect(next.progress).toBe(0);
    });

    it("unknown action falls through default and returns identical reference", () => {
      const seeded = { ...initialNewsstandState, page: 2 };
      // Cast to any to bypass the discriminated-union — we want to exercise default.
      const next = newsstandReducer(seeded, { type: "unknown/no-op" } as never);
      expect(next).toBe(seeded);
    });
  });
});
