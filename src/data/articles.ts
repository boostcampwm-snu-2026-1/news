import type { Article, TickerItem } from '../types';

export const articles: Article[] = [
  {
    outletId: 'sbs-biz',
    editedAt: '2026.01.14. 18:53 편집',
    headlineTitle: '출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다',
    items: [
      '"기다림이 폭신해졌어요" 동네 버스정류장 의자, 새 단장',
      "데이터 걱정 내려놓기 실험… 통신사, '마음 편한 요금제' 선보여",
      '잠들기 전에 보는 조용한 영상 한 편… OTT, 힐링 추천 기능 도입',
      '"길 잃지 않게 도와줄게요" 친절해진 환승 안내 목소리',
      "퇴근 시간 맞춰 환하게 '찰칵'… 스마트 조명, 집이 먼저 반겨준다",
      "전기요금도 이제 '알림으로 다독다독'… 생활관리 습관 확산",
    ],
  },
  {
    outletId: 'asia-economy',
    editedAt: '2026.01.14. 19:38 편집',
    headlineTitle: "직장인 스트레스 관리 위한 '마음건강 상담' 확대",
    items: [
      '지자체, 소상공인 대상 친절 응대 교육 지원',
      '생활밀착 스타트업, 직장인 대상 서비스 잇단 출시',
      '기업문화 개선 사례 공유 확산… 자발적 참여 늘어',
      '재택·출근 혼합 근무, 중견기업까지 확대 움직임',
      '사내 커뮤니케이션 플랫폼 고도화 추진',
      "기업, '워라밸 교육 프로그램' 자율 도입 확대",
    ],
  },
  {
    outletId: 'maeil-economy',
    editedAt: '2026.05.02. 09:30 편집',
    headlineTitle: '코스피 2,700선 돌파…외국인 순매수 지속',
    items: [
      '삼성전자 52주 신고가 기록',
      '원달러 환율 1,320원대 안정',
      '미국 FOMC 금리 동결 가능성 부각',
      '반도체 수출 전년比 32% 급증',
      '2분기 GDP 성장률 2.8% 전망',
      '국민연금 국내주식 비중 축소 검토',
    ],
  },
  {
    outletId: 'mbc',
    editedAt: '2026.05.02. 10:15 편집',
    headlineTitle: '정부, 부동산 규제 추가 완화 발표',
    items: [
      '수도권 분양가 상한제 조정 논의',
      '1기 신도시 재건축 사업 가속화',
      '청약 통장 납입 인정 한도 상향',
      '전세 보증보험 가입 요건 완화',
      '주택담보대출 LTV 상향 검토',
      '세종시 행정수도 이전 2차 추진',
    ],
  },
  {
    outletId: 'ytn',
    editedAt: '2026.05.02. 08:45 편집',
    headlineTitle: '한미 정상회담…반도체 공급망 협력 강화',
    items: [
      '한미 동맹 70주년 기념 공동성명',
      '북핵 대응 확장억제 강화 합의',
      '대미 수출규제 반도체 품목 조정',
      '인태경제프레임워크(IPEF) 협력 확대',
      'K-방산 미국 수출 길 넓힌다',
      '미국 국채 보유 3위 유지',
    ],
  },
  {
    outletId: 'inews24',
    editedAt: '2026.05.02. 11:00 편집',
    headlineTitle: 'AI 에이전트 시대 본격화…국내 빅테크 경쟁',
    items: [
      '카카오, 자체 LLM 카나나 정식 출시',
      '네이버 하이퍼클로바X 기업용 확대',
      'SK텔레콤 에이닷 구독자 200만 돌파',
      'KT, 클라우드 AI 플랫폼 B2B 공략',
      '삼성 가우스2 온디바이스 AI 공개',
      'LG AI연구원, 엑사원 3.0 성능 개선',
    ],
  },
  {
    outletId: 'sbs',
    editedAt: '2026.05.02. 09:00 편집',
    headlineTitle: '전국 황사 영향권…주요 도시 미세먼지 나쁨',
    items: [
      '서울 오전 미세먼지 농도 80㎍/㎥',
      '호흡기 질환자 외출 자제 권고',
      '어린이·노인 마스크 착용 강화',
      '황사 영향 내일까지 지속 전망',
      '5월 황사 발원지 몽골 건조화 가속',
      '공기청정기 판매량 전달比 45% 급증',
    ],
  },
  {
    outletId: 'sports-seoul',
    editedAt: '2026.05.02. 10:30 편집',
    headlineTitle: '손흥민, PSG 이적 협상 본격화…이적료 600억 거론',
    items: [
      '토트넘, 계약 연장 협상 결렬 공식화',
      '레알 마드리드·바르셀로나도 관심',
      'K리그 레전드 이영표 감독 데뷔',
      '류현진 6시즌 만에 메이저리그 복귀',
      '2026 월드컵 한국 조편성 결과',
      '김민재 바이에른 주전 복귀 선언',
    ],
  },
  {
    outletId: 'insight',
    editedAt: '2026.05.02. 10:00 편집',
    headlineTitle: '2026 트렌드 키워드: AI·클린뷰티·슬로우라이프',
    items: [
      '올해 뷰티 시장 키워드는 "클린&그린"',
      'MZ세대가 선택한 라이프스타일 브랜드 TOP5',
      '명품 소비 줄고 "가성비 프리미엄" 뜬다',
      '서울 핫플레이스 2026: 성수·망원 넘어 어디로',
      '홈카페 문화 2년째 지속…에스프레소 머신 매출 급증',
      '건강기능식품 구독 서비스 가입자 전년比 78% 증가',
    ],
  },
];

export function getArticleByOutletId(outletId: string): Article | undefined {
  return articles.find(a => a.outletId === outletId);
}

export const tickerItems: TickerItem[] = [
  { outletName: '연합뉴스', headline: "[속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응" },
  { outletName: '한국경제', headline: '중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목' },
  { outletName: '매일경제', headline: '코스피 2,700선 돌파…외국인 순매수 지속' },
  { outletName: 'MBC', headline: '정부, 부동산 규제 추가 완화 발표' },
  { outletName: 'YTN', headline: '한미 정상회담…반도체 공급망 협력 강화' },
  { outletName: '아이뉴스24', headline: 'AI 에이전트 시대 본격화…국내 빅테크 경쟁' },
  { outletName: 'SBS', headline: '전국 황사 영향권…주요 도시 미세먼지 나쁨' },
  { outletName: '스포츠서울', headline: '손흥민, PSG 이적 협상 본격화' },
  { outletName: '조선일보', headline: '내수 침체 심화…소비심리지수 5개월째 하락' },
  { outletName: '경향신문', headline: '국회 예산안 처리 D-3, 여야 막판 협상' },
  { outletName: '헤럴드경제', headline: '원화 약세에 수출기업 수혜…1분기 실적 개선' },
  { outletName: 'ZDNet Korea', headline: '챗GPT 한국 MAU 1,000만 돌파' },
];
