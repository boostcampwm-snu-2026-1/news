import { useState } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import TabBar from './components/TabBar';
import PressGrid from './components/PressGrid';
import CategoryTabBar from './components/CategoryTabBar';
import PressNewsCard from './components/PressNewsCard';
import { useSubscription } from './hooks/useSubscription';
import { useListView } from './hooks/useListView';
import type { TabKind, ViewKind } from './types';

function App() {
  const [tab, setTab] = useState<TabKind>('all');
  const [view, setView] = useState<ViewKind>('grid');
  const { subscribedIds, toggleSubscription, subscribedCount } = useSubscription();
  const listView = useListView(tab, subscribedIds);

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
      {view === 'list' && (
        <>
          <CategoryTabBar
            activeCategory={listView.activeCategory}
            pressIndex={listView.pressIndex}
            pressTotal={listView.pressTotal}
            progress={listView.progress}
            onCategoryChange={listView.onCategoryChange}
          />
          {listView.currentPress && (
            <PressNewsCard
              press={listView.currentPress}
              isSubscribed={subscribedIds.has(listView.currentPress.id)}
              onToggleSubscription={toggleSubscription}
              onNext={listView.advancePressIndex}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
