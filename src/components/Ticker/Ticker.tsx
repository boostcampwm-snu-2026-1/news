import { useState, useEffect } from 'react';
import styles from './Ticker.module.css';

interface TickerItem {
  press: string;
  title: string;
}

interface TickerLaneProps {
  items: TickerItem[];
  delay?: number;
}

const TickerLane = ({ items, delay = 0 }: TickerLaneProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // delay만큼 기다린 후 인터벌 시작 (두 레인의 오프셋을 위함)
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);
        
        // 애니메이션 중간에 데이터를 바꾸기 위해 약간의 지연 후 인덱스 업데이트
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % items.length);
          setIsTransitioning(false);
        }, 550); // crossfade 시간인 0.55s와 맞춤
        
      }, 3200);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [items.length, delay]);

  const currentItem = items[currentIndex];

  return (
    <div className={styles.lane}>
      <span className={styles.press}>{currentItem.press}</span>
      <p className={`${styles.title} ${isTransitioning ? styles.fadeOut : ''}`}>
        {currentItem.title}
      </p>
    </div>
  );
};

const Ticker = () => {
  // 임시 데이터 (나중에 외부 데이터로 교체 가능)
  const leftItems = [
    { press: '연합뉴스', title: "[속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응" },
    { press: '연합뉴스', title: "오늘의 주요 뉴스 요약입니다." },
  ];
  const rightItems = [
    { press: '한국경제', title: "중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목" },
    { press: '한국경제', title: "반도체 시장 회복세 뚜렷… 수출 지표 개선" },
  ];

  return (
    <div className={styles.tickerContainer}>
      <TickerLane items={leftItems} />
      <TickerLane items={rightItems} delay={1000} /> {/* 1초 오프셋 적용 */}
    </div>
  );
};

export default Ticker;
