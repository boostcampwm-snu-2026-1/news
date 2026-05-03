import type { CategoryArticles, CategoryKey } from "../state/types";

/**
 * Generic per-category fake articles. Used as a fallback for outlets that
 * don't have an entry in articles.json so every press still shows a
 * realistic-looking headline + 6-item list when opened.
 */

const TITLE_TEMPLATES: Record<CategoryKey, string[]> = {
  "general-economy": [
    "내년 가계 소비 심리, 점진적 회복세 전망",
    "정부 소상공인 지원 사업 확대… 신청 절차 간소화",
    "국내 스타트업, 그린 테크 분야 투자 유치 활발",
    "지역 화폐 활용도 분석 결과, 골목 상권 매출 견인",
    "물가 안정세 속 내수 회복 신호 감지",
    "은행권 디지털 창구 확대… 비대면 노년층 교육 병행",
  ],
  "broadcast-telecom": [
    "5G 상용화 이후 다음 통신 표준 논의 본격화",
    "공영방송 야간 편성 다양화… 시청자 만족도 조사",
    "지하철 와이파이 속도 개선 시범 사업 확대",
    "OTT 플랫폼, 힐링 추천 기능 도입… 사용 시간 분석",
    "통신 3사, 노년층 전용 요금제 동시 출시",
    "지역 라디오 방송, 시민 참여 코너 정규 편성",
  ],
  it: [
    "오픈소스 보안 패치 자동화 도구 활성화",
    "국내 AI 스타트업, 한국어 모델 공개… 라이선스 무료",
    "개인정보 보호 강화 위한 브라우저 기능 비교",
    "코딩 교육 시장, 직장인 재교육 비중 증가",
    "데이터센터 친환경 설계 사례, 글로벌 학회 발표",
    "신규 프로그래밍 언어 도입, 국내 기업 채택 동향",
  ],
  "sports-entertainment": [
    "프로 야구 정규 시즌 흥행, 객단가 상승세",
    "K-팝 신인 그룹, 자체 콘텐츠 플랫폼 직접 운영",
    "OTT 오리지널 드라마, 해외 시청 점유율 신기록",
    "공연장 안전 관리 매뉴얼 개정안 공개",
    "프로 e스포츠 리그, 정규 후원사 확대",
    "독립 영화관 회원제 시범 운영, 회원 증가",
  ],
  "magazine-pro": [
    "기업 ESG 보고서 표준화 논의 가속",
    "전문직 자격 시험 응시자 수 5년 만에 증가",
    "산업 동향 분석 보고서, 중소기업 활용도 점검",
    "스타트업 IR 자료 공개 확산… 투자자 접근성 개선",
    "분기별 시장 전망 보고서, 디지털 무료 배포 시작",
    "법조계 디지털 전환 가이드라인 초안 공개",
  ],
  regional: [
    "지자체별 청년 일자리 지원 사업 비교",
    "동네 도서관 야간 개방, 주민 호응",
    "지역 농산물 직거래 장터, 정기 운영 확대",
    "마을 공동체 사업, 주민 자치 모델 우수 사례",
    "지방 대학 산학 협력 프로그램, 정원 확대",
    "지역 축제 안전 점검 매뉴얼 개정 시범 적용",
  ],
};

const HEADLINE_TEMPLATES: Record<CategoryKey, string> = {
  "general-economy": "내년 경제 정책 방향 발표 임박… 가계·기업 영향 짚어본다",
  "broadcast-telecom": "차세대 통신 표준 논의 본격화… 미디어 산업 변화 예고",
  it: "국내 AI 생태계 새로운 분기점… 오픈 모델 흐름 가속",
  "sports-entertainment": "콘텐츠 산업 흥행 지표 회복… 무대·스크린 동반 성장",
  "magazine-pro": "전문지 디지털 전환 가속… 깊이 있는 콘텐츠가 차별점",
  regional: "지역 균형 발전 사업 점검… 시민 체감도 분석",
};

export const DEFAULT_CATEGORY_COUNT = 81;

export function buildDummyCategoryArticles(
  pressName: string,
  tabKey: CategoryKey,
): CategoryArticles {
  const titles = TITLE_TEMPLATES[tabKey];
  return {
    headlineTitle: `${pressName} 단독: ${HEADLINE_TEMPLATES[tabKey]}`,
    items: titles.map((title) => ({ title })),
    count: DEFAULT_CATEGORY_COUNT,
  };
}
