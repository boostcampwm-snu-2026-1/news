import { useState, useEffect } from 'react';

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
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % items.length);
          setIsTransitioning(false);
        }, 550);
      }, 3200);
      return () => clearInterval(intervalId);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [items.length, delay]);

  const currentItem = items[currentIndex];

  return (
    <div className="flex-1 flex items-center h-[49px] px-[24px] bg-[var(--color-soft)] gap-[var(--spacing-16)]">
      <span className="text-[14px] font-bold text-[var(--color-ink)] w-[56px] shrink-0">
        {currentItem.press}
      </span>
      <p 
        className={`text-[14px] font-medium text-[var(--color-ink)] whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentItem.title}
      </p>
    </div>
  );
};

const Ticker = () => {
  const leftItems = [
    { press: '연합뉴스', title: "[속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응" },
    { press: '연합뉴스', title: "오늘의 주요 뉴스 요약입니다." },
  ];
  const rightItems = [
    { press: '한국경제', title: "중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목" },
    { press: '한국경제', title: "반도체 시장 회복세 뚜렷… 수출 지표 개선" },
  ];

  return (
    <div className="flex w-[var(--width-content)] gap-[var(--spacing-8)] mt-[var(--spacing-40)]">
      <TickerLane items={leftItems} />
      <TickerLane items={rightItems} delay={1000} />
    </div>
  );
};

export default Ticker;
