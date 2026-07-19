// 이미지 매핑 및 alt (SEO)
// ⚠️ 실제 무료 사진으로 교체 시 assets/img/photos/{키}.webp 를 덮어쓰면 됩니다.
//    (권장: WebP, 30KB 이하, 가로 1200px 내외 / 본문 900px 내외)
//    추천 검색어는 README의 "이미지 교체 가이드" 표 참고.
const BASE = "/assets/img/photos/";

export function img(key) {
  return `${BASE}${key}.webp`;
}

// 지역 특성 → 히어로 이미지 매핑 (도심/산업/근교/해안)
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

// 지역 본문 이미지 2장 (도심/산업 위주로 조합)
export function regionBodyImages(slug) {
  const industrial = ["gyeonggi","incheon","gwangju","ulsan","chungbuk","chungnam","gyeongbuk","gyeongnam"];
  if (industrial.includes(slug)) return ["theme-delivery", "theme-route"].map(img);
  if (["busan","gangwon","jeonnam","jeju"].includes(slug)) return ["theme-map", "theme-rider"].map(img);
  return ["theme-city", "theme-rider"].map(img);
}

// 블로그 카테고리 → 대표 이미지
const BLOG_IMG = {
  "퀵서비스": "theme-rider", "투잡": "theme-income", "보험": "theme-safety",
  "배달부업": "theme-delivery", "카카오퀵": "theme-map", "오토바이관리": "theme-route",
  "안전운전": "theme-night", "기사모집": "theme-rider", "라이더": "theme-rider",
};
export function blogImage(category) {
  return img(BLOG_IMG[category] || "theme-rider");
}

// 블로그 본문 삽입 이미지 풀 (카테고리별 2장)
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
