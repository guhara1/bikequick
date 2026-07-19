import { site } from "../data/site.js";

// HTML 이스케이프
export function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 인라인 SVG 아이콘 (외부 의존성 없음)
const ICONS = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M17 14h.5"/>',
  mobile: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h11v16H6a2 2 0 0 0-2 2z"/><path d="M17 3v16"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  phone: '<path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M4 5h16v10H8l-4 4z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
};

export function icon(name, cls = "") {
  const path = ICONS[name] || ICONS.check;
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

// 브레드크럼 (시각적 + BreadcrumbList JSON-LD는 layout에서 처리)
export function breadcrumb(items) {
  const parts = items
    .map((it, i) => {
      const last = i === items.length - 1;
      if (last || !it.href) return `<span aria-current="page">${esc(it.name)}</span>`;
      return `<a href="${it.href}">${esc(it.name)}</a>`;
    })
    .join('<span class="sep" aria-hidden="true">›</span>');
  return `<nav class="breadcrumb" aria-label="탐색 경로">${parts}</nav>`;
}

// CTA 버튼 묶음
export function ctaButtons(extraClass = "") {
  return `
  <div class="cta-group ${extraClass}">
    <a class="btn btn-primary" href="${site.contact.phoneHref}">${icon("phone")} 전화 상담 ${esc(site.contact.phone)}</a>
    <a class="btn btn-kakao" href="${site.contact.kakao}" target="_blank" rel="noopener">${icon("chat")} 카카오톡 가입</a>
    <a class="btn btn-outline" href="/join/">가입 문의</a>
  </div>`;
}

// 섹션 제목
export function sectionTitle(kicker, title, sub = "") {
  return `
  <div class="sec-head">
    ${kicker ? `<span class="kicker">${esc(kicker)}</span>` : ""}
    <h2>${esc(title)}</h2>
    ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ""}
  </div>`;
}

// 수익 예시 면책 문구 (반복 사용)
export const incomeDisclaimer = `<p class="disclaimer">※ 표시된 수익은 <strong>예시</strong>이며 특정 금액을 보장하지 않습니다. 실제 수익은 지역·시간대·경력·운행량에 따라 달라질 수 있습니다.</p>`;
