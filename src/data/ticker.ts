import type { TickerItem } from '@/types/press';

/**
 * 자동 롤링 뉴스 티커 데이터 (디자인 시스템 §6.2).
 * 2 lanes — 두 lane을 별도 배열로 관리해 회전이 동기화되지 않도록 한다.
 */
export const TICKER_LANE_LEFT: TickerItem[] = [
  {
    press: '연합뉴스',
    title: "[속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응…",
  },
  {
    press: '뉴시스',
    title: '청년 1인가구 위한 식문화 지원 사업, 다음달 본격 시행',
  },
  {
    press: '경향신문',
    title: '평생학습 도시 선정 결과 발표… 시민 참여 프로그램 확대',
  },
  {
    press: '머니투데이',
    title: '주말 도서관 야간 개방 시범 운영… 직장인 호응 이어져',
  },
  {
    press: '연합뉴스',
    title: '대중교통 환승 안내 음성 개선… 청각 친화 디자인 도입',
  },
];

export const TICKER_LANE_RIGHT: TickerItem[] = [
  {
    press: '한국경제',
    title: '중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목',
  },
  {
    press: '매일경제',
    title: '지역 농산물 직거래 플랫폼, 가입 농가 1만 곳 돌파',
  },
  {
    press: '서울경제',
    title: '재택근무 도입 기업 늘면서 사무실 공유 서비스 다변화',
  },
  {
    press: '파이낸셜뉴스',
    title: '취약계층 디지털 교육 확대… 기관 협력 모델 늘어',
  },
  {
    press: '한국경제',
    title: '청년 창업가 멘토링 프로그램, 참여 기업 두 배로',
  },
];
