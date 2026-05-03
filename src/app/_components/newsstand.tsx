"use client";

import { useEffect, useMemo, useState } from "react";
import type { Press, TickerItem } from "../_data/newsstand";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GridIcon,
  ListIcon,
  NewspaperIcon,
} from "./newsstand/icons";
import { ListPreview } from "./newsstand/list-preview";
import { PAGE_SIZE, PressGrid } from "./newsstand/press-grid";

type NewsstandProps = {
  initialPresses: Press[];
  tickerItems: TickerItem[];
};

const fixedDate = "2026. 01. 14. 수요일";

export function Newsstand({ initialPresses, tickerItems }: NewsstandProps) {
  const [presses, setPresses] = useState(initialPresses);
  const [activeTab, setActiveTab] = useState<"all" | "subscribed">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(0);

  const subscribedCount = presses.filter((press) => press.subscribed).length;
  const visiblePresses =
    activeTab === "all" ? presses : presses.filter((press) => press.subscribed);
  const totalPages = Math.max(1, Math.ceil(visiblePresses.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pagePresses = visiblePresses.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const pageLabel = useMemo(
    () => `${safePage + 1} / ${totalPages}`,
    [safePage, totalPages],
  );

  const changeTab = (nextTab: "all" | "subscribed") => {
    setActiveTab(nextTab);
    setPage(0);
  };

  const toggleSubscription = (id: string) => {
    setPresses((current) =>
      current.map((press) =>
        press.id === id ? { ...press, subscribed: !press.subscribed } : press,
      ),
    );
  };

  return (
    <main className="newsstand-shell">
      <Header />
      <Ticker items={tickerItems} />
      <section className="control-row" aria-label="뉴스스탠드 보기 설정">
        <div className="tab-cluster" role="tablist" aria-label="언론사 범위">
          <button
            className={activeTab === "all" ? "tab is-active" : "tab"}
            type="button"
            role="tab"
            aria-selected={activeTab === "all"}
            onClick={() => changeTab("all")}
          >
            전체 언론사
          </button>
          <button
            className={activeTab === "subscribed" ? "tab is-active" : "tab"}
            type="button"
            role="tab"
            aria-selected={activeTab === "subscribed"}
            onClick={() => changeTab("subscribed")}
          >
            내가 구독한 언론사
            <span className="count-badge">{subscribedCount}</span>
          </button>
        </div>
        <div className="view-toggle" aria-label="보기 방식">
          <button
            className={
              viewMode === "list" ? "icon-button is-active" : "icon-button"
            }
            type="button"
            aria-label="리스트 보기"
            title="리스트 보기"
            onClick={() => setViewMode("list")}
          >
            <ListIcon />
          </button>
          <button
            className={
              viewMode === "grid" ? "icon-button is-active" : "icon-button"
            }
            type="button"
            aria-label="그리드 보기"
            title="그리드 보기"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon />
          </button>
        </div>
      </section>
      <section className="content-stage" aria-label="언론사 목록">
        <button
          className="chevron chevron-left"
          type="button"
          aria-label="이전 페이지"
          disabled={safePage === 0}
          onClick={() => setPage((current) => Math.max(0, current - 1))}
        >
          <ChevronLeftIcon />
        </button>
        {viewMode === "grid" ? (
          <PressGrid
            mode={activeTab}
            presses={pagePresses}
            onToggleSubscription={toggleSubscription}
          />
        ) : (
          <ListPreview presses={pagePresses} pageLabel={pageLabel} />
        )}
        <button
          className="chevron chevron-right"
          type="button"
          aria-label="다음 페이지"
          disabled={safePage >= totalPages - 1}
          onClick={() =>
            setPage((current) => Math.min(totalPages - 1, current + 1))
          }
        >
          <ChevronRightIcon />
        </button>
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

function Ticker({ items }: { items: TickerItem[] }) {
  return (
    <section className="ticker" aria-label="자동 롤링 뉴스">
      <TickerLane items={items} offset={0} />
      <TickerLane items={items} offset={1} />
    </section>
  );
}

function TickerLane({ items, offset }: { items: TickerItem[]; offset: number }) {
  const [index, setIndex] = useState(offset % items.length);
  const item = items[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <article className="ticker-lane">
      <strong>{item.press}</strong>
      <span key={`${item.press}-${item.title}`} className="ticker-title">
        {item.title}
      </span>
    </article>
  );
}
