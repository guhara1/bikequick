// 블로그 메타 + 본문(blog-content.js) 병합
// BlogPosting 구조화 데이터로 사용됩니다.
import { blogContent } from "./blog-content.js";

export const blogCategories = [
  "퀵서비스", "기사모집", "오토바이", "배달부업", "투잡", "라이더",
  "카카오퀵", "배민", "쿠팡", "보험", "오토바이관리", "안전운전",
  "수익노하우", "지역정보", "공지사항",
];

// 글 메타(제목·카테고리·날짜). 본문/요약은 blog-content.js 에서 병합.
const meta = [
  { slug: "quick-service-start-guide", title: "퀵서비스 처음 시작하기: 초보 라이더 완벽 가이드", category: "퀵서비스", date: "2026-07-10" },
  { slug: "two-job-recommendation", title: "직장인 투잡으로 오토바이 퀵서비스가 좋은 이유", category: "투잡", date: "2026-07-08" },
  { slug: "motorcycle-insurance-basics", title: "배달·퀵 라이더를 위한 오토바이 보험 기초", category: "보험", date: "2026-07-05" },
  { slug: "delivery-vs-quick-service", title: "배민 배달 vs 퀵서비스, 무엇이 나에게 맞을까", category: "배달부업", date: "2026-07-02" },
  { slug: "kakao-quick-start", title: "카카오퀵·통합콜 이해하기: 자사콜과 공유콜의 차이", category: "카카오퀵", date: "2026-06-28" },
  { slug: "motorcycle-maintenance-cost", title: "오토바이 유지비, 라이더가 꼭 알아야 할 항목", category: "오토바이관리", date: "2026-06-25" },
  { slug: "rainy-day-riding-tips", title: "비 오는 날 안전 운행 팁 7가지", category: "안전운전", date: "2026-06-20" },
];

export const posts = meta.map((m) => {
  const c = blogContent[m.slug] || { excerpt: "", body: [] };
  return { ...m, excerpt: c.excerpt, body: c.body };
});

export function findPost(slug) {
  return posts.find((p) => p.slug === slug);
}
