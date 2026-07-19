import { site, benefits, audiences } from "../data/site.js";
import { regions } from "../data/regions.js";
import { jobs } from "../data/jobs.js";
import { faq } from "../data/faq.js";
import { reviews, reviewsArePlaceholders } from "../data/reviews.js";
import { posts } from "../data/blog.js";
import { layout } from "../templates/layout.js";
import {
  esc,
  icon,
  ctaButtons,
  sectionTitle,
  incomeDisclaimer,
} from "../templates/components.js";

export function homePage() {
  const body = `
<section class="hero">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="badge">전국 오토바이 퀵서비스 기사 모집</span>
      <h1>전국 퀵서비스 기사 모집<br><span class="hl">오토바이 퀵기사 채용</span></h1>
      <ul class="hero-points">
        <li>${icon("check")} 출퇴근 자유</li>
        <li>${icon("check")} 예치금 0원</li>
        <li>${icon("check")} 비대면 가입</li>
        <li>${icon("check")} 24시간 출금</li>
      </ul>
      ${ctaButtons("hero-cta")}
      <p class="hero-note">초보·투잡·부업·주말 라이더 모두 환영합니다.</p>
    </div>
    <div class="hero-card" id="status">
      <h3>실시간 모집현황</h3>
      <p class="status-line"><span class="dot"></span> 전국 17개 시·도 모집 중</p>
      <div id="today" class="today-regions">
        ${regions
          .slice(0, 8)
          .map(
            (r) =>
              `<a class="chip" href="/regions/${r.slug}/">${esc(r.name)}</a>`
          )
          .join("")}
        <a class="chip chip-more" href="/regions/">전체 지역 ›</a>
      </div>
      <a class="btn btn-primary btn-block" href="/join/">지금 가입 문의하기</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("WHO", "이런 분들에게 추천합니다")}
    <div class="card-grid audiences">
      ${audiences
        .map(
          (a) => `<div class="card audience">
            <span class="emoji" aria-hidden="true">${a.emoji}</span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.desc)}</p>
          </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    ${sectionTitle("BENEFITS", "바이크퀵의 장점")}
    <div class="card-grid benefits">
      ${benefits
        .map(
          (b) => `<div class="card benefit">
            <span class="benefit-ico">${icon(b.icon)}</span>
            <h3>${esc(b.title)}</h3>
            <p>${esc(b.desc)}</p>
          </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("PLATFORM", "플랫폼 소개", "자사콜과 공유콜을 함께 선택해 오더 폭을 넓힙니다.")}
    <div class="platform-grid">
      <div class="card platform"><h3>인성1 · 인성2</h3><p>인성데이타 기반 통합콜 시스템으로 오더를 실시간 확인합니다.</p></div>
      <div class="card platform"><h3>공유센터</h3><p>여러 업체의 오더를 공유해 대기 시간을 줄일 수 있습니다.</p></div>
      <div class="card platform"><h3>통합콜</h3><p>자사콜·공유콜을 한 화면에서 확인하고 선택합니다.</p></div>
      <div class="card platform"><h3>콜 선택 · 동시 가입</h3><p>자사콜과 공유콜을 함께 선택할 수 있고 동시 가입도 가능합니다.</p></div>
    </div>
  </div>
</section>

<section class="section section-alt" id="income-preview">
  <div class="wrap">
    ${sectionTitle("INCOME", "수익 예시", "아래 금액이 아닌 운행 형태별 흐름을 보여주는 예시입니다.")}
    <div class="table-wrap">
      <table class="income-table">
        <thead><tr><th>근무형태</th><th>운행 예시</th></tr></thead>
        <tbody>
          <tr><td>오전</td><td>오전 시간대 중심 운행 (출근·오전 업무 서류 오더)</td></tr>
          <tr><td>오후</td><td>오후 시간대 중심 운행 (점심 이후 B2B·상업 오더)</td></tr>
          <tr><td>주말</td><td>주말 집중 운행 (상업·생활 오더 증가)</td></tr>
          <tr><td>투잡</td><td>퇴근 후 저녁 시간 운행</td></tr>
        </tbody>
      </table>
    </div>
    ${incomeDisclaimer}
    <p><a class="link-arrow" href="/income/">수익안내 자세히 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("HOW", "가입절차", "문의부터 근무 시작까지 5단계")}
    <ol class="steps">
      <li><span class="step-n">1</span><h3>문의</h3><p>전화 또는 카카오톡으로 문의합니다.</p></li>
      <li><span class="step-n">2</span><h3>전화 상담</h3><p>근무 조건과 지역을 상담합니다.</p></li>
      <li><span class="step-n">3</span><h3>비대면 가입</h3><p>방문 없이 서류를 제출하고 가입합니다.</p></li>
      <li><span class="step-n">4</span><h3>교육</h3><p>오더·배차·앱 사용법을 안내받습니다.</p></li>
      <li><span class="step-n">5</span><h3>근무 시작</h3><p>원하는 시간·지역에서 운행을 시작합니다.</p></li>
    </ol>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    ${sectionTitle("REVIEWS", "기사 후기")}
    ${
      reviewsArePlaceholders
        ? `<p class="notice">아래 후기는 <strong>레이아웃 예시</strong>입니다. 실제 검증된 기사 후기로 교체 예정이며, 가짜 후기는 게시하지 않습니다.</p>`
        : ""
    }
    <div class="card-grid reviews">
      ${reviews
        .map(
          (r) => `<figure class="card review">
            <blockquote>“${esc(r.text)}”</blockquote>
            <figcaption>${esc(r.name)} · ${esc(r.role)} · ${esc(r.region)}</figcaption>
          </figure>`
        )
        .join("")}
    </div>
    <p><a class="link-arrow" href="/community/reviews/">후기 더 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("FAQ", "자주 묻는 질문")}
    <div class="faq-list">
      ${faq
        .slice(0, 6)
        .map(
          (f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`
        )
        .join("")}
    </div>
    <p><a class="link-arrow" href="/faq/">전체 FAQ 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    ${sectionTitle("REGIONS", "최신 모집지역", "전국 시·도별 모집 정보를 확인하세요.")}
    <div class="region-chips">
      ${regions
        .map(
          (r) => `<a class="chip" href="/regions/${r.slug}/">${esc(r.name)}</a>`
        )
        .join("")}
    </div>
    <p><a class="link-arrow" href="/regions/">전체 지역별 모집 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("BLOG", "블로그 최신글")}
    <div class="card-grid posts">
      ${posts
        .slice(0, 6)
        .map(
          (p) => `<a class="card post" href="/blog/${p.slug}/">
            <span class="post-cat">${esc(p.category)}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.excerpt)}</p>
            <time>${esc(p.date)}</time>
          </a>`
        )
        .join("")}
    </div>
    <p><a class="link-arrow" href="/blog/">블로그 전체 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <h2>지금 바로 시작하세요</h2>
    <p>전국 어디서나 오토바이 퀵서비스 기사로 자유롭게 일할 수 있습니다.</p>
    ${ctaButtons("cta-band-btns")}
  </div>
</section>
`;

  // 홈 FAQ 스키마
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.slice(0, 6).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return {
    path: "/",
    html: layout({
      title: site.tagline,
      description: site.description,
      path: "/",
      body,
      jsonld: [faqSchema],
    }),
  };
}
