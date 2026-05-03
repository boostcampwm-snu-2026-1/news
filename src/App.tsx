import { useState } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import PressGrid from './components/PressGrid';
import TabBar from './components/TabBar';
import { PRESS_LIST } from './data/mockData';
import type { TabKind, ViewKind } from './types';

const EMPTY_PRESS_LIST: typeof PRESS_LIST = [];

function App() {
  const [tab, setTab] = useState<TabKind>('all');
  const [view, setView] = useState<ViewKind>('grid');
  const gridPresses = tab === 'all' ? PRESS_LIST : EMPTY_PRESS_LIST;

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
      {view === 'grid' && <PressGrid key={tab} presses={gridPresses} />}
    </div>
  );
}

export default App;
