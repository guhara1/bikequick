// 재사용 스키마 빌더 (Schema.org JSON-LD)
// ⚠️ 후기/별점 스키마는 reviews.js 의 "실제 검증 후기"에서만 생성합니다.
//    데이터가 없으면 아무 것도 출력하지 않습니다(허위 별점·자작 리뷰 금지).
import { site } from "../data/site.js";

// 후기 별점 구조화 데이터(AggregateRating/Review)는 의도적으로 출력하지 않습니다.
//   구글은 "자사 사업체에 대해 자체 수집한 후기(self-serving review)"의 별점
//   마크업을 리치결과에서 허용하지 않으며(별점 미노출·수동조치 리스크),
//   큐레이션된 후기의 평균 별점 마크업도 정책 위반 소지가 있습니다.
//   → 후기·평균 별점은 "화면(가시 콘텐츠)"으로만 노출합니다.
//   검색결과 별점은 네이버 플레이스·구글 비즈니스 프로필로 확보하세요.
//   (실데이터는 reviews.js 에 있으므로, 정책이 허용되는 방식이 필요하면 여기서 재활성화)
export function ratingFields() {
  return {};
}

// 모집 서비스 스키마 — 지역명이 있으면 areaServed 로 지정
export function serviceSchema(areaName) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${areaName || "전국"} 오토바이 퀵서비스 기사 모집`,
    serviceType: "오토바이 퀵서비스 기사 모집·채용",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      telephone: site.contact.phone,
    },
    areaServed: areaName
      ? { "@type": "AdministrativeArea", name: areaName }
      : { "@type": "Country", name: "대한민국" },
    audience: {
      "@type": "Audience",
      audienceType: "오토바이 퀵서비스 기사 지원자(초보·투잡·주말·경력)",
    },
    description: `${areaName || "전국"}에서 활동할 오토바이 퀵서비스 기사를 모집합니다. 출퇴근 자유, 예치금 0원, 비대면 가입, 초보·투잡·주말 라이더 지원 가능.`,
    // 실제 검증 후기가 있을 때만 별점/후기 부착 (없으면 미출력)
    ...ratingFields(),
  };
}

// ItemList 스키마 — 내부링크/운행지역/주제 허브 목록
export function itemListSchema(name, items) {
  const list = (items || []).filter((i) => i && i.href && i.name);
  if (!list.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: list.length,
    itemListElement: list.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: site.url + it.href,
    })),
  };
}
