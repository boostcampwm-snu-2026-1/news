import { useEffect, useState } from 'react';

const mockLeftNews = [
  { press: '연합뉴스', title: '[속보] 도심 공원 "조용한 독서존" 시범 운영…시민 호응' },
  { press: 'KBS', title: '오늘부터 전국 대부분 비…기온 뚝 떨어져' },
  { press: 'SBS', title: '한국 16강 진출 쾌거, 월드컵 열기 후끈' }
];

const mockRightNews = [
  { press: '한국경제', title: '중소기업 ESG 전담 인력 채용 확대…지속 가능성 주목' },
  { press: '매일경제', title: '코스피 3000 돌파, 반도체주 강세 뚜렷' },
  { press: '동아일보', title: '지방 소멸 위기 극복 위한 새로운 지원책 발표' }
];

function TickerItem({ press, title, isVisible }: { press: string; title: string; isVisible: boolean }) {
  return (
    <div 
      className={`absolute left-4 right-4 flex items-center gap-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-4 z-0'
      }`}
    >
      <span className="font-bold text-ink whitespace-nowrap">{press}</span>
      <span className="text-sub truncate hover:underline cursor-pointer">{title}</span>
    </div>
  );
}

export default function Ticker() {
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);

  useEffect(() => {
    // 왼쪽 티커: 3.2초 주기
    const leftTimer = setInterval(() => {
      setLeftIdx((prev) => (prev + 1) % mockLeftNews.length);
    }, 3200);

    // 오른쪽 티커: 왼쪽과 교차 애니메이션을 위해 1.6초 지연 후 시작
    const rightTimerTimeout = setTimeout(() => {
      const rightTimer = setInterval(() => {
        setRightIdx((prev) => (prev + 1) % mockRightNews.length);
      }, 3200);
      return () => clearInterval(rightTimer);
    }, 1600);

    return () => {
      clearInterval(leftTimer);
      clearTimeout(rightTimerTimeout);
    };
  }, []);

  return (
    <section className="flex gap-4 mb-8">
      {/* 왼쪽 티커 */}
      <div className="flex-1 h-[48px] bg-soft border border-line rounded-sm relative overflow-hidden flex items-center hover:bg-page transition-colors">
        {mockLeftNews.map((news, i) => (
          <TickerItem key={i} press={news.press} title={news.title} isVisible={i === leftIdx} />
        ))}
      </div>
      
      {/* 오른쪽 티커 */}
      <div className="flex-1 h-[48px] bg-soft border border-line rounded-sm relative overflow-hidden flex items-center hover:bg-page transition-colors">
        {mockRightNews.map((news, i) => (
          <TickerItem key={i} press={news.press} title={news.title} isVisible={i === rightIdx} />
        ))}
      </div>
    </section>
  );
}
