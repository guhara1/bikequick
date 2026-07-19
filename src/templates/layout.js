import { site } from "../data/site.js";
import { nav } from "../data/nav.js";
import { regions } from "../data/regions.js";
import { esc, icon } from "./components.js";

// 지역모집 드롭다운을 시·도 목록으로 채움
function regionDropdown() {
  return regions.map((r) => ({ label: r.name, href: `/regions/${r.slug}/` }));
}

function renderNav(currentPath) {
  const items = nav
    .map((item) => {
      const kids =
        item.label === "지역모집" ? regionDropdown() : item.children || [];
      const active = currentPath === item.href ? " active" : "";
      const dd = kids.length
        ? `<div class="dropdown"><div class="dropdown-inner">${kids
            .map((c) => `<a href="${c.href}">${esc(c.label)}</a>`)
            .join("")}</div></div>`
        : "";
      return `<li class="nav-item${kids.length ? " has-dd" : ""}">
        <a class="nav-link${active}" href="${item.href}">${esc(item.label)}</a>
        ${dd}
      </li>`;
    })
    .join("");
  return items;
}

function jsonLdBlock(objects) {
  return objects
    .filter(Boolean)
    .map(
      (o) =>
        `<script type="application/ld+json">${JSON.stringify(o)}</script>`
    )
    .join("\n");
}

// 전역 Organization + WebSite 스키마
function globalSchema() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: site.url + site.logo,
    description: site.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "recruitment",
      areaServed: "KR",
      availableLanguage: "Korean",
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "ko",
    potentialAction: {
      "@type": "SearchAction",
      target: site.url + "/search/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return [org, website];
}

/**
 * 페이지 레이아웃 렌더링
 * @param {Object} opts
 * @param {string} opts.title       페이지 제목
 * @param {string} opts.description  메타 설명
 * @param {string} opts.path         URL 경로 (예: /jobs/)
 * @param {string} opts.body         본문 HTML
 * @param {Array}  [opts.breadcrumbs] [{name, href}] — BreadcrumbList 스키마 생성
 * @param {Array}  [opts.jsonld]     추가 JSON-LD 객체 배열
 * @param {string} [opts.ogType]     og:type
 */
export function layout(opts) {
  const {
    title,
    description = site.description,
    path = "/",
    body,
    breadcrumbs = null,
    jsonld = [],
    ogType = "website",
  } = opts;

  // SEO 타이틀: "모집"과 "채용" 키워드를 함께 노출
  const brandSuffix = `${site.name} 퀵서비스 기사 채용`;
  const fullTitle =
    path === "/"
      ? `전국 오토바이 퀵서비스 기사 모집·채용 | ${site.name}`
      : `${title} | ${brandSuffix}`;
  const canonical = site.url + path;

  // BreadcrumbList 스키마
  const schemas = [...globalSchema(), ...jsonld];
  if (breadcrumbs && breadcrumbs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.href ? site.url + b.href : undefined,
      })),
    });
  }
  // WebPage 스키마
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title || site.name,
    url: canonical,
    description,
    inLanguage: "ko",
    isPartOf: { "@type": "WebSite", url: site.url },
  });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#ff5a1f">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:image" content="${site.url + site.ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="/assets/css/style.css?v=${site.assetVersion || "1"}">
${jsonLdBlock(schemas)}
</head>
<body>
<a class="skip-link" href="#main">본문 바로가기</a>
<div class="util-bar">
  <div class="wrap">
    <div class="util-left">
      <span>${icon("check")} 예치금 0원</span>
      <span>${icon("check")} 비대면 가입</span>
      <span>${icon("check")} 24시간 출금</span>
      <span>${icon("check")} 전국 17개 시·도 모집</span>
    </div>
    <div class="util-right">
      <a href="${site.contact.phoneHref}">${icon("phone")} ${esc(site.contact.phone)}</a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">🏍️</span>
      <span class="brand-text"><strong>${esc(site.name)}</strong><small>${esc(site.tagline)}</small></span>
    </a>
    <button class="nav-toggle" aria-label="메뉴 열기" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" aria-label="메인 메뉴">
      <ul class="nav-list">${renderNav(path)}</ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn-primary btn-sm" href="${site.contact.phoneHref}">${icon("phone")} ${esc(site.contact.phone)}</a>
    </div>
  </div>
</header>

<main id="main">
${breadcrumbs && breadcrumbs.length ? `<div class="wrap">${require_breadcrumb(breadcrumbs)}</div>` : ""}
${body}
</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <div class="brand"><span class="brand-mark">🏍️</span><strong>${esc(site.name)}</strong></div>
      <p>${esc(site.description)}</p>
      <p class="footer-contact">
        상담: <a href="${site.contact.phoneHref}">${esc(site.contact.phone)}</a> ·
        <a href="${site.contact.kakao}" target="_blank" rel="noopener">${esc(site.contact.kakaoLabel)}</a><br>
        ${esc(site.contact.hours)}
      </p>
    </div>
    <div class="footer-cols">
      <div><h4>기사모집</h4>
        <a href="/jobs/quick-service-rider/">퀵서비스 기사</a>
        <a href="/jobs/part-time-rider/">부업 라이더</a>
        <a href="/jobs/two-job-rider/">투잡 라이더</a>
        <a href="/jobs/beginner-rider/">초보 기사</a>
      </div>
      <div><h4>안내</h4>
        <a href="/work-guide/">근무안내</a>
        <a href="/income/">수익안내</a>
        <a href="/join/">가입방법</a>
        <a href="/faq/">자주 묻는 질문</a>
      </div>
      <div><h4>정보</h4>
        <a href="/regions/">지역별 모집</a>
        <a href="/education/">기사교육</a>
        <a href="/blog/">블로그</a>
        <a href="/community/">커뮤니티</a>
      </div>
      <div><h4>회사</h4>
        <a href="/about/">회사소개</a>
        <a href="/contact/">문의하기</a>
        <a href="/privacy/">개인정보처리방침</a>
        <a href="/terms/">이용약관</a>
      </div>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${new Date().getFullYear()} ${esc(site.name)}. 운영 플랫폼: ${esc(site.company.platform)}. 본 사이트의 수익 예시는 참고용이며 특정 금액을 보장하지 않습니다.</p>
  </div>
</footer>
<script src="/assets/js/main.js?v=${site.assetVersion || "1"}" defer></script>
</body>
</html>`;
}

// 레이아웃 내부에서 시각적 브레드크럼을 그리기 위한 헬퍼
function require_breadcrumb(items) {
  const parts = items
    .map((it, i) => {
      const last = i === items.length - 1;
      if (last || !it.href)
        return `<span aria-current="page">${esc(it.name)}</span>`;
      return `<a href="${it.href}">${esc(it.name)}</a>`;
    })
    .join('<span class="sep" aria-hidden="true">›</span>');
  return `<nav class="breadcrumb" aria-label="탐색 경로">${parts}</nav>`;
}
