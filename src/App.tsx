import { useState } from 'react';
import Header from './components/Header/Header';
import Ticker from './components/Ticker/Ticker';
import TabBar from './components/TabBar/TabBar';

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
      {/* 1주차 개발 예정 컴포넌트들이 위치할 곳입니다. */}
    </div>
  )
}

export default App
