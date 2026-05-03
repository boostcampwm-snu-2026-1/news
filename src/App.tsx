import { useState } from 'react';
import { Header } from './components/Header/Header';
import { TabBar, type TabType } from './components/TabBar/TabBar';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container-page py-6">
        <p className="text-text-secondary text-sm">
          {activeTab === 'all' ? '전체 언론사 목록' : '구독한 언론사 목록'}
        </p>
      </main>
    </div>
  );
}

export default App;
