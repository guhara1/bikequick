import { site } from "../data/site.js";
import { reviews, reviewsArePlaceholders } from "../data/reviews.js";
import { layout } from "../templates/layout.js";
import { esc, icon, sectionTitle, incomeDisclaimer, stars } from "../templates/components.js";
import { serviceSchema } from "../templates/schema.js";

const bc = (extra) => [
  { name: "홈", href: "/" },
  { name: "커뮤니티", href: "/community/" },
  ...extra,
];

function communityIndex() {
  const cards = [
    ["서비스 이용 후기", "/community/reviews/", "실제 고객이 남긴 퀵서비스 이용후기"],
    ["수익 인증", "/community/income-proof/", "운행 수익 관련 안내와 참고 정보"],
    ["질문답변", "/community/qna/", "가입·근무·수익에 대한 질문과 답변"],
    ["공지사항", "/community/notice/", "모집·운영 관련 공지"],
    ["라이더 이야기", "/blog/", "라이더에게 필요한 정보 콘텐츠"],
  ];
  const body = `
<section class="page-head"><div class="wrap">
  <h1>커뮤니티</h1>
  <p class="lead">기사 후기, 질문답변, 공지사항을 확인하세요. 실제 라이더의 경험을 나눕니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="card-grid">
    ${cards
      .map(
        ([t, h, d]) => `<a class="card" href="${h}"><h2>${esc(t)}</h2><p>${esc(d)}</p>
          <span class="link-arrow">바로가기 ${icon("arrow")}</span></a>`
      )
      .join("")}
  </div>
</div></section>
`;
  return {
    path: "/community/",
    html: layout({
      title: "커뮤니티 — 후기·질문답변·공지",
      description: "바이크퀵 커뮤니티: 기사 후기, 수익 인증, 질문답변, 공지사항.",
      path: "/community/",
      body,
      breadcrumbs: bc([]),
    }),
  };
}

function reviewsPage() {
  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0";
  const body = `
<section class="page-head"><div class="wrap">
  <h1>서비스 이용 후기</h1>
  <p class="lead">바이크퀵 퀵서비스를 이용한 고객이 남긴 실제 후기입니다. 개인정보는 담지 않으며(익명), 가짜·자작 후기는 게시하지 않습니다.</p>
  ${
    reviews.length
      ? `<p class="review-summary"><strong>${avg}</strong> / 5.0 · 게시된 이용후기 ${reviews.length}건</p>`
      : ""
  }
</div></section>
<section class="section"><div class="wrap">
  ${
    reviews.length === 0
      ? `<p class="notice">검증된 고객 이용후기를 준비하고 있습니다. 바이크퀵은 가짜·자작 후기를 게시하지 않으며, 실제 후기만 확인 후 공개합니다. 문의는 <a href="${site.contact.phoneHref}">상담 전화(${esc(site.contact.phone)})</a>로 연락 주세요.</p>`
      : `<div class="card-grid reviews">
    ${reviews
      .map(
        (r) => `<figure class="card review">
          ${stars(r.rating)}
          <blockquote>“${esc(r.text)}”</blockquote>
          <figcaption><span class="avatar" aria-hidden="true">${icon("check")}</span>실제 이용 고객 · ${esc(r.tag)}</figcaption>
        </figure>`
      )
      .join("")}
  </div>`
  }
</div></section>
`;
  // Service + 후기/별점 스키마 (실제 게시 후기에서만 자동 생성)
  const service = serviceSchema();
  return {
    path: "/community/reviews/",
    html: layout({
      title: "서비스 이용 후기",
      description: "바이크퀵 퀵서비스 고객이 남긴 실제 이용후기. 배달 속도·정확성·기사 응대에 대한 평가를 확인하세요.",
      path: "/community/reviews/",
      body,
      jsonld: [service],
      breadcrumbs: bc([{ name: "서비스 이용 후기", href: "/community/reviews/" }]),
    }),
  };
}

function incomeProofPage() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>수익 인증</h1>
  <p class="lead">운행 수익 관련 참고 정보를 안내합니다.</p>
</div></section>
<section class="section"><div class="wrap prose">
  <p>수익 인증 게시물은 실제 라이더의 자발적 공유 내용을 기준으로 게시할 예정입니다. 특정 금액을 보장하거나 과장하지 않으며, 개인정보가 노출되지 않도록 관리합니다.</p>
  ${incomeDisclaimer}
  <p><a class="link-arrow" href="/income/">수익안내 자세히 보기 ${icon("arrow")}</a></p>
</div></section>
`;
  return {
    path: "/community/income-proof/",
    html: layout({
      title: "수익 인증",
      description: "바이크퀵 수익 인증 안내. 수익은 운행 조건에 따라 달라지며 특정 금액을 보장하지 않습니다.",
      path: "/community/income-proof/",
      body,
      breadcrumbs: bc([{ name: "수익 인증", href: "/community/income-proof/" }]),
    }),
  };
}

function qnaPage() {
  const qs = [
    ["오토바이가 없어도 지원할 수 있나요?", "운행에는 이륜차가 필요합니다. 보유 여부와 상관없이 먼저 상담을 통해 준비 방법을 안내받을 수 있습니다."],
    ["하루에 몇 시간 운행해야 하나요?", "최소 운행 시간 제약이 없습니다. 원하는 시간만 골라서 운행할 수 있어 부업·투잡에 적합합니다."],
    ["정산은 언제 되나요?", "운행 수익은 24시간 출금 신청이 가능합니다. 세부 정산 조건은 가입 상담 시 안내드립니다."],
    ["다른 지역으로 이동해서 운행해도 되나요?", "네, 원하는 지역을 선택해 운행할 수 있습니다. 지역별 오더 특성은 지역모집 페이지에서 확인하세요."],
  ];
  const body = `
<section class="page-head"><div class="wrap">
  <h1>질문답변</h1>
  <p class="lead">자주 나오는 질문과 답변입니다. 더 궁금한 점은 전화·카카오톡으로 문의하세요.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="faq-list faq-full">
    ${qs
      .map(
        ([q, a]) =>
          `<details class="faq-item"><summary>${esc(q)}</summary><div class="faq-a">${esc(a)}</div></details>`
      )
      .join("")}
  </div>
  <p style="margin-top:1.5rem"><a class="link-arrow" href="/faq/">전체 FAQ 보기 ${icon("arrow")}</a></p>
</div></section>
`;
  return {
    path: "/community/qna/",
    html: layout({
      title: "질문답변 (Q&A)",
      description: "퀵서비스 기사 가입·근무·수익·정산 관련 질문과 답변.",
      path: "/community/qna/",
      body,
      breadcrumbs: bc([{ name: "질문답변", href: "/community/qna/" }]),
    }),
  };
}

function noticePage() {
  const notices = [
    ["2026-07-15", "전국 17개 시·도 상시 모집 안내", "전국 오토바이 퀵서비스 기사를 상시 모집합니다. 지역별 모집 정보는 지역모집 페이지에서 확인하세요."],
    ["2026-07-01", "비대면 가입 안내", "방문 없이 전화·카카오톡으로 가입할 수 있습니다. 준비서류와 절차는 가입방법 페이지를 참고하세요."],
    ["2026-06-20", "초보 라이더 교육 안내", "퀵서비스가 처음인 분을 위한 단계별 교육을 제공합니다."],
  ];
  const body = `
<section class="page-head"><div class="wrap">
  <h1>공지사항</h1>
  <p class="lead">모집·운영 관련 공지를 안내합니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <ul class="notice-list">
    ${notices
      .map(
        ([d, t, b]) =>
          `<li><time>${esc(d)}</time><h2>${esc(t)}</h2><p>${esc(b)}</p></li>`
      )
      .join("")}
  </ul>
</div></section>
`;
  return {
    path: "/community/notice/",
    html: layout({
      title: "공지사항",
      description: "바이크퀵 공지사항: 전국 모집, 비대면 가입, 교육 안내.",
      path: "/community/notice/",
      body,
      breadcrumbs: bc([{ name: "공지사항", href: "/community/notice/" }]),
    }),
  };
}

export function communityPages() {
  return [
    communityIndex(),
    reviewsPage(),
    incomeProofPage(),
    qnaPage(),
    noticePage(),
  ];
}
