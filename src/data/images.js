// 이미지 매핑 (SEO alt는 각 페이지에서 자동 생성)
//
// ⚠️ 이 세션(잠긴 네트워크)에서는 외부 이미지 사이트 접속·미리보기가 모두 차단되어
//    검증된 외부 사진을 넣을 수 없습니다. 따라서 로컬 WebP(assets/img/photos/*.webp)만 사용합니다.
//    → 깨진 이미지(엑박) 없음, 모두 실사진(사용자 업로드 배너에서 파생).
//    다양한 주제별 사진은 인터넷 열린 환경에서 scripts/fetch-photos.py 로 교체하세요(IMAGES.md).
const BASE = "/assets/img/photos/";

export function img(key) {
  return `${BASE}${key}.webp`;
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

export function regionBodyImages(slug) {
  const industrial = ["gyeonggi", "incheon", "gwangju", "ulsan", "chungbuk", "chungnam", "gyeongbuk", "gyeongnam"];
  if (industrial.includes(slug)) return ["theme-delivery", "theme-route"].map(img);
  if (["busan", "gangwon", "jeonnam", "jeju"].includes(slug)) return ["theme-map", "theme-rider"].map(img);
  return ["theme-city", "theme-rider"].map(img);
}

const BLOG_IMG = {
  "퀵서비스": "theme-rider", "투잡": "theme-income", "보험": "theme-safety",
  "배달부업": "theme-delivery", "카카오퀵": "theme-map", "오토바이관리": "theme-route",
  "안전운전": "theme-night", "기사모집": "theme-rider", "라이더": "theme-rider",
};
export function blogImage(category) {
  return img(BLOG_IMG[category] || "theme-rider");
}

const BLOG_BODY = {
  "퀵서비스": ["theme-route", "theme-city"],
  "투잡": ["theme-rider", "theme-income"],
  "보험": ["theme-safety", "theme-rider"],
  "배달부업": ["theme-delivery", "theme-map"],
  "카카오퀵": ["theme-map", "theme-route"],
  "오토바이관리": ["theme-route", "theme-safety"],
  "안전운전": ["theme-safety", "theme-night"],
};
export function blogBodyImages(category) {
  return (BLOG_BODY[category] || ["theme-route", "theme-city"]).map(img);
}
