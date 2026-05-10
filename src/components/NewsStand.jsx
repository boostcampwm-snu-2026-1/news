import { useState } from 'react';
import TabBar from './TabBar';
import PressGrid from './PressGrid';
import pressList from '../data/pressList';
import { useSubscriptions } from '../hooks/useSubscriptions';
import styles from './NewsStand.module.css';

const ITEMS_PER_PAGE = 24;

export default function NewsStand() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(null);
  const { subscribedIds, subscribe, unsubscribe } = useSubscriptions();

  const displayList = activeTab === 'all'
    ? pressList
    : pressList.filter((p) => subscribedIds.has(p.id));
  const totalPages = Math.max(1, Math.ceil(displayList.length / ITEMS_PER_PAGE));
  const pageItems = displayList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const paddedPageItems = activeTab === 'subscribed' && pageItems.length > 0
    ? [...pageItems, ...Array(ITEMS_PER_PAGE - pageItems.length).fill(null)]
    : pageItems;

  const handlePageChange = (nextPage) => {
    setDirection(nextPage > currentPage ? 'next' : 'prev');
    setCurrentPage(nextPage);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0);
    setDirection(null);
  };

  return (
    <div className={styles.container}>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <PressGrid
        items={paddedPageItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        direction={direction}
        isEmpty={activeTab === 'subscribed' && displayList.length === 0}
        subscribedIds={subscribedIds}
        onSubscribe={subscribe}
        onUnsubscribe={unsubscribe}
      />
    </div>
  );
}
