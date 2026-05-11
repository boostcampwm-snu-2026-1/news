/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

function fire(
  key: string,
  init: Partial<KeyboardEventInit> = {},
  target: EventTarget = window,
): KeyboardEvent {
  const e = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(e);
  return e;
}

describe("useKeyboardShortcuts", () => {
  let onLeft: ReturnType<typeof vi.fn>;
  let onRight: ReturnType<typeof vi.fn>;
  let onEscape: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onLeft = vi.fn();
    onRight = vi.fn();
    onEscape = vi.fn();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("ArrowLeft → onLeft + preventDefault", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    const e = fire("ArrowLeft");
    expect(onLeft).toHaveBeenCalledOnce();
    expect(onRight).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
    expect(e.defaultPrevented).toBe(true);
  });

  it("ArrowRight → onRight", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    fire("ArrowRight");
    expect(onRight).toHaveBeenCalledOnce();
  });

  it("Escape → onEscape", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    fire("Escape");
    expect(onEscape).toHaveBeenCalledOnce();
  });

  it("undefined handler → key is no-op (no preventDefault)", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft })); // only left
    const eRight = fire("ArrowRight");
    const eEsc = fire("Escape");
    expect(onRight).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
    expect(eRight.defaultPrevented).toBe(false);
    expect(eEsc.defaultPrevented).toBe(false);
  });

  it("modifier keys → ignored", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    fire("ArrowLeft", { ctrlKey: true });
    fire("ArrowRight", { metaKey: true });
    fire("ArrowLeft", { altKey: true });
    fire("ArrowRight", { shiftKey: true });
    fire("Escape", { ctrlKey: true });
    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("input focused → ignored", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();
    fire("ArrowLeft", {}, input);
    fire("Escape", {}, input);
    expect(onLeft).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("textarea focused → ignored", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    const ta = document.createElement("textarea");
    document.body.appendChild(ta);
    ta.focus();
    fire("ArrowLeft", {}, ta);
    expect(onLeft).not.toHaveBeenCalled();
  });

  it("contenteditable focused → ignored", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    const div = document.createElement("div");
    // jsdom 의 isContentEditable 가 신뢰 안 되므로 attribute 직접 설정
    div.setAttribute("contenteditable", "true");
    document.body.appendChild(div);
    div.focus();
    fire("ArrowLeft", {}, div);
    expect(onLeft).not.toHaveBeenCalled();
  });

  it("unrelated keys → ignored", () => {
    renderHook(() => useKeyboardShortcuts({ onLeft, onRight, onEscape }));
    fire("a");
    fire("Enter");
    fire("Space");
    fire("Tab");
    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("listener cleaned up on unmount", () => {
    const { unmount } = renderHook(() =>
      useKeyboardShortcuts({ onLeft, onRight, onEscape }),
    );
    unmount();
    fire("ArrowLeft");
    fire("Escape");
    expect(onLeft).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("handlers from latest render fire (ref kept current)", () => {
    const onLeft1 = vi.fn();
    const onLeft2 = vi.fn();
    const { rerender } = renderHook(
      ({ h }: { h: () => void }) => useKeyboardShortcuts({ onLeft: h }),
      { initialProps: { h: onLeft1 } },
    );
    rerender({ h: onLeft2 });
    fire("ArrowLeft");
    expect(onLeft1).not.toHaveBeenCalled();
    expect(onLeft2).toHaveBeenCalledOnce();
  });
});
