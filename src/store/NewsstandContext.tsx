import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type TabType = 'all' | 'sub';
type ViewModeType = 'grid' | 'list';

interface NewsstandContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  viewMode: ViewModeType;
  setViewMode: (mode: ViewModeType) => void;
  subscribedIds: Set<string>;
  toggleSubscription: (id: string) => void;
}

const NewsstandContext = createContext<NewsstandContextType | undefined>(undefined);

export const NewsstandProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewMode, setViewMode] = useState<ViewModeType>('grid');
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
    <NewsstandContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        subscribedIds,
        toggleSubscription,
      }}
    >
      {children}
    </NewsstandContext.Provider>
  );
};

export const useNewsstandStore = () => {
  const context = useContext(NewsstandContext);
  if (context === undefined) {
    throw new Error('useNewsstandStore must be used within a NewsstandProvider');
  }
  return context;
};
