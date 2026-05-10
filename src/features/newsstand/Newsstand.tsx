import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Header } from "./components/Header";
import { PressGrid } from "./components/PressGrid";
import { TabBar, type NewsstandTab, type ViewerMode } from "./components/TabBar";
import { Ticker } from "./components/Ticker";
import { presses } from "./data/presses";
import { tickerItems } from "./data/tickerItems";
import "./Newsstand.css";

const PAGE_SIZE = 24;

export function Newsstand() {
  const [activeTab, setActiveTab] = useState<NewsstandTab>("all");
  const [viewer, setViewer] = useState<ViewerMode>("grid");
  const [subscribed, setSubscribed] = useState<Set<string>>(
    () => new Set(presses.filter((press) => press.subscribed).map((press) => press.id)),
  );

  const toggleSubscribe = useCallback((pressId: string) => {
    setSubscribed((prev) => {
      const next = new Set(prev);
      if (next.has(pressId)) {
        next.delete(pressId);
      } else {
        next.add(pressId);
      }
      return next;
    });
  }, []);

  const subscribedPresses = useMemo(
    () => presses.filter((press) => subscribed.has(press.id)),
    [subscribed],
  );

  const isSubscribedTab = activeTab === "subscribed";
  const gridItems = isSubscribedTab ? subscribedPresses.slice(0, PAGE_SIZE) : presses.slice(0, PAGE_SIZE);

  return (
    <main className="newsstand-shell" aria-label="뉴스스탠드">
      <section className="newsstand-canvas">
        <Header date={new Date(2026, 0, 14)} />

        <Ticker items={tickerItems} />
        <TabBar
          activeTab={activeTab}
          subCount={subscribed.size}
          viewer={viewer}
          onTabChange={setActiveTab}
          onViewerChange={setViewer}
        />
        <div className="newsstand-content-slot" aria-label="뉴스스탠드 구현 영역">
          <PressGrid
            action={isSubscribedTab ? "unsubscribe" : "subscribe"}
            items={gridItems}
            sparse={isSubscribedTab}
            pageSize={PAGE_SIZE}
            ariaLabel={isSubscribedTab ? "내가 구독한 언론사" : "전체 언론사"}
            onToggle={toggleSubscribe}
          />
        </div>

        <button className="newsstand-chevron newsstand-chevron-left" type="button" aria-label="이전 페이지">
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.4} />
        </button>
        <button className="newsstand-chevron newsstand-chevron-right" type="button" aria-label="다음 페이지">
          <ChevronRight aria-hidden="true" size={24} strokeWidth={1.4} />
        </button>
      </section>
    </main>
  );
}
