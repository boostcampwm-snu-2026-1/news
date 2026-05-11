import type { CategoryKey } from '@/types/press';

/**
 * 오픈 프레스 mock 기사 데이터.
 * 실제 API가 아니라 디자인 검증용 — 모든 언론사가 같은 카테고리별 sample을 공유한다.
 *
 * 구조 (디자인 시스템 §6.10 List view):
 *   각 카테고리에 대해 1개의 lead (이미지 + 캡션) + 6개의 list item.
 */

export type LeadArticle = {
  title: string;
  caption: string;
  /** CSS gradient or color band — 실제 이미지 대신 사용 (오프라인 보장) */
  swatch: string;
};

export type ListArticle = {
  title: string;
};

export type CategoryArticles = {
  lead: LeadArticle;
  list: ListArticle[];
};

export type PressArticles = Record<CategoryKey, CategoryArticles>;

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;

/**
 * 모든 언론사가 공유하는 카테고리별 article set.
 * 실제 서비스라면 (pressId, categoryKey) 마다 다른 데이터를 fetch.
 */
export const SHARED_ARTICLES: PressArticles = {
  general: {
    lead: {
      title: '도심 공원에 ‘조용한 독서존’ 시범 운영, 시민 호응',
      caption: '도서관·공원 협업 모델로 주말 가족 이용 늘어',
      swatch: grad('#3F62B7', '#7890E7'),
    },
    list: [
      { title: '청년 1인가구 위한 식문화 지원 사업, 다음달 본격 시행' },
      { title: '평생학습 도시 선정 결과 발표… 시민 참여 프로그램 확대' },
      { title: '주말 도서관 야간 개방 시범 운영… 직장인 호응 이어져' },
      { title: '대중교통 환승 안내 음성 개선… 청각 친화 디자인 도입' },
      { title: '재택근무 도입 기업 늘면서 사무실 공유 서비스 다변화' },
      { title: '취약계층 디지털 교육 확대… 기관 협력 모델 늘어' },
    ],
  },
  broadcast: {
    lead: {
      title: '방송사 통합 자막 가이드라인 발표, 접근성 강화',
      caption: '청각 친화 자막·수어 동시 송출 의무화 검토',
      swatch: grad('#C84141', '#E8A20A'),
    },
    list: [
      { title: '지역 방송사, 시청자 참여형 토론 프로그램 신설' },
      { title: '라디오 청취자 데이터로 본 ‘출퇴근 음악’ 트렌드' },
      { title: '공영방송 다큐멘터리 시즌제 도입 검토' },
      { title: 'OTT-방송 협업 콘텐츠, 동시 공개 모델 확대' },
      { title: '날씨 보도 그래픽 개선, 색약 사용자 가독성 ↑' },
      { title: '아동 시청 시간대 광고 가이드라인 개정 논의' },
    ],
  },
  it: {
    lead: {
      title: '오픈소스 협업 도구 도입한 공공기관, 비용 30% 절감',
      caption: '코드 공개 확대와 보안 검토 체계 동시 운영',
      swatch: grad('#1B7CC9', '#00B7C8'),
    },
    list: [
      { title: '클라우드 비용 최적화 가이드, 중소기업용 발간' },
      { title: '신규 LLM 라이선스 변경, 상용 사용 제한 완화' },
      { title: 'IoT 가전 개인정보 처리 방침, 표준안 마련' },
      { title: '데이터센터 전력효율 PUE, 국내 최저 기록 갱신' },
      { title: 'API 디자인 컨퍼런스, 국내 첫 개최' },
      { title: '오픈소스 지속가능성 펀드, 한국 프로젝트 첫 선정' },
    ],
  },
  sports: {
    lead: {
      title: '아마추어 리그 데이터 공개, 선수 발굴 폭 넓어진다',
      caption: '시즌 통계 오픈 API로 분석 커뮤니티 활성화',
      swatch: grad('#0E5A3E', '#3FAF6B'),
    },
    list: [
      { title: '국내 마라톤 대회, 휠체어 부문 별도 트랙 신설' },
      { title: 'e스포츠 표준 계약서 안내, 선수 권익 보호' },
      { title: '여성 농구 리그 중계권, 무료 스트리밍 확대' },
      { title: '학생 스포츠 의무 보험 가입률 90% 돌파' },
      { title: '구단 SNS 운영 가이드, 팬 소통 모범사례 공유' },
      { title: '겨울 시즌 스포츠 안전사고 예방 캠페인' },
    ],
  },
  magazine: {
    lead: {
      title: '독립 매거진 다섯 곳, 한 자리에서 만나는 페어 개최',
      caption: '소형 출판사 협업으로 독자와 직접 대화',
      swatch: grad('#7A4FB8', '#C76FB7'),
    },
    list: [
      { title: '지속가능 패션 매거진, 종이 100% 재활용지로 전환' },
      { title: '음식 잡지가 추천하는 동네책방 한 곳' },
      { title: '여행 매거진, 느린 여행 시리즈 호응' },
      { title: '독립 영화 잡지, 단편 영화제와 협업' },
      { title: '아트북 페어, 첫 해외 작가 초청' },
      { title: '소형 출판 지원 프로그램, 신청 두 배 증가' },
    ],
  },
  local: {
    lead: {
      title: '지역 농산물 직거래 플랫폼, 가입 농가 1만 곳 돌파',
      caption: '플랫폼 결제 수수료 인하, 신규 가입 빠르게 늘어',
      swatch: grad('#6B5530', '#C9A85A'),
    },
    list: [
      { title: '동네 도서관, 어린이 책 큐레이션 서비스 시작' },
      { title: '지역 청년 창업가 모임, 정기 미팅 활성화' },
      { title: '시내버스 운행 정보 앱, 시각 친화 모드 추가' },
      { title: '주민 참여형 거리 디자인 공모 결과 발표' },
      { title: '지역 신문 구독자 데이터로 본 관심사 트렌드' },
      { title: '동네 문화공간 개방 시간 통합 안내 시범' },
    ],
  },
};

/** 카테고리별 article 개수 (counter "1 / N"용). */
export function getArticleCount(cat: CategoryArticles): number {
  return 1 + cat.list.length; // lead + list items
}
