import { ChevronLeft, ChevronRight } from "lucide-react";

import { Header } from "./components/Header";
import { Ticker } from "./components/Ticker";
import { tickerItems } from "./data/tickerItems";
import "./Newsstand.css";

export function Newsstand() {
  return (
    <main className="newsstand-shell" aria-label="뉴스스탠드">
      <section className="newsstand-canvas">
        <Header date={new Date(2026, 0, 14)} />

        <Ticker items={tickerItems} />
        <div className="newsstand-tabbar-slot" aria-hidden="true" />
        <div className="newsstand-content-slot" aria-label="뉴스스탠드 구현 영역" />

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
