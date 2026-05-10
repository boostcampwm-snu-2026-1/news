import { useState } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import TabBar from './components/TabBar';
import PressGrid from './components/PressGrid';
import { useSubscription } from './hooks/useSubscription';
import type { TabKind, ViewKind } from './types';

function App() {
  const [tab, setTab] = useState<TabKind>('all');
  const [view, setView] = useState<ViewKind>('grid');
  const { subscribedIds, toggleSubscription, subscribedCount } = useSubscription();

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <NewsTicker />
      <TabBar
        tab={tab}
        view={view}
        subscribedCount={subscribedCount}
        onTabChange={setTab}
        onViewChange={setView}
      />
      {view === 'grid' && (
        <PressGrid
          key={tab}
          tab={tab}
          subscribedIds={subscribedIds}
          onToggleSubscription={toggleSubscription}
        />
      )}
    </div>
  );
}

export default App;
