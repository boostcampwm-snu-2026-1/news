import type { Dispatch } from "react";
import type { CategoryKey, Press } from "../state/types";
import type { NewsstandAction } from "../state/newsstandReducer";
import { findNextCategoryWithOutlets } from "../state/selectors";
import { useInterval } from "./useInterval";
import { useReducedMotion } from "./useReducedMotion";

export const PROGRESS_TICK_MS = 100;
export const PROGRESS_TOTAL_MS = 6000;
export const PROGRESS_DELTA = PROGRESS_TICK_MS / PROGRESS_TOTAL_MS;

export interface UseAutoAdvanceArgs {
  isOpened: boolean;
  progress: number;
  visible: Press[];
  catOutlets: Press[];
  curIdxInCat: number;
  tabKey: CategoryKey;
  dispatch: Dispatch<NewsstandAction>;
}

/**
 * 리스트 뷰의 6초 자동 진행. progress 누적 후 1 도달 시
 *  1) 같은 카테고리 안에 다음 outlet 이 있으면 그것으로,
 *  2) 없으면 다음(wrap) 카테고리의 첫 outlet 으로
 * press/open 을 dispatch 한다. press/open 이 progress=0/currentInTab=1 까지
 * 같이 reset 한다.
 *
 * `prefers-reduced-motion: reduce` 또는 `isOpened=false` 면 interval 정지.
 */
export function useAutoAdvance({
  isOpened,
  progress,
  visible,
  catOutlets,
  curIdxInCat,
  tabKey,
  dispatch,
}: UseAutoAdvanceArgs): void {
  const reduced = useReducedMotion();

  useInterval(
    () => {
      const next = progress + PROGRESS_DELTA;
      if (next < 1) {
        dispatch({ type: "progress/set", progress: next });
        return;
      }
      if (curIdxInCat >= 0 && curIdxInCat + 1 < catOutlets.length) {
        const nextOutlet = catOutlets[curIdxInCat + 1];
        dispatch({
          type: "press/open",
          pressId: nextOutlet.id,
          primaryCategory: nextOutlet.primaryCategory,
        });
        return;
      }
      const nextCat = findNextCategoryWithOutlets(visible, tabKey);
      if (!nextCat) return;
      const first = visible.find((p) => p.primaryCategory === nextCat);
      if (!first) return;
      dispatch({
        type: "press/open",
        pressId: first.id,
        primaryCategory: first.primaryCategory,
      });
    },
    isOpened && !reduced ? PROGRESS_TICK_MS : null,
  );
}
