import { useEffect, useMemo, useReducer } from "react";
import { tickerItems } from "../../data/articles";
import { PAGE_SIZE, presses } from "../../data/presses";
import type { NewsstandState, NewsstandTab, ViewerMode } from "../../types/newsstand";
import { getLastPage, getPageItems } from "../../utils/pagination";
import { Chevron } from "../shared/Chevron";
import { Header } from "../Header/Header";
import { PressGrid } from "../PressGrid/PressGrid";
import { PressOpen } from "../PressOpen/PressOpen";
import { TabBar } from "../TabBar/TabBar";
import { Ticker } from "../Ticker/Ticker";
import styles from "./Newsstand.module.css";

const SUBSCRIBED_STORAGE_KEY = "newsstand:subscribedPressIds";

type NewsstandAction =
  | { type: "changeTab"; tab: NewsstandTab }
  | { type: "changeViewer"; viewer: ViewerMode }
  | { type: "openPress"; pressId: string }
  | { type: "setPage"; page: number }
  | { type: "subscribe"; pressId: string }
  | { type: "unsubscribe"; pressId: string };

function getStoredSubscribedIds(): Set<string> {
  try {
    const storedValue = window.localStorage.getItem(SUBSCRIBED_STORAGE_KEY);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return new Set();
    }

    return new Set(parsedValue.filter((item): item is string => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function getInitialState(): NewsstandState {
  const firstPress = presses[0];

  return {
    tab: "all",
    viewer: "grid",
    page: 0,
    opened: null,
    tabKey: firstPress.primaryCategoryKey,
    progress: 0,
    currentInTab: 0,
    subscribed: getStoredSubscribedIds(),
  };
}

function newsstandReducer(state: NewsstandState, action: NewsstandAction): NewsstandState {
  switch (action.type) {
    case "changeTab":
      return {
        ...state,
        tab: action.tab,
        page: 0,
        opened: null,
        progress: 0,
        currentInTab: 0,
      };

    case "changeViewer":
      return {
        ...state,
        viewer: action.viewer,
        opened: action.viewer === "grid" ? null : state.opened,
      };

    case "openPress": {
      const openedPress = presses.find((press) => press.id === action.pressId);

      return {
        ...state,
        viewer: "list",
        opened: action.pressId,
        tabKey: openedPress?.primaryCategoryKey ?? state.tabKey,
        progress: 0,
        currentInTab: 0,
      };
    }

    case "setPage":
      return {
        ...state,
        page: action.page,
      };

    case "subscribe":
      return {
        ...state,
        subscribed: new Set(state.subscribed).add(action.pressId),
      };

    case "unsubscribe": {
      const subscribed = new Set(state.subscribed);
      subscribed.delete(action.pressId);

      return {
        ...state,
        subscribed,
        opened: state.opened === action.pressId ? null : state.opened,
        viewer: state.opened === action.pressId ? "grid" : state.viewer,
      };
    }
  }
}

export function Newsstand() {
  const [state, dispatch] = useReducer(newsstandReducer, undefined, getInitialState);

  const visiblePresses = useMemo(() => {
    if (state.tab === "all") {
      return presses;
    }

    return presses.filter((press) => state.subscribed.has(press.id));
  }, [state.subscribed, state.tab]);

  const lastPage = getLastPage(visiblePresses.length, PAGE_SIZE);
  const currentPage = Math.min(state.page, lastPage);
  const pageItems = getPageItems(visiblePresses, currentPage, PAGE_SIZE);
  const openedPress = presses.find((press) => press.id === state.opened) ?? null;

  useEffect(() => {
    window.localStorage.setItem(SUBSCRIBED_STORAGE_KEY, JSON.stringify(Array.from(state.subscribed)));
  }, [state.subscribed]);

  useEffect(() => {
    if (state.page > lastPage) {
      dispatch({ type: "setPage", page: lastPage });
    }
  }, [lastPage, state.page]);

  return (
    <main className={styles.newsstand}>
      <Header />
      <Ticker items={tickerItems} />
      <TabBar
        activeTab={state.tab}
        subCount={state.subscribed.size}
        viewer={state.viewer}
        onTabChange={(tab) => dispatch({ type: "changeTab", tab })}
        onViewerChange={(viewer) => dispatch({ type: "changeViewer", viewer })}
      />
      <section className={styles.contentArea}>
        {openedPress ? (
          <PressOpen
            isSubscribed={state.subscribed.has(openedPress.id)}
            press={openedPress}
            onBack={() => dispatch({ type: "changeViewer", viewer: "grid" })}
            onSubscribe={() => dispatch({ type: "subscribe", pressId: openedPress.id })}
            onUnsubscribe={() => dispatch({ type: "unsubscribe", pressId: openedPress.id })}
          />
        ) : (
          <PressGrid
            activeTab={state.tab}
            items={pageItems}
            subscribedIds={state.subscribed}
            onOpen={(pressId) => dispatch({ type: "openPress", pressId })}
            onSubscribe={(pressId) => dispatch({ type: "subscribe", pressId })}
            onUnsubscribe={(pressId) => dispatch({ type: "unsubscribe", pressId })}
          />
        )}
      </section>
      <Chevron dir="left" disabled={currentPage === 0} onClick={() => dispatch({ type: "setPage", page: Math.max(0, currentPage - 1) })} />
      <Chevron dir="right" disabled={currentPage >= lastPage} onClick={() => dispatch({ type: "setPage", page: Math.min(lastPage, currentPage + 1) })} />
    </main>
  );
}
