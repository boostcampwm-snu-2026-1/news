import { useEffect, useMemo, useReducer, useState } from "react";
import pressData from "../../data/press.json";
import type { Press, PressId } from "../../state/types";
import {
  initialNewsstandState,
  newsstandReducer,
} from "../../state/newsstandReducer";
import { loadFromStorage, saveToStorage } from "../../hooks/useLocalStorage";
import { Header } from "../Header/Header";
import { Ticker } from "../Ticker/Ticker";
import { TabBar, type ViewerId } from "../TabBar/TabBar";
import { PressGrid } from "../PressGrid/PressGrid";
import { Chevron } from "../Chevron/Chevron";

const STORAGE_KEY = "newsstand:subscribed";
const PER_PAGE = 24;
const ALL_PRESS = pressData as Press[];

export function Newsstand() {
  const [state, dispatch] = useReducer(
    newsstandReducer,
    initialNewsstandState,
    (init) => ({ ...init, subscribed: loadFromStorage<PressId[]>(STORAGE_KEY, []) }),
  );
  const [viewer, setViewer] = useState<ViewerId>("grid");

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state.subscribed);
  }, [state.subscribed]);

  const visible = useMemo(() => {
    if (state.tab === "all") return ALL_PRESS;
    const set = new Set(state.subscribed);
    return ALL_PRESS.filter((p) => set.has(p.id));
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

  return (
    <div className="canvas">
      <Header date="2026. 01. 14. 수요일" />
      <Ticker />
      <TabBar
        activeTab={state.tab}
        subCount={state.subscribed.length}
        viewer={viewer}
        onTabChange={(tab) => dispatch({ type: "tab/set", tab })}
        onViewerChange={setViewer}
      />
      <div className="contentCol contentArea">
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
      </div>
      <Chevron
        dir="left"
        disabled={safePage <= 0}
        onClick={() => dispatch({ type: "page/prev" })}
      />
      <Chevron
        dir="right"
        disabled={safePage >= lastPage}
        onClick={() => dispatch({ type: "page/next" })}
      />
    </div>
  );
}
