import { strict as assert } from "node:assert";
import { test } from "node:test";
import { presses } from "../../_data/newsstand";
import {
  createInitialNewsstandState,
  deriveNewsstandState,
  newsstandReducer,
} from "./state";

test("open-press enters list view and selects the clicked press", () => {
  const state = createInitialNewsstandState(presses);
  const next = newsstandReducer(state, {
    type: "open-press",
    id: "sbs-biz",
  });
  const derived = deriveNewsstandState(next);

  assert.equal(next.viewMode, "list");
  assert.equal(next.activeCategory, "방송/통신");
  assert.equal(derived.selectedPress?.id, "sbs-biz");
  assert.equal(derived.progressLabel, "1 / 8");
});

test("advance-list wraps to the first press after the last press in a category", () => {
  const state = createInitialNewsstandState(presses);
  const opened = newsstandReducer(state, {
    type: "open-press",
    id: "ytn",
  });
  const wrapped = newsstandReducer(opened, { type: "advance-list" });
  const derived = deriveNewsstandState(wrapped);

  assert.equal(wrapped.activeCategory, "방송/통신");
  assert.equal(derived.selectedPress?.id, "sbs-biz");
  assert.equal(derived.progressLabel, "1 / 8");
});

test("subscribed tab clamps page and selection after unsubscribing the last visible press", () => {
  const initial = createInitialNewsstandState(presses);
  const subscribed = newsstandReducer(initial, {
    type: "change-tab",
    tab: "subscribed",
  });
  const opened = newsstandReducer(subscribed, {
    type: "open-press",
    id: "insight",
  });
  const cleared = [
    "seoul-economy",
    "herald",
    "sbs-biz",
    "asia-economy",
    "munhwa",
    "kbs-world",
    "korea-joongang",
    "insight",
  ].reduce(
    (state, id) => newsstandReducer(state, { type: "toggle-subscription", id }),
    opened,
  );
  const derived = deriveNewsstandState(cleared);

  assert.equal(derived.subscribedCount, 0);
  assert.equal(derived.visiblePresses.length, 0);
  assert.equal(derived.safePage, 0);
  assert.equal(derived.selectedPress, undefined);
  assert.equal(derived.progressLabel, "0 / 0");
});

test("empty categories in subscribed view cannot replace the active category", () => {
  const initial = createInitialNewsstandState(presses);
  const subscribed = newsstandReducer(initial, {
    type: "change-tab",
    tab: "subscribed",
  });
  const next = newsstandReducer(subscribed, {
    type: "select-category",
    category: "지역",
  });

  assert.equal(next.activeCategory, "종합/경제");
});
