import { useState } from 'react';
import Header from './components/Header/Header';
import Ticker from './components/Ticker/Ticker';
import TabBar from './components/TabBar/TabBar';
import PressGrid from './components/PressGrid/PressGrid';

export type TabType = 'all' | 'sub';
export type ViewMode = 'grid' | 'list';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
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
    <div className="newsstand">
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

export default App
