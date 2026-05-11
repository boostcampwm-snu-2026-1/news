import React, { createContext, useContext, useState } from 'react';

type ViewMode = 'grid' | 'list';
type TabMode = 'all' | 'subs';

interface ViewContextType {
  viewMode: ViewMode;
  tabMode: TabMode;
  currentCategoryIndex: number;
  currentPressIndex: number;
  currentTabPageIndex: number; // New: For pagination of subscribed tabs
  setCurrentTabPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setViewMode: (mode: ViewMode) => void;
  setTabMode: (mode: TabMode) => void;
  setNavigation: (catIdx: number, pressIdx: number) => void;
  resetNavigation: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [tabMode, setTabMode] = useState<TabMode>('all');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPressIndex, setCurrentPressIndex] = useState(0);
  const [currentTabPageIndex, setCurrentTabPageIndex] = useState(0); // New state

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    resetNavigation();
  };

  const handleSetTabMode = (mode: TabMode) => {
    setTabMode(mode);
    resetNavigation();
  };

  const setNavigation = (catIdx: number, pressIdx: number) => {
    setCurrentCategoryIndex(catIdx);
    setCurrentPressIndex(pressIdx);
    // When navigating to a specific press, ensure its tab page is active
    // This logic might need refinement based on TAB_PAGE_SIZE
  };

  const resetNavigation = () => {
    setCurrentCategoryIndex(0);
    setCurrentPressIndex(0);
    setCurrentTabPageIndex(0); // Reset tab page index as well
  };

  return (
    <ViewContext.Provider 
      value={{ 
        viewMode, 
        tabMode, 
        currentCategoryIndex,
        currentPressIndex,
        setViewMode: handleSetViewMode, 
        setTabMode: handleSetTabMode, 
        currentTabPageIndex, // Provide new state
        setCurrentTabPageIndex, // Provide new setter
        setNavigation,
        resetNavigation 
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};