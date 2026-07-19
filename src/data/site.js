// 사이트 전역 설정
// ⚠️ 실제 운영 전 아래 연락처/도메인/회사정보를 실제 값으로 교체하세요.
export const site = {
  name: "바이크퀵",
  legalName: "바이크퀵 (인성데이타 파트너)",
  tagline: "전국 오토바이 퀵서비스 기사 모집",
  description:
    "전국 오토바이 퀵서비스 기사 모집 · 채용 정보 플랫폼. 출퇴근 자유, 예치금 0원, 비대면 가입. 초보·투잡·주말 라이더 환영. 지역별 모집 정보와 기사 가이드를 제공합니다.",
  // 배포 도메인 (예: https://bikequick.kr) — 실제 도메인으로 교체
  url: "https://bikequick.kr",
  locale: "ko_KR",
  lang: "ko",

  // 연락처 — ⚠️ 실제 값으로 교체 필요 (현재는 예시 placeholder)
  contact: {
    phone: "1600-0000",
    phoneHref: "tel:1600-0000",
    kakao: "https://pf.kakao.com/_bikequick", // ⚠️ 실제 카카오톡 채널로 교체
    kakaoLabel: "카카오톡 채널",
    email: "recruit@bikequick.kr",
    hours: "평일/주말 09:00 ~ 21:00 상담 가능",
  },

  // 회사 정보 — ⚠️ 실제 값으로 교체
  company: {
    ceo: "-",
    bizNumber: "000-00-00000",
    address: "-",
    platform: "인성데이타",
  },

  // 소셜/대표 이미지
  ogImage: "/assets/img/og-default.svg",
  logo: "/assets/img/logo.svg",
};

// 사이트가 홍보하는 핵심 근무 조건 (실제 조건에 맞게 유지·수정)
export const benefits = [
  { icon: "clock", title: "출퇴근 자유", desc: "정해진 출퇴근 시간 없이 원하는 시간에 운행합니다." },
  { icon: "wallet", title: "예치금 0원", desc: "가입 시 예치금 부담이 없습니다." },
  { icon: "mobile", title: "비대면 가입", desc: "방문 없이 전화·카카오톡으로 가입이 가능합니다." },
  { icon: "cash", title: "24시간 출금", desc: "운행 수익을 24시간 출금 신청할 수 있습니다." },
  { icon: "book", title: "초보 교육", desc: "오더 받는 법·배차·앱 사용법까지 처음부터 안내합니다." },
  { icon: "map", title: "오더 많음", desc: "자사콜·공유콜을 함께 선택해 오더 폭을 넓힙니다." },
];

// 이런 분들에게 추천
export const audiences = [
  { title: "투잡", desc: "본업과 병행하는 추가 수입", emoji: "💼" },
  { title: "부업", desc: "자투리 시간 활용 부업", emoji: "🕒" },
  { title: "전업", desc: "본격적인 전업 라이더", emoji: "🏍️" },
  { title: "초보", desc: "오토바이 배달이 처음인 분", emoji: "🔰" },
  { title: "주말기사", desc: "주말에만 집중 운행", emoji: "📅" },
  { title: "퇴근후기사", desc: "퇴근 후 저녁 시간 운행", emoji: "🌙" },
];
