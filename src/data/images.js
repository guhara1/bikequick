// 이미지 매핑 (SEO alt는 각 페이지에서 자동 생성)
//
// 방식: Unsplash CDN 핫링크 (다운로드 불가 환경 대응).
//   images.unsplash.com 은 무료(Unsplash License, 상업적 사용·무저작권표기 가능)이며
//   핫링크가 공식 허용됩니다. 방문자 브라우저가 직접 로드하므로 빌드 환경의
//   네트워크 제한과 무관하게 실제 사진이 표시됩니다.
//   ⚠️ 특정 슬롯의 사진이 마음에 안 들면 아래 UNSPLASH의 ID만 교체하면 됩니다.
//   (인터넷 열린 환경에서는 scripts/fetch-photos.py 로 로컬 WebP 30KB 다운로드도 가능)
const BASE = "/assets/img/photos/";

// 로컬 유지: 사용자 업로드 배너
const LOCAL = new Set(["hero-main-upload"]);

// 슬롯 → Unsplash 사진 ID (GitHub 실제 사용 예시에서 확인한 유효 ID)
const UNSPLASH = {
  "hero-home": "1558981403-c5f9899a28bc",       // 오토바이
  "hero-jobs": "1558618047-3c8c76ca7d13",       // 스쿠터
  "hero-blog": "1538485399081-7191377e8241",    // 서울 도시
  "region-urban": "1538485399081-7191377e8241", // 서울 도시
  "region-industrial": "1566479179817-c0d9d2b2b0b0", // 전동 스쿠터
  "region-suburban": "1558618047-3c8c76ca7d13", // 스쿠터
  "region-coastal": "1540321204207-b9a76c3a5829", // 도시 스카이라인
  "theme-rider": "1558981403-c5f9899a28bc",     // 오토바이
  "theme-city": "1540321204207-b9a76c3a5829",   // 도시 스카이라인
  "theme-delivery": "1566479179817-c0d9d2b2b0b0", // 스쿠터
  "theme-route": "1558981403-c5f9899a28bc",     // 오토바이
  "theme-income": "1540321204207-b9a76c3a5829", // 도시
  "theme-safety": "1558618047-3c8c76ca7d13",    // 스쿠터
  "theme-map": "1538485399081-7191377e8241",    // 서울 도시
  "theme-night": "1569050467447-ce54b3bbc37d",  // 야경
};

function unsplashUrl(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=70&fm=webp`;
}

export function img(key) {
  if (LOCAL.has(key) || !UNSPLASH[key]) return `${BASE}${key}.webp`;
  const wide = key.startsWith("hero-") || key.startsWith("region-");
  const [w, h] = wide ? [1200, 520] : [900, 560];
  return unsplashUrl(UNSPLASH[key], w, h);
}

// 지역 특성 → 히어로 이미지
const REGION_HERO = {
  seoul: "region-urban", gyeonggi: "region-industrial", incheon: "region-industrial",
  busan: "region-coastal", daegu: "region-urban", gwangju: "region-industrial",
  daejeon: "region-urban", ulsan: "region-industrial", sejong: "region-urban",
  gangwon: "region-coastal", chungbuk: "region-industrial", chungnam: "region-industrial",
  jeonbuk: "region-suburban", jeonnam: "region-coastal", gyeongbuk: "region-industrial",
  gyeongnam: "region-industrial", jeju: "region-coastal",
};
export function regionHero(slug) {
  return img(REGION_HERO[slug] || "region-urban");
}

// 지역 본문 이미지 2장
export function regionBodyImages(slug) {
  const industrial = ["gyeonggi", "incheon", "gwangju", "ulsan", "chungbuk", "chungnam", "gyeongbuk", "gyeongnam"];
  if (industrial.includes(slug)) return ["theme-delivery", "theme-route"].map(img);
  if (["busan", "gangwon", "jeonnam", "jeju"].includes(slug)) return ["theme-city", "theme-rider"].map(img);
  return ["theme-map", "theme-rider"].map(img);
}

// 블로그 카테고리 → 대표 이미지 (썸네일 다양화)
const BLOG_IMG = {
  "퀵서비스": "theme-rider", "투잡": "theme-city", "보험": "theme-safety",
  "배달부업": "theme-delivery", "카카오퀵": "theme-map", "오토바이관리": "theme-route",
  "안전운전": "theme-night", "기사모집": "theme-rider", "라이더": "theme-rider",
};
export function blogImage(category) {
  return img(BLOG_IMG[category] || "theme-rider");
}

// 블로그 본문 삽입 이미지 (카테고리별 2장)
const BLOG_BODY = {
  "퀵서비스": ["theme-route", "theme-city"],
  "투잡": ["theme-rider", "theme-map"],
  "보험": ["theme-safety", "theme-night"],
  "배달부업": ["theme-delivery", "theme-city"],
  "카카오퀵": ["theme-map", "theme-route"],
  "오토바이관리": ["theme-route", "theme-safety"],
  "안전운전": ["theme-night", "theme-city"],
};
export function blogBodyImages(category) {
  return (BLOG_BODY[category] || ["theme-route", "theme-city"]).map(img);
}
