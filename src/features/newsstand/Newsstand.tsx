import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Header } from "./components/Header";
import { OpenedPress } from "./components/OpenedPress";
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
  const [pageByTab, setPageByTab] = useState<Record<NewsstandTab, number>>({ all: 0, subscribed: 0 });
  const [subscribed, setSubscribed] = useState<Set<string>>(
    () => new Set(presses.filter((press) => press.subscribed).map((press) => press.id)),
  );
  const [selectedPressId, setSelectedPressId] = useState<string | null>(null);

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
  const sourceItems = isSubscribedTab ? subscribedPresses : presses;
  const totalPages = Math.max(1, Math.ceil(sourceItems.length / PAGE_SIZE));
  const currentPage = Math.min(pageByTab[activeTab], totalPages - 1);
  const pageStart = currentPage * PAGE_SIZE;
  const gridItems = sourceItems.slice(pageStart, pageStart + PAGE_SIZE);

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const goPrev = () => setPageByTab((prev) => ({ ...prev, [activeTab]: currentPage - 1 }));
  const goNext = () => setPageByTab((prev) => ({ ...prev, [activeTab]: currentPage + 1 }));

  const selectedPress = useMemo(
    () => (selectedPressId ? presses.find((press) => press.id === selectedPressId) ?? null : null),
    [selectedPressId],
  );

  const handleTabChange = (tab: NewsstandTab) => {
    setActiveTab(tab);
    setSelectedPressId(null);
  };

  return (
    <main className="newsstand-shell" aria-label="뉴스스탠드">
      <section className="newsstand-canvas">
        <Header date={new Date(2026, 0, 14)} />

        <Ticker items={tickerItems} />
        <TabBar
          activeTab={activeTab}
          subCount={subscribed.size}
          viewer={viewer}
          onTabChange={handleTabChange}
          onViewerChange={setViewer}
        />
        <div className="newsstand-content-slot" aria-label="뉴스스탠드 구현 영역">
          {selectedPress ? (
            <OpenedPress
              press={selectedPress}
              isSubscribed={subscribed.has(selectedPress.id)}
              onToggleSubscribe={toggleSubscribe}
              onClose={() => setSelectedPressId(null)}
            />
          ) : (
            <PressGrid
              action={isSubscribedTab ? "unsubscribe" : "subscribe"}
              items={gridItems}
              pageSize={PAGE_SIZE}
              ariaLabel={isSubscribedTab ? "내가 구독한 언론사" : "전체 언론사"}
              onToggle={toggleSubscribe}
              onOpen={setSelectedPressId}
            />
          )}
        </div>

        {!selectedPress && (
          <>
            <button
              className="newsstand-chevron newsstand-chevron-left"
              type="button"
              aria-label={`이전 페이지 (${currentPage} / ${totalPages})`}
              disabled={!canPrev}
              onClick={goPrev}
            >
              <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.4} />
            </button>
            <button
              className="newsstand-chevron newsstand-chevron-right"
              type="button"
              aria-label={`다음 페이지 (${currentPage + 2} / ${totalPages})`}
              disabled={!canNext}
              onClick={goNext}
            >
              <ChevronRight aria-hidden="true" size={24} strokeWidth={1.4} />
            </button>
          </>
        )}
      </section>
    </main>
  );
}
