import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Ticker } from "./components/Ticker/Ticker";
import { TabBar, type TabId, type ViewerId } from "./components/TabBar/TabBar";

export default function App() {
  const [tab, setTab] = useState<TabId>("all");
  const [viewer, setViewer] = useState<ViewerId>("grid");
  return (
    <div className="canvas">
      <Header date="2026. 01. 14. 수요일" />
      <Ticker />
      <TabBar
        activeTab={tab}
        subCount={0}
        viewer={viewer}
        onTabChange={setTab}
        onViewerChange={setViewer}
      />
    </div>
  );
}
