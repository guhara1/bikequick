// 재사용 스키마 빌더 (Schema.org JSON-LD)
// ⚠️ 후기/별점 스키마는 reviews.js 의 "실제 검증 후기"에서만 생성합니다.
//    데이터가 없으면 아무 것도 출력하지 않습니다(허위 별점·자작 리뷰 금지).
import { site } from "../data/site.js";
import { reviews } from "../data/reviews.js";

// 실제 후기가 있을 때만 AggregateRating + Review 필드를 반환 (없으면 빈 객체)
export function ratingFields() {
  const list = (reviews || []).filter((r) => r && r.text);
  if (!list.length) return {};
  const scores = list.map((r) => Number(r.rating) || 5);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: list.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: list.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: Number(r.rating) || 5,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Person", name: r.name || "익명" },
      datePublished: r.date || undefined,
      reviewBody: r.text,
    })),
  };
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
