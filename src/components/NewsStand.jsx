import { useState } from 'react';
import TabBar from './TabBar';
import PressGrid from './PressGrid';
import pressList from '../data/pressList';
import styles from './NewsStand.module.css';

export default function NewsStand() {
  const [activeTab, setActiveTab] = useState('all');

  const displayList = activeTab === 'all' ? pressList.slice(0, 24) : [];

  return (
    <div className={styles.container}>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <PressGrid items={displayList} />
    </div>
  );
}
