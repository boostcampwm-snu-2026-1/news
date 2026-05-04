import React from 'react';
import styles from './Header.module.css';
import { formatDate } from '@/utils/formatDate';
import LogoIcon from '@/assets/LogoIcon';

const Header: React.FC = () => {
  const currentDate = formatDate(new Date());

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <a href="/" className={styles.logoLink}>
          <LogoIcon />
          <h1 className={styles.title}>뉴스스탠드</h1>
        </a>
      </div>
      <div className={styles.dateArea}>
        <span className={styles.date}>{currentDate}</span>
      </div>
    </header>
  );
};

export default Header;