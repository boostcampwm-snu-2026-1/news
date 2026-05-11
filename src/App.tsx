import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/Header/Header';
import Ticker from '@/components/Ticker/Ticker';
import GridView from '@/components/Grid/GridView';
import ListView from '@/components/ListView/ListView';
import ViewModeTab from '@/components/ViewModeTab/ViewModeTab';
import styles from './App.module.css';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { ViewProvider, useView } from '@/contexts/ViewContext';

const AppContent: React.FC = () => {
  const { viewMode } = useView();

  return (
    <MainLayout>
      <Header />
      <section className={styles.tickerSection}>
        <Ticker />
      </section>
      <main className={styles.mainContent}>
        <ViewModeTab />
        {viewMode === 'grid' ? <GridView /> : <ListView />}
      </main>
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <SubscriptionProvider>
      <ViewProvider>
        <AppContent />
      </ViewProvider>
    </SubscriptionProvider>
  );
};

export default App;