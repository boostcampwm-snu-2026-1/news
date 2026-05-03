import { useState } from 'react';
import Header from './components/Header/Header';
import Ticker from './components/Ticker/Ticker';
import TabBar from './components/TabBar/TabBar';
import PressGrid from './components/PressGrid/PressGrid';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [subscribedIds, setSubscribedIds] = useState(new Set());

  const toggleSubscription = (id) => {
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

export default App;
