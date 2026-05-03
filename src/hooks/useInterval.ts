import { useEffect, useRef } from "react";

/**
 * Run `callback` every `intervalMs`. First call fires at `intervalMs + offsetMs`.
 * Pass `intervalMs = null` to pause (e.g. on hover or reduced motion).
 */
export function useInterval(
  callback: () => void,
  intervalMs: number | null,
  offsetMs = 0,
): void {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (intervalMs === null) return;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      cbRef.current();
      intervalId = window.setInterval(() => cbRef.current(), intervalMs);
    }, intervalMs + offsetMs);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [intervalMs, offsetMs]);
}
