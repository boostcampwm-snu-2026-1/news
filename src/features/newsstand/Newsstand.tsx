import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Header } from "./components/Header";
import { PressGrid } from "./components/PressGrid";
import { TabBar, type NewsstandTab, type ViewerMode } from "./components/TabBar";
import { Ticker } from "./components/Ticker";
import { presses } from "./data/presses";
import { tickerItems } from "./data/tickerItems";
import "./Newsstand.css";

export function Newsstand() {
  const [activeTab, setActiveTab] = useState<NewsstandTab>("all");
  const [viewer, setViewer] = useState<ViewerMode>("grid");
  const subscribedCount = presses.filter((press) => press.subscribed).length;

  return (
    <main className="newsstand-shell" aria-label="뉴스스탠드">
      <section className="newsstand-canvas">
        <Header date={new Date(2026, 0, 14)} />

        <Ticker items={tickerItems} />
        <TabBar
          activeTab={activeTab}
          subCount={subscribedCount}
          viewer={viewer}
          onTabChange={setActiveTab}
          onViewerChange={setViewer}
        />
        <div className="newsstand-content-slot" aria-label="뉴스스탠드 구현 영역">
          <PressGrid items={presses.slice(0, 24)} />
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
