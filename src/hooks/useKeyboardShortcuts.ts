import { useEffect, useRef } from "react";

export interface UseKeyboardShortcutsArgs {
  /** ArrowLeft 처리. undefined 면 무시. */
  onLeft?: (() => void) | undefined;
  /** ArrowRight 처리. undefined 면 무시. */
  onRight?: (() => void) | undefined;
  /** Escape 처리. undefined 면 무시. */
  onEscape?: (() => void) | undefined;
}

/**
 * 전역 키보드 단축키 (window keydown). 입력 요소(input/textarea/select/
 * contenteditable) 에 focus 가 있거나 modifier (ctrl/alt/meta/shift) 가
 * 같이 눌렸으면 무시 — 브라우저/입력 단축키와 충돌 방지.
 *
 * 핸들러는 ref 로 캡처해서 listener 는 한 번만 등록한다.
 */
export function useKeyboardShortcuts({
  onLeft,
  onRight,
  onEscape,
}: UseKeyboardShortcutsArgs): void {
  const leftRef = useRef(onLeft);
  const rightRef = useRef(onRight);
  const escRef = useRef(onEscape);

  useEffect(() => {
    leftRef.current = onLeft;
    rightRef.current = onRight;
    escRef.current = onEscape;
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        // contenteditable: isContentEditable 가 표준이지만 jsdom 에서 false
        // 인 경우가 있어 attribute 도 같이 본다.
        const ce = target.getAttribute("contenteditable");
        if (target.isContentEditable || ce === "" || ce === "true" || ce === "plaintext-only") {
          return;
        }
      }
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      if (e.key === "ArrowLeft") {
        if (!leftRef.current) return;
        e.preventDefault();
        leftRef.current();
      } else if (e.key === "ArrowRight") {
        if (!rightRef.current) return;
        e.preventDefault();
        rightRef.current();
      } else if (e.key === "Escape") {
        if (!escRef.current) return;
        e.preventDefault();
        escRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
