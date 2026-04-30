import { useState } from 'react';
import TabBar from './TabBar';
import PressGrid from './PressGrid';
import pressList from '../data/pressList';
import styles from './NewsStand.module.css';

const ITEMS_PER_PAGE = 24;

export default function NewsStand() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(null);

  const displayList = activeTab === 'all' ? pressList : [];
  const totalPages = Math.ceil(displayList.length / ITEMS_PER_PAGE);
  const pageItems = displayList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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
        items={pageItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        direction={direction}
        isEmpty={activeTab === 'subscribed' && displayList.length === 0}
      />
    </div>
  );
}
