import React from 'react';
import styles from './Ticker.module.css';
import TickerLine from './TickerLine';
import { TICKER_NEWS } from '@/constants/tickerData';

const Ticker: React.FC = () => {
  return (
    <div className={styles.tickerContainer}>
      <TickerLine press={TICKER_NEWS.left.press} headlines={TICKER_NEWS.left.headlines} />
      <TickerLine press={TICKER_NEWS.right.press} headlines={TICKER_NEWS.right.headlines} />
    </div>
  );
};

export default Ticker;