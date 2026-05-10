import { useState } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import TabBar from './components/TabBar';
import PressGrid from './components/PressGrid';
import type { TabKind, ViewKind } from './types';

function App() {
  const [tab, setTab] = useState<TabKind>('all');
  const [view, setView] = useState<ViewKind>('grid');
  const subscribedIds = new Set<string>();

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <NewsTicker />
      <TabBar
        tab={tab}
        view={view}
        subscribedCount={subscribedIds.size}
        onTabChange={setTab}
        onViewChange={setView}
      />
      {view === 'grid' && (
        <PressGrid
          key={tab}
          tab={tab}
          subscribedIds={subscribedIds}
          onToggleSubscription={() => {}}
        />
      )}
    </div>
  );
}

export default App;
