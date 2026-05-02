import { Newspaper } from "lucide-react";

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
        <div className="newsstand-placeholder" aria-label="뉴스스탠드 구현 영역" />
      </section>
    </main>
  );
}
