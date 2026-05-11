import { useEffect, useMemo, useReducer, useState } from "react";
import pressData from "../../data/press.json";
import articlesData from "../../data/articles.json";
import type { Press, PressArticles, PressId } from "../../state/types";
import {
  initialNewsstandState,
  newsstandReducer,
} from "../../state/newsstandReducer";
import {
  getCatOutlets,
  getCount,
  getCurIdxInCat,
  getCurrentInTab,
  getLastPage,
  getPageItems,
  getSafePage,
  getVisible,
} from "../../state/selectors";
import { loadFromStorage, saveToStorage } from "../../hooks/useLocalStorage";
import { useAutoAdvance } from "../../hooks/useAutoAdvance";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { Header } from "../Header/Header";
import { Ticker } from "../Ticker/Ticker";
import { TabBar, type ViewerId } from "../TabBar/TabBar";
import { PressGrid } from "../PressGrid/PressGrid";
import { PressOpen } from "../PressOpen/PressOpen";
import { Chevron } from "../Chevron/Chevron";

const STORAGE_KEY = "newsstand:subscribed";

const ALL_PRESS = pressData as Press[];
const ALL_ARTICLES = articlesData as PressArticles[];

const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] as const;

function formatToday(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}. ${DAY_NAMES[d.getDay()]}`;
}

export function Newsstand() {
  const [state, dispatch] = useReducer(
    newsstandReducer,
    initialNewsstandState,
    (init) => ({ ...init, subscribed: loadFromStorage<PressId[]>(STORAGE_KEY, []) }),
  );
  const [viewer, setViewer] = useState<ViewerId>("grid");
  const today = useMemo(() => formatToday(), []);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state.subscribed);
  }, [state.subscribed]);

  const visible = useMemo(
    () => getVisible(ALL_PRESS, state.tab, state.subscribed),
    [state.tab, state.subscribed],
  );

  const lastPage = getLastPage(visible.length);
  const safePage = getSafePage(state.page, lastPage);
  useEffect(() => {
    if (state.page > lastPage) dispatch({ type: "page/set", page: lastPage });
  }, [state.page, lastPage]);

  const pageItems = useMemo(
    () => getPageItems(visible, safePage),
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
    () => getCatOutlets(visible, state.tabKey),
    [visible, state.tabKey],
  );
  const curIdxInCat = getCurIdxInCat(catOutlets, state.opened);
  const currentInTab = getCurrentInTab(curIdxInCat);
  const count = getCount(catOutlets);

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

  useAutoAdvance({
    isOpened,
    progress: state.progress,
    visible,
    catOutlets,
    curIdxInCat,
    tabKey: state.tabKey,
    dispatch,
  });

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

  useKeyboardShortcuts({
    onLeft: leftDisabled ? undefined : onLeft,
    onRight: rightDisabled ? undefined : onRight,
    onEscape: isOpened ? () => dispatch({ type: "press/close" }) : undefined,
  });

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
