export const navLinks = [
  { label: "너겟이 하는 일", href: "#content" },
  { label: "구독하기", href: "#subscribe" },
  { label: "채용", href: "#careers" },
  { label: "함께한 기업들", href: "#clients" },
];

export const heroContent = {
  eyebrow: "FINANCIAL CONTENT AGENCY",
  headline: "금융이 어렵다는 고정관념을",
  highlight: "콘텐츠로 깹니다",
  description:
    "1.5만 명이 매일 아침 읽는 경제 뉴스레터.\nKB국민은행, 카카오, 네이버도 선택한 금융 콘텐츠 파트너예요.",
  primaryCta: { label: "B2B 파트너십 문의", href: "#contact" },
  secondaryCta: {
    label: "무료 구독하기",
    href: "https://page.stibee.com/subscriptions/132031",
  },
};

export const stats = [
  { value: "1.5만+", label: "뉴스레터 구독자" },
  { value: "5배", label: "콘텐츠 도입 후 고객사 MAU 증가" },
  { value: "38%", label: "뉴스레터 평균 오픈율" },
  { value: "3만+", label: "일일 콘텐츠 뷰 증가" },
];

export const caseStudy = {
  before: 100000,
  after: 500000,
  unit: "MAU",
  metricLabel: "콘텐츠 도입 후, 고객사 MAU가 달라졌습니다",
  secondaryMetric: "일일 콘텐츠 View 수 3만 명 이상 증가",
};

export function getCaseStudyMultiplier(): number {
  return caseStudy.after / caseStudy.before;
}

export const approvedClientLogos = [
  "KB국민은행",
  "카카오",
  "네이버",
  "케이뱅크",
  "미래에셋증권",
  "네이버페이",
  "삼성",
  "삼양",
];

export const contentCategories = [
  {
    id: "all",
    label: "전체",
    items: [
      { title: "32조 추경, 새 정부의 경제 살리기 레슨", meta: "전체" },
      { title: "임박한 미 대선, 우리나라 경제엔 누가 더 유리할까?", meta: "전체" },
    ],
  },
  {
    id: "daewang",
    label: "대왕 너겟",
    items: [
      { title: "일본 여행이 다시 뜨는 이유", meta: "대왕 너겟" },
      { title: "어닝 서프라이즈인데 주가는 왜 떨어져?", meta: "대왕 너겟" },
    ],
  },
  {
    id: "sangsik",
    label: "경제 상식을 콕콕",
    items: [
      { title: "코인 투자하면서 꼬박꼬박 이자도 받을 수 있다고?", meta: "경제 상식을 콕콕" },
      { title: "당첨되면 20억? 부동산 '줍줍'이 화제인 이유", meta: "경제 상식을 콕콕" },
    ],
  },
  {
    id: "hanip",
    label: "한입 너겟",
    items: [
      { title: "산타랠리 타고 다시 오르는 비트코인", meta: "한입 너겟" },
      { title: "혼다 X 닛산: \"우리 합병해요!\"", meta: "한입 너겟" },
    ],
  },
  {
    id: "stock",
    label: "주식",
    items: [
      { title: "미국: \"TSMC가 왜 거기서 나와?\"", meta: "주식" },
      { title: "한때 1등이었던 폭스바겐이 추락한 이유", meta: "주식" },
    ],
  },
  {
    id: "realestate",
    label: "부동산",
    items: [
      { title: "역대급 세수 펑크에 정부는 기금 영끌?", meta: "부동산" },
      { title: "한전: \"더는 못 버티겠어\"", meta: "부동산" },
    ],
  },
  {
    id: "branded",
    label: "브랜디드콘텐츠",
    items: [
      { title: "케이뱅크랑 K-패스해! — 케이뱅크 × 너겟", meta: "브랜디드콘텐츠" },
      { title: "미국 주식 나도 할 수 있어 수수수수퍼노바 💪 — 미래에셋 × 너겟", meta: "브랜디드콘텐츠" },
    ],
  },
];

export const b2bServices = [
  {
    category: "콘텐츠 제휴",
    name: "데일리 경제 뉴스 콘텐츠",
    description: "경제를 어려워하는 사람들도 쉽게 이해할 수 있도록 꼭 필요한 뉴스만 풀어 전달합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "재테크 상식 콘텐츠",
    description: "다양한 재테크 방법과 경제 정책을 소개하고 실행 방법까지 알려주는 콘텐츠입니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "한입 뉴스 콘텐츠",
    description: "하루에 꼭 알아야 하는 경제 뉴스 5~6가지를 간략하게 정리해 전달합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "오리지널 콘텐츠 제작",
    description: "기업이 필요한 콘텐츠를 너겟의 톤앤매너와 노하우를 더해 맞춤 제작합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "콘텐츠 제작 및 운영 대행",
    description: "기업의 콘텐츠 팀을 대신해 기획/제작/운영을 전체적으로 대행합니다.",
  },
  {
    category: "광고",
    name: "뉴스레터 브랜디드 콘텐츠",
    description: "너겟의 친근한 내러티브로 거부감 없이 서비스·제품·브랜드를 홍보합니다.",
  },
];

export const testimonials = [
  // 실제 구독자 인용은 콘텐츠팀이 검토 후 교체할 예정 — 아래는 형식 확인용 샘플
  {
    quote: "경제 뉴스가 이렇게 쉽게 읽힐 수 있다는 걸 처음 알았어요.",
    source: "구독자 · 사회초년생",
  },
  {
    quote: "출근길 5분이면 오늘 알아야 할 경제 이슈가 다 정리돼요.",
    source: "구독자 · 2년차 직장인",
  },
];

export const careerListing = {
  title: "콘텐츠 에디터",
  type: "정규직 · 서울",
  href: "#careers",
};

export const subscribeUrl = "https://page.stibee.com/subscriptions/132031";
export const contactEmail = "contact@nugget.im";
