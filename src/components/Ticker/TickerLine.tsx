import React, { useState, useEffect, useRef } from 'react';
import styles from './TickerLine.module.css';
import { TICKER_INTERVAL } from '@/constants/tickerData';

interface TickerLineProps {
  press: string;
  headlines: string[];
}

const TickerLine: React.FC<TickerLineProps> = ({ press, headlines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, TICKER_INTERVAL);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    }
    return () => stopTimer();
  }, [isPaused, headlines.length]);

  return (
    <div 
      className={styles.lineWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className={styles.pressName}>{press}</span>
      <div className={styles.newsContent}>
        {headlines.map((title, index) => (
          <a 
            key={index} 
            className={`${styles.newsTitle} ${index === currentIndex ? styles.active : ''}`}
            href="#"
          >
            {title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TickerLine;