import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

import "./Newsstand.css";

export function Newsstand() {
  return (
    <main className="newsstand-shell" aria-label="뉴스스탠드">
      <section className="newsstand-canvas">
        <header className="newsstand-header">
          <div className="newsstand-brand">
            <Newspaper aria-hidden="true" size={24} strokeWidth={1.8} />
            <h1>뉴스스탠드</h1>
          </div>
          <p className="newsstand-date">2026. 01. 14. 수요일</p>
        </header>

        <div className="newsstand-ticker-slot" aria-hidden="true" />
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
