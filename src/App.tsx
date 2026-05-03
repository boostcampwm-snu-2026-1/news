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

  return (
    <div className="newsstand">
      <Header />
      <Ticker />
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      {viewMode === 'grid' && <PressGrid />}
    </div>
  )
}

export default App
