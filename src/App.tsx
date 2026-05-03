import { useState } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import TabBar from './components/TabBar';
import type { TabKind, ViewKind } from './types';

function App() {
  const [tab, setTab] = useState<TabKind>('all');
  const [view, setView] = useState<ViewKind>('grid');

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <NewsTicker />
      <TabBar
        tab={tab}
        view={view}
        subscribedCount={0}
        onTabChange={setTab}
        onViewChange={setView}
      />
    </div>
  );
}

export default App;
