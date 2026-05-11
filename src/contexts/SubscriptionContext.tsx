import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  subscribedIds: string[];
  isSubscribed: (id: string) => boolean;
  subscribe: (id: string) => void;
  unsubscribe: (id: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'newsstand-subscriptions';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribedIds, setSubscribedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load subscriptions from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribedIds));
  }, [subscribedIds]);

  const isSubscribed = (id: string) => subscribedIds.includes(id);

  const subscribe = (id: string) => {
    if (!isSubscribed(id)) {
      setSubscribedIds((prev) => [...prev, id]);
    }
  };

  const unsubscribe = (id: string) => {
    setSubscribedIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <SubscriptionContext.Provider value={{ subscribedIds, isSubscribed, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};