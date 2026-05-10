import { useState } from 'react';
import Header from './components/layout/Header/Header';
import Ticker from './components/ticker/Ticker';
import TabBar from './components/layout/TabBar/TabBar';
import PressGrid from './components/grid/PressGrid/PressGrid';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'sub'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set());

  const toggleSubscription = (id: string) => {
    setSubscribedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center w-[var(--width-layout)] min-h-screen">
      <Header />
      <Ticker />
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        subscribedCount={subscribedIds.size}
      />
      {viewMode === 'grid' && (
        <PressGrid 
          subscribedIds={subscribedIds} 
          onToggleSubscription={toggleSubscription} 
        />
      )}
    </div>
  )
}

export default App;
