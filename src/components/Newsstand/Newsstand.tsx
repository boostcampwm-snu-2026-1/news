import { useEffect, useMemo, useReducer, useState } from "react";
import pressData from "../../data/press.json";
import articlesData from "../../data/articles.json";
import {
  CATEGORY_ORDER,
  type CategoryKey,
  type Press,
  type PressArticles,
  type PressId,
} from "../../state/types";
import {
  initialNewsstandState,
  newsstandReducer,
} from "../../state/newsstandReducer";
import { loadFromStorage, saveToStorage } from "../../hooks/useLocalStorage";
import { useInterval } from "../../hooks/useInterval";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Header } from "../Header/Header";
import { Ticker } from "../Ticker/Ticker";
import { TabBar, type ViewerId } from "../TabBar/TabBar";
import { PressGrid } from "../PressGrid/PressGrid";
import { PressOpen } from "../PressOpen/PressOpen";
import { Chevron } from "../Chevron/Chevron";

const STORAGE_KEY = "newsstand:subscribed";
const PER_PAGE = 24;
const PROGRESS_TICK_MS = 100;
const PROGRESS_TOTAL_MS = 6000;
const PROGRESS_DELTA = PROGRESS_TICK_MS / PROGRESS_TOTAL_MS;

const ALL_PRESS = pressData as Press[];
const ALL_ARTICLES = articlesData as PressArticles[];

const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] as const;

function formatToday(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}. ${DAY_NAMES[d.getDay()]}`;
}

/**
 * Find the next category (in CATEGORY_ORDER) whose visible outlets list is
 * non-empty, starting from `from` exclusive and wrapping around. Returns
 * null when no category in `visible` has any outlets.
 */
function findNextCategoryWithOutlets(
  visible: Press[],
  from: CategoryKey,
): CategoryKey | null {
  const idx = CATEGORY_ORDER.indexOf(from);
  for (let i = 1; i <= CATEGORY_ORDER.length; i++) {
    const next = CATEGORY_ORDER[(idx + i) % CATEGORY_ORDER.length];
    if (visible.some((p) => p.primaryCategory === next)) return next;
  }
  return null;
}

export function Newsstand() {
  const [state, dispatch] = useReducer(
    newsstandReducer,
    initialNewsstandState,
    (init) => ({ ...init, subscribed: loadFromStorage<PressId[]>(STORAGE_KEY, []) }),
  );
  const [viewer, setViewer] = useState<ViewerId>("grid");
  const reduced = useReducedMotion();
  const today = useMemo(() => formatToday(), []);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state.subscribed);
  }, [state.subscribed]);

  const visible = useMemo(() => {
    if (state.tab === "all") return ALL_PRESS;
    const byId = new Map(ALL_PRESS.map((p) => [p.id, p]));
    return state.subscribed
      .map((id) => byId.get(id))
      .filter((p): p is Press => p !== undefined);
  }, [state.tab, state.subscribed]);

  const lastPage = Math.max(0, Math.ceil(visible.length / PER_PAGE) - 1);
  const safePage = Math.min(state.page, lastPage);
  useEffect(() => {
    if (state.page > lastPage) dispatch({ type: "page/set", page: lastPage });
  }, [state.page, lastPage]);

  const pageItems = useMemo(
    () => visible.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE),
    [visible, safePage],
  );

  const isOpened = state.opened !== null;
  const openedPress =
    state.opened !== null ? ALL_PRESS.find((p) => p.id === state.opened) : undefined;
  const openedArticles =
    state.opened !== null
      ? ALL_ARTICLES.find((a) => a.pressId === state.opened)
      : undefined;

  // 섹터(=카테고리) 안에서 visible 한 outlet 들. 한 카테고리 안에서만 자동
  // 전환·페이지 이동·count 가 정의된다.
  const catOutlets = useMemo(
    () => visible.filter((p) => p.primaryCategory === state.tabKey),
    [visible, state.tabKey],
  );
  const curIdxInCat =
    state.opened !== null ? catOutlets.findIndex((p) => p.id === state.opened) : -1;
  const currentInTab = curIdxInCat >= 0 ? curIdxInCat + 1 : 1;
  const count = Math.max(1, catOutlets.length);

  // 사용자가 섹터 탭을 클릭해 tabKey 만 바뀐 경우, 현재 opened 가 새 섹터에
  // 없으면 그 섹터의 첫 outlet 으로 자동 이동한다.
  useEffect(() => {
    if (!isOpened) return;
    if (curIdxInCat >= 0) return;
    const target = catOutlets[0];
    if (!target) return;
    dispatch({
      type: "press/open",
      pressId: target.id,
      primaryCategory: target.primaryCategory,
    });
  }, [isOpened, curIdxInCat, catOutlets]);

  useInterval(
    () => {
      const next = state.progress + PROGRESS_DELTA;
      if (next < 1) {
        dispatch({ type: "progress/set", progress: next });
        return;
      }
      // 같은 섹터 안에서 다음 outlet → 섹터 끝이면 다음 섹터의 첫 outlet (wrap).
      if (curIdxInCat >= 0 && curIdxInCat + 1 < catOutlets.length) {
        const nextOutlet = catOutlets[curIdxInCat + 1];
        dispatch({
          type: "press/open",
          pressId: nextOutlet.id,
          primaryCategory: nextOutlet.primaryCategory,
        });
        return;
      }
      const nextCat = findNextCategoryWithOutlets(visible, state.tabKey);
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

  const onTabChange = (tab: "all" | "sub") => {
    if (isOpened) dispatch({ type: "press/close" });
    dispatch({ type: "tab/set", tab });
  };

  const leftDisabled = isOpened ? curIdxInCat <= 0 : safePage <= 0;
  const rightDisabled = isOpened
    ? curIdxInCat === -1 || curIdxInCat >= catOutlets.length - 1
    : safePage >= lastPage;

  const onLeft = () => {
    if (isOpened) {
      if (curIdxInCat > 0) {
        const p = catOutlets[curIdxInCat - 1];
        dispatch({ type: "press/open", pressId: p.id, primaryCategory: p.primaryCategory });
      }
    } else {
      dispatch({ type: "page/prev" });
    }
  };

  const onRight = () => {
    if (isOpened) {
      if (curIdxInCat !== -1 && curIdxInCat < catOutlets.length - 1) {
        const p = catOutlets[curIdxInCat + 1];
        dispatch({ type: "press/open", pressId: p.id, primaryCategory: p.primaryCategory });
      }
    } else {
      dispatch({ type: "page/next" });
    }
  };

  return (
    <main className="canvas" aria-label="뉴스스탠드">
      <Header date={today} />
      <Ticker />
      <TabBar
        activeTab={state.tab}
        subCount={state.subscribed.length}
        viewer={viewer}
        onTabChange={onTabChange}
        onViewerChange={setViewer}
      />
      <div className="contentCol contentArea">
        {isOpened && openedPress ? (
          <PressOpen
            press={openedPress}
            articles={openedArticles}
            tabKey={state.tabKey}
            currentInTab={currentInTab}
            count={count}
            progress={state.progress}
            subscribed={state.subscribed.includes(openedPress.id)}
            onTabKeyChange={(key) => dispatch({ type: "field-tab/set", tabKey: key })}
            onSubscribe={() =>
              dispatch({ type: "subscribe", pressId: openedPress.id })
            }
            onUnsubscribe={() =>
              dispatch({ type: "unsubscribe", pressId: openedPress.id })
            }
          />
        ) : (
          <PressGrid
            items={pageItems}
            tab={state.tab}
            subscribedIds={state.subscribed}
            onOpen={(p) =>
              dispatch({
                type: "press/open",
                pressId: p.id,
                primaryCategory: p.primaryCategory,
              })
            }
            onSubscribe={(id) => dispatch({ type: "subscribe", pressId: id })}
            onUnsubscribe={(id) => dispatch({ type: "unsubscribe", pressId: id })}
          />
        )}
      </div>
      <Chevron dir="left" disabled={leftDisabled} onClick={onLeft} />
      <Chevron dir="right" disabled={rightDisabled} onClick={onRight} />
    </main>
  );
}
