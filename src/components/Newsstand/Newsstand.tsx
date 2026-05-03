import { useEffect, useMemo, useReducer, useState } from "react";
import pressData from "../../data/press.json";
import articlesData from "../../data/articles.json";
import {
  CATEGORY_ORDER,
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

export function Newsstand() {
  const [state, dispatch] = useReducer(
    newsstandReducer,
    initialNewsstandState,
    (init) => ({ ...init, subscribed: loadFromStorage<PressId[]>(STORAGE_KEY, []) }),
  );
  const [viewer, setViewer] = useState<ViewerId>("grid");
  const reduced = useReducedMotion();

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
  const openedIdx = state.opened !== null ? visible.findIndex((p) => p.id === state.opened) : -1;

  const currentCategoryCount =
    openedArticles?.byCategory[state.tabKey]?.count ?? 1;

  useInterval(
    () => {
      const next = state.progress + PROGRESS_DELTA;
      if (next < 1) {
        dispatch({ type: "progress/set", progress: next });
        return;
      }
      if (state.currentInTab + 1 > currentCategoryCount) {
        const idx = CATEGORY_ORDER.indexOf(state.tabKey);
        const nextCat = CATEGORY_ORDER[(idx + 1) % CATEGORY_ORDER.length];
        dispatch({ type: "field-tab/set", tabKey: nextCat });
      } else {
        dispatch({ type: "field-tab/advance-current" });
      }
    },
    isOpened && !reduced ? PROGRESS_TICK_MS : null,
  );

  const onTabChange = (tab: "all" | "sub") => {
    if (isOpened) dispatch({ type: "press/close" });
    dispatch({ type: "tab/set", tab });
  };

  const leftDisabled = isOpened ? openedIdx <= 0 : safePage <= 0;
  const rightDisabled = isOpened
    ? openedIdx === -1 || openedIdx >= visible.length - 1
    : safePage >= lastPage;

  const onLeft = () => {
    if (isOpened) {
      if (openedIdx > 0) {
        const p = visible[openedIdx - 1];
        dispatch({ type: "press/open", pressId: p.id, primaryCategory: p.primaryCategory });
      }
    } else {
      dispatch({ type: "page/prev" });
    }
  };

  const onRight = () => {
    if (isOpened) {
      if (openedIdx !== -1 && openedIdx < visible.length - 1) {
        const p = visible[openedIdx + 1];
        dispatch({ type: "press/open", pressId: p.id, primaryCategory: p.primaryCategory });
      }
    } else {
      dispatch({ type: "page/next" });
    }
  };

  return (
    <main className="canvas" aria-label="뉴스스탠드">
      <Header date="2026. 01. 14. 수요일" />
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
            currentInTab={state.currentInTab}
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
