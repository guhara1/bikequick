// 롱테일 주제 내부링크
// 검색 롱테일 질의를 겨냥한 "설명형 앵커텍스트"로 핵심 콘텐츠(가이드·블로그·모집)를
// 서로 연결합니다. 앵커텍스트는 실제 링크 대상 내용과 일치시켜 신뢰도를 유지합니다.

// 블로그 기반 롱테일 가이드 (실제 /blog/ 글로 연결)
export const guideTopics = [
  { name: "초보 라이더 퀵서비스 시작 방법 완벽 가이드", href: "/blog/quick-service-start-guide/", desc: "면허·차량·앱 준비부터 첫 오더까지 순서대로 정리했습니다." },
  { name: "직장인 오토바이 투잡, 이렇게 시작하세요", href: "/blog/two-job-recommendation/", desc: "본업과 병행하는 시간 관리와 투잡 라이더 장단점을 다룹니다." },
  { name: "배달·퀵 라이더 오토바이 보험 종류와 비용", href: "/blog/motorcycle-insurance-basics/", desc: "유상운송·책임보험·적재물보험의 차이와 가입 기준을 설명합니다." },
  { name: "배민 배달 vs 퀵서비스, 나에게 맞는 선택은?", href: "/blog/delivery-vs-quick-service/", desc: "수익 구조·운행 방식·진입 난이도를 비교합니다." },
  { name: "카카오퀵·통합콜 자사콜과 공유콜의 차이", href: "/blog/kakao-quick-start/", desc: "콜 종류별 배차·정산 방식과 초보가 알아둘 점을 정리했습니다." },
  { name: "오토바이 유지비·정비 비용 절약 노하우", href: "/blog/motorcycle-maintenance-cost/", desc: "타이어·엔진오일·소모품 교체 주기와 예상 비용을 안내합니다." },
  { name: "비 오는 날 오토바이 안전 운행 요령 7가지", href: "/blog/rainy-day-riding-tips/", desc: "우천 시 제동·시야·복장 관리로 사고를 줄이는 방법입니다." },
];

// 핵심 안내 페이지 롱테일 (가이드성 콘텐츠)
export const guidePages = [
  { name: "퀵서비스 근무 방식·자유출근 제도 안내", href: "/work-guide/", desc: "전업·투잡·주말 등 근무 형태와 콜 선택 방식을 설명합니다." },
  { name: "퀵기사 수익 구조와 시간대별 수요 분석", href: "/income/", desc: "운임·수수료·비용 계산 예시와 수익 관리 방법입니다." },
  { name: "비대면 가입 절차와 준비물 총정리", href: "/join/", desc: "온라인 지원부터 앱 설치까지 6단계 가입 흐름입니다." },
  { name: "초보 기사 교육 과정 안내", href: "/education/", desc: "앱 사용·안전 운행·고객 응대 기본 교육 내용을 소개합니다." },
  { name: "퀵서비스 기사 모집 자주 묻는 질문", href: "/faq/", desc: "지원 자격·수입·비용·차량 관련 질문에 답합니다." },
];

// 직무별 모집 롱테일 (실제 /jobs/ 로 연결)
export const jobTopics = [
  { name: "초보도 지원 가능한 퀵서비스 기사 모집", href: "/jobs/beginner-rider/", desc: "경력 없이 시작하는 초보 라이더 모집 안내입니다." },
  { name: "직장인 투잡 라이더 모집", href: "/jobs/two-job-rider/", desc: "퇴근 후·주말에 병행하는 투잡 라이더를 모집합니다." },
  { name: "주말·부업 라이더 모집", href: "/jobs/part-time-rider/", desc: "원하는 시간만 골라 운행하는 부업 라이더 모집입니다." },
  { name: "여성 라이더 모집 안내", href: "/jobs/woman-rider/", desc: "여성 라이더의 안전 운행·활동 환경을 안내합니다." },
  { name: "경력 오토바이 기사 모집", href: "/jobs/experienced-rider/", desc: "경력자를 위한 지역 집중·전업 운행 조건입니다." },
];

// 지역 페이지에서 함께 노출할 롱테일 링크 묶음(가이드+블로그 대표)
export const regionGuideLinks = [
  ...guidePages.slice(0, 5).map((g) => ({ name: g.name, href: g.href })),
  guideTopics[0],
  guideTopics[1],
  guideTopics[2],
].map((g) => ({ name: g.name, href: g.href }));
