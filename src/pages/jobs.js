import { site } from "../data/site.js";
import { jobs } from "../data/jobs.js";
import { layout } from "../templates/layout.js";
import { esc, icon, ctaButtons, sectionTitle } from "../templates/components.js";

// 기사모집 인덱스
function jobsIndex() {
  const body = `
<section class="page-head">
  <div class="wrap">
    <h1>기사모집</h1>
    <p class="lead">전국 오토바이 퀵서비스 기사를 모집합니다. 원하는 근무 형태를 선택하세요.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="card-grid jobs-grid">
      ${jobs
        .map(
          (j) => `<a class="card job-card" href="/jobs/${j.slug}/">
            <h2>${esc(j.title)}</h2>
            <p>${esc(j.lead)}</p>
            <ul class="tag-row">${j.highlights
              .slice(0, 3)
              .map((h) => `<li>${esc(h)}</li>`)
              .join("")}</ul>
            <span class="link-arrow">자세히 보기 ${icon("arrow")}</span>
          </a>`
        )
        .join("")}
    </div>
  </div>
</section>
${ctaBand()}
`;
  return {
    path: "/jobs/",
    html: layout({
      title: "기사모집 — 퀵서비스·오토바이 기사 채용",
      description:
        "퀵서비스 기사, 오토바이 기사, 부업·투잡·주말·초보·경력·여성 라이더 모집. 출퇴근 자유, 예치금 0원, 비대면 가입.",
      path: "/jobs/",
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "기사모집", href: "/jobs/" },
      ],
    }),
  };
}

// 개별 직무 페이지
function jobPage(j) {
  const path = `/jobs/${j.slug}/`;
  const body = `
<section class="page-head">
  <div class="wrap">
    <span class="badge">기사모집</span>
    <h1>${esc(j.title)}</h1>
    <p class="lead">${esc(j.lead)}</p>
    ${ctaButtons()}
  </div>
</section>

<section class="section">
  <div class="wrap grid-2">
    <div class="prose">
      <h2>어떤 일인가요?</h2>
      <p>${esc(j.detail)}</p>
      <h2>이런 분께 추천합니다</h2>
      <p>${esc(j.who)}</p>
      <h2>지원 자격</h2>
      <ul class="check-list">
        ${j.requirements.map((r) => `<li>${icon("check")} ${esc(r)}</li>`).join("")}
      </ul>
    </div>
    <aside class="side-card">
      <h3>모집 요약</h3>
      <ul class="spec-list">
        <li><span>모집 지역</span><strong>전국</strong></li>
        <li><span>근무 형태</span><strong>시간·지역 자유 선택</strong></li>
        <li><span>가입 방식</span><strong>비대면 (전화·카카오톡)</strong></li>
        <li><span>예치금</span><strong>0원</strong></li>
      </ul>
      <div class="highlight-box">
        <h4>핵심 혜택</h4>
        <ul>${j.highlights.map((h) => `<li>${icon("check")} ${esc(h)}</li>`).join("")}</ul>
      </div>
      <a class="btn btn-primary btn-block" href="${site.contact.phoneHref}">${icon("phone")} 전화 상담</a>
      <a class="btn btn-kakao btn-block" href="${site.contact.kakao}" target="_blank" rel="noopener">${icon("chat")} 카카오톡 문의</a>
    </aside>
  </div>
</section>
${ctaBand()}
`;

  // JobPosting 스키마
  // ⚠️ 실제 채용 내용과 반드시 일치해야 하며 과장/허위 금지.
  //    보상(baseSalary)은 확정 금액이 없으므로 의도적으로 생략합니다.
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: `${j.detail} ${j.who}`,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    employmentType: j.employmentType,
    industry: "퀵서비스/이륜차 배송",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "대한민국" },
    directApply: true,
  };

  return {
    path,
    html: layout({
      title: j.title,
      description: j.lead,
      path,
      body,
      ogType: "article",
      jsonld: [jobSchema],
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "기사모집", href: "/jobs/" },
        { name: j.title, href: path },
      ],
    }),
  };
}

function ctaBand() {
  return `
<section class="cta-band">
  <div class="wrap">
    <h2>지원은 간단합니다</h2>
    <p>전화 또는 카카오톡으로 문의하시면 비대면으로 가입을 도와드립니다.</p>
    ${ctaButtons("cta-band-btns")}
  </div>
</section>`;
}

export function jobsPages() {
  return [jobsIndex(), ...jobs.map(jobPage)];
}
