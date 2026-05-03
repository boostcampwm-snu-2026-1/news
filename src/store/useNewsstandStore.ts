import { create } from 'zustand';

interface NewsstandState {
  tab: 'all' | 'sub';
  viewMode: 'grid' | 'list';
  page: number;
  opened: string | null;
  tabKey: string | null;
  progress: number;
  currentInTab: number;
  subscribed: string[];

  // Actions
  setTab: (tab: 'all' | 'sub') => void;
  setViewMode: (viewMode: 'grid' | 'list') => void;
  setPage: (page: number) => void;
  setOpened: (pressId: string | null) => void;
  subscribe: (pressId: string) => void;
  unsubscribe: (pressId: string) => void;
}

export const useNewsstandStore = create<NewsstandState>((set) => ({
  tab: 'all',
  viewMode: 'grid',
  page: 1,
  opened: null,
  tabKey: null,
  progress: 0,
  currentInTab: 0,
  subscribed: [],

  setTab: (tab) => set({ tab, page: 1 }),
  setViewMode: (viewMode) => set({ viewMode, page: 1 }),
  setPage: (page) => set({ page }),
  setOpened: (pressId) => set({ opened: pressId }),
  subscribe: (pressId) =>
    set((state) => ({
      subscribed: [...state.subscribed, pressId],
    })),
  unsubscribe: (pressId) =>
    set((state) => ({
      subscribed: state.subscribed.filter((id) => id !== pressId),
    })),
}));
