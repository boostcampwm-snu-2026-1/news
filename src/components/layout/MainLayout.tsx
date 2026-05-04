import React from 'react';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainLayout;