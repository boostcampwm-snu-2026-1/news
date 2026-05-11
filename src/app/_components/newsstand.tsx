"use client";

import { useEffect, useReducer, useState } from "react";
import {
  pressCategories,
  type Press,
  type TickerItem,
} from "../_data/newsstand";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GridIcon,
  ListIcon,
  NewspaperIcon,
} from "./newsstand/icons";
import { ListPreview } from "./newsstand/list-preview";
import { PressGrid } from "./newsstand/press-grid";
import {
  AUTO_ROTATE_MS,
  createInitialNewsstandState,
  deriveNewsstandState,
  newsstandReducer,
} from "./newsstand/state";

type NewsstandProps = {
  initialPresses: Press[];
  tickerItems: TickerItem[];
};

const fixedDate = "2026. 01. 14. 수요일";

export function Newsstand({ initialPresses, tickerItems }: NewsstandProps) {
  const [state, dispatch] = useReducer(
    newsstandReducer,
    initialPresses,
    createInitialNewsstandState,
  );
  const [tickerSeed, setTickerSeed] = useState(0);

  const derived = deriveNewsstandState(state);
  const selectedPressId = derived.selectedPress?.id;

  useEffect(() => {
    if (state.viewMode !== "list" || !selectedPressId) {
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch({ type: "advance-list" });
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [
    selectedPressId,
    state.activeCategory,
    state.listTick,
    state.viewMode,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTickerSeed((current) => current + 1);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="newsstand-shell">
      <Header />
      <Ticker items={tickerItems} tickerSeed={tickerSeed} />
      <section className="control-row" aria-label="뉴스스탠드 보기 설정">
        <div className="tab-cluster" role="tablist" aria-label="언론사 범위">
          <button
            className={state.activeTab === "all" ? "tab is-active" : "tab"}
            data-scope-tab="all"
            type="button"
            role="tab"
            aria-selected={state.activeTab === "all"}
            onClick={() => dispatch({ type: "change-tab", tab: "all" })}
          >
            전체 언론사
          </button>
          <button
            className={
              state.activeTab === "subscribed" ? "tab is-active" : "tab"
            }
            data-scope-tab="subscribed"
            type="button"
            role="tab"
            aria-selected={state.activeTab === "subscribed"}
            onClick={() =>
              dispatch({ type: "change-tab", tab: "subscribed" })
            }
          >
            내가 구독한 언론사
            <span className="count-badge">{derived.subscribedCount}</span>
          </button>
        </div>
        <div className="view-toggle" aria-label="보기 방식">
          <button
            className={
              state.viewMode === "list" ? "icon-button is-active" : "icon-button"
            }
            data-view-toggle="list"
            type="button"
            aria-label="리스트 보기"
            title="리스트 보기"
            onClick={() => dispatch({ type: "change-view", viewMode: "list" })}
          >
            <ListIcon />
          </button>
          <button
            className={
              state.viewMode === "grid" ? "icon-button is-active" : "icon-button"
            }
            data-view-toggle="grid"
            type="button"
            aria-label="그리드 보기"
            title="그리드 보기"
            onClick={() => dispatch({ type: "change-view", viewMode: "grid" })}
          >
            <GridIcon />
          </button>
        </div>
      </section>
      <section className="content-stage" aria-label="언론사 목록">
        {state.viewMode === "grid" ? (
          <>
            <button
              className="chevron chevron-left"
              type="button"
              aria-label="이전 페이지"
              disabled={derived.safePage === 0}
              onClick={() =>
                dispatch({ type: "change-page", page: derived.safePage - 1 })
              }
            >
              <ChevronLeftIcon />
            </button>
            <PressGrid
              mode={state.activeTab}
              presses={derived.pagePresses}
              onOpenPress={(id) => dispatch({ type: "open-press", id })}
              onToggleSubscription={(id) =>
                dispatch({ type: "toggle-subscription", id })
              }
            />
            <button
              className="chevron chevron-right"
              type="button"
              aria-label="다음 페이지"
              disabled={derived.safePage >= derived.totalPages - 1}
              onClick={() =>
                dispatch({ type: "change-page", page: derived.safePage + 1 })
              }
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : (
          <ListPreview
            activeCategory={state.activeCategory}
            categories={pressCategories.map((category) => ({
              category,
              count: derived.pressesByCategory[category].length,
            }))}
            emptyStateLabel={
              state.activeTab === "subscribed"
                ? "구독한 언론사가 없어 리스트 뷰를 표시할 수 없습니다."
                : "선택 가능한 언론사가 없어 리스트 뷰를 표시할 수 없습니다."
            }
            onSelectCategory={(category) =>
              dispatch({ type: "select-category", category })
            }
            onToggleSubscription={(id) =>
              dispatch({ type: "toggle-subscription", id })
            }
            progressKey={derived.progressKey}
            progressLabel={derived.progressLabel}
            selectedPress={derived.selectedPress}
          />
        )}
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="newsstand-header">
      <div className="brand">
        <NewspaperIcon />
        <h1>뉴스스탠드</h1>
      </div>
      <time dateTime="2026-01-14">{fixedDate}</time>
    </header>
  );
}

function Ticker({
  items,
  tickerSeed,
}: {
  items: TickerItem[];
  tickerSeed: number;
}) {
  return (
    <section className="ticker" aria-label="자동 롤링 뉴스">
      <TickerLane items={items} tickerSeed={tickerSeed} offset={0} />
      <TickerLane items={items} tickerSeed={tickerSeed} offset={1} />
    </section>
  );
}

function TickerLane({
  items,
  tickerSeed,
  offset,
}: {
  items: TickerItem[];
  tickerSeed: number;
  offset: number;
}) {
  const item = items[(tickerSeed + offset) % items.length];

  return (
    <article className="ticker-lane">
      <strong>{item.press}</strong>
      <span key={`${tickerSeed}-${item.press}-${item.title}`} className="ticker-title">
        {item.title}
      </span>
    </article>
  );
}
