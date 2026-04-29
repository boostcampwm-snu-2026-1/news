"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Press, TickerItem, Wordmark } from "../_data/newsstand";

type NewsstandProps = {
  initialPresses: Press[];
  tickerItems: TickerItem[];
};

const PAGE_SIZE = 24;
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
            className={viewMode === "list" ? "icon-button is-active" : "icon-button"}
            type="button"
            aria-label="리스트 보기"
            title="리스트 보기"
            onClick={() => setViewMode("list")}
          >
            <ListIcon />
          </button>
          <button
            className={viewMode === "grid" ? "icon-button is-active" : "icon-button"}
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

function PressGrid({
  presses,
  mode,
  onToggleSubscription,
}: {
  presses: Press[];
  mode: "all" | "subscribed";
  onToggleSubscription: (id: string) => void;
}) {
  return (
    <div className="press-grid" role="list">
      {presses.map((press) => (
        <article className="press-cell" key={press.id} role="listitem">
          <PressWordmark name={press.name} wordmark={press.wordmark} />
          <button
            className="subscribe-pill"
            type="button"
            onClick={() => onToggleSubscription(press.id)}
          >
            {mode === "subscribed" || press.subscribed ? (
              <>
                <MinusIcon />
                해지하기
              </>
            ) : (
              <>
                <PlusIcon />
                구독하기
              </>
            )}
          </button>
        </article>
      ))}
      {Array.from({ length: PAGE_SIZE - presses.length }).map((_, index) => (
        <div className="press-cell is-empty" key={`empty-${index}`} />
      ))}
    </div>
  );
}

function PressWordmark({
  name,
  wordmark = {},
}: {
  name: string;
  wordmark?: Wordmark;
}) {
  const chars = Array.from(name);
  const style = {
    "--wordmark-color": wordmark.color ?? "var(--ink-alt)",
    "--wordmark-bg": wordmark.bg ?? "transparent",
    "--wordmark-weight": wordmark.weight ?? 500,
    "--wordmark-family":
      wordmark.family === "serif" ? "var(--font-serif)" : "var(--font-sans)",
    "--wordmark-tracking": wordmark.latin
      ? "0"
      : (wordmark.tracking ?? "-0.01em"),
  } as CSSProperties;

  return (
    <span
      className={[
        "wordmark",
        wordmark.bg ? "has-bg" : "",
        wordmark.italic ? "is-italic" : "",
        wordmark.underline ? "is-underlined" : "",
        wordmark.small ? "is-small" : "",
      ].join(" ")}
      style={style}
    >
      {chars.map((char, index) => {
        const accented = index === wordmark.accentChar;
        const underlined = wordmark.accentUnder?.includes(index);
        return (
          <span
            className={[
              accented ? "is-accented" : "",
              underlined ? "is-accent-underlined" : "",
              accented && wordmark.accentBg ? "has-accent-bg" : "",
            ].join(" ")}
            style={
              accented && wordmark.accent
                ? ({ "--accent-char": wordmark.accent } as CSSProperties)
                : undefined
            }
            key={`${char}-${index}`}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        );
      })}
      {wordmark.flag ? <span className="flag-glyph" aria-hidden="true" /> : null}
    </span>
  );
}

function ListPreview({
  presses,
  pageLabel,
}: {
  presses: Press[];
  pageLabel: string;
}) {
  const first = presses[0];

  return (
    <section className="list-preview">
      <div className="field-tabs">
        {["종합/경제", "방송/통신", "IT", "스포츠/연예", "매거진/전문지", "지역"].map(
          (category, index) => (
            <span className={index === 0 ? "field-tab is-active" : "field-tab"} key={category}>
              {category}
              {index === 0 ? <b>{pageLabel}</b> : null}
            </span>
          ),
        )}
      </div>
      <div className="opened-press">
        <div className="opened-meta">
          <strong>{first?.name ?? "언론사"}</strong>
          <span>2026.01.14. 18:53 편집</span>
          <button type="button">구독하기</button>
        </div>
        <div className="opened-body">
          <div className="headline-image">headline image</div>
          <ul>
            <li>출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다</li>
            <li>&quot;기다림이 폭신해졌어요&quot; 동네 버스정류장 의자, 새 단장</li>
            <li>데이터 걱정 내려놓기 실험... 통신사, 마음 편한 요금제 선보여</li>
            <li>잠들기 전에 보는 조용한 영상 한 편... OTT, 힐링 추천 기능 도입</li>
            <li>&quot;길 잃지 않게 도와줄게요&quot; 친절해진 환승 안내 목소리</li>
          </ul>
        </div>
        <p>{first?.name ?? "선택한 언론사"} 언론사에서 직접 편집한 뉴스입니다.</p>
      </div>
    </section>
  );
}

function NewspaperIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5h13.5v13H4z" />
      <path d="M17.5 8H20v9a1.5 1.5 0 0 1-1.5 1.5h-1" />
      <path d="M7 8.5h7.5M7 12h7.5M7 15.5h4" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7h11M8 12h11M8 17h11" />
      <path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h5.5v5.5H5zM13.5 5H19v5.5h-5.5zM5 13.5h5.5V19H5zM13.5 13.5H19V19h-5.5z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 40" aria-hidden="true">
      <path d="m15 11-7 9 7 9" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 40" aria-hidden="true">
      <path d="m9 11 7 9-7 9" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 1.5v7M1.5 5h7" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 5h7" />
    </svg>
  );
}
