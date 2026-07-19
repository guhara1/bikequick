import { site, benefits, audiences } from "../data/site.js";
import { regions } from "../data/regions.js";
import { faq } from "../data/faq.js";
import { reviews, reviewsArePlaceholders } from "../data/reviews.js";
import { posts } from "../data/blog.js";
import { stats, whyUs, process } from "../data/trust.js";
import { img, blogImage } from "../data/images.js";
import { layout } from "../templates/layout.js";
import {
  esc,
  icon,
  ctaButtons,
  sectionTitle,
  incomeDisclaimer,
  figure,
  stars,
} from "../templates/components.js";

export function homePage() {
  const body = `
<section class="home-banner">
  <div class="wrap">
    <a href="/join/" aria-label="전국 오토바이 퀵서비스 기사 모집 · 지금 지원하기">
      <img src="${img("hero-main-upload")}" alt="전국 오토바이 퀵서비스 기사 모집·채용 — 전국 지역 근무, 자유로운 시간 선택, 안정적인 수입, 초보 환영·교육 지원. 지금 바로 지원하세요." width="1400" height="788" loading="eager" fetchpriority="high" decoding="async">
    </a>
  </div>
</section>

<section class="hero">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="badge">${icon("check")} 전국 오토바이 퀵서비스 기사 모집·채용</span>
      <h1>전국 퀵서비스 기사 모집<br><span class="hl">오토바이 퀵기사 채용</span></h1>
      <p class="hero-sub">출퇴근 시간에 얽매이지 않고, 원하는 시간·지역에서 자유롭게 운행하세요. 초보부터 경력까지, 인성데이타 통합콜로 함께 시작합니다.</p>
      <ul class="hero-points">
        <li>${icon("check")} 출퇴근 자유</li>
        <li>${icon("check")} 예치금 0원</li>
        <li>${icon("check")} 비대면 가입</li>
        <li>${icon("check")} 24시간 출금</li>
      </ul>
      ${ctaButtons("hero-cta")}
      <p class="hero-note">투잡·부업·주말·초보 라이더 모두 환영합니다.</p>
    </div>
    <div class="hero-visual">
      <div class="hero-card hero-card-solo" id="status">
        <h3>실시간 모집현황</h3>
        <p class="status-line"><span class="dot"></span> 전국 17개 시·도 모집 중</p>
        <div id="today" class="today-regions">
          ${regions.slice(0, 7).map((r) => `<a class="chip" href="/regions/${r.slug}/">${esc(r.name)}</a>`).join("")}
          <a class="chip chip-more" href="/regions/">전체 ›</a>
        </div>
        <a class="btn btn-primary btn-block" href="/join/">지금 가입 문의하기</a>
      </div>
    </div>
  </div>
</section>

<section class="trust-bar">
  <div class="wrap">
    ${stats
      .map(
        (s) => `<div class="trust-stat"><b>${esc(s.value)}<span class="u">${esc(s.unit)}</span></b><span>${esc(s.label)}</span></div>`
      )
      .join("")}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("WHO", "이런 분들에게 추천합니다", "생활 패턴에 맞춰 시작하는 라이더가 가장 오래 갑니다.")}
    <div class="card-grid audiences">
      ${audiences
        .map(
          (a) => `<div class="card audience"><span class="emoji" aria-hidden="true">${a.emoji}</span><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p></div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section-navy">
  <div class="wrap">
    ${sectionTitle("WHY BIKEQUICK", "전문가가 운영하는 퀵서비스 모집", "단순 광고가 아니라, 라이더가 오래 일할 수 있는 환경을 만듭니다.")}
    <div class="feature-grid">
      ${whyUs
        .map(
          (w) => `<div class="feature"><span class="benefit-ico">${icon(w.icon)}</span><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></div>`
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
          (b) => `<div class="card benefit"><span class="benefit-ico">${icon(b.icon)}</span><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p></div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="media-split">
      <div class="media-txt">
        <span class="kicker">PLATFORM</span>
        <h2 style="font-size:clamp(1.5rem,3.2vw,2.1rem);font-weight:820;letter-spacing:-.03em">인성데이타 통합콜로<br>오더 폭을 넓힙니다</h2>
        <p style="color:var(--ink-2);font-size:1.05rem">자사콜과 공유콜(공유센터)을 한 화면에서 확인하고 선택할 수 있습니다. 콜을 함께 활용하면 대기 시간이 줄고, 지역·시간대에 맞춰 효율적으로 운행할 수 있습니다. 동시 가입도 가능합니다.</p>
        <ul class="check-list">
          <li>${icon("check")} 인성1 · 인성2 통합콜 시스템</li>
          <li>${icon("check")} 공유센터 오더 공유로 대기 시간 단축</li>
          <li>${icon("check")} 자사콜 · 공유콜 선택 및 동시 가입 가능</li>
        </ul>
        <a class="btn btn-outline" href="/about/">운영 방식 자세히 ${icon("arrow")}</a>
      </div>
      <div class="media-img"><img src="${img("theme-map")}" alt="인성데이타 통합콜 — 자사콜과 공유콜 오더를 한 화면에서 확인하는 퀵서비스 배차 시스템" width="900" height="675" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>

<section class="section section-alt" id="income-preview">
  <div class="wrap">
    ${sectionTitle("INCOME", "수익 예시", "금액이 아닌, 운행 형태별 흐름을 보여주는 예시입니다.")}
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
      ${process.map((p) => `<li><span class="step-n">${p.n}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join("")}
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
            ${stars(5)}
            <blockquote>“${esc(r.text)}”</blockquote>
            <figcaption><span class="avatar" aria-hidden="true">${esc(r.name.replace(/[()예시\s]/g, "").slice(0, 1) || "R")}</span>${esc(r.name)} · ${esc(r.role)} · ${esc(r.region)}</figcaption>
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
      ${faq.slice(0, 6).map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join("")}
    </div>
    <p style="text-align:center;margin-top:1.5rem"><a class="link-arrow" href="/faq/">전체 FAQ 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    ${sectionTitle("REGIONS", "최신 모집지역", "전국 시·도별 오더 특성과 운행 환경을 확인하세요.")}
    <div class="region-chips">
      ${regions.map((r) => `<a class="chip" href="/regions/${r.slug}/">${esc(r.name)}</a>`).join("")}
    </div>
    <p style="margin-top:1.4rem"><a class="link-arrow" href="/regions/">전체 지역별 모집 보기 ${icon("arrow")}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionTitle("BLOG", "라이더 가이드 · 블로그", "퀵서비스 시작 방법부터 수익·보험·안전까지.")}
    <div class="card-grid posts">
      ${posts
        .slice(0, 6)
        .map(
          (p) => `<a class="card post" href="/blog/${p.slug}/">
            <img class="post-thumb" src="${blogImage(p.category)}" alt="${esc(p.title)}" width="600" height="338" loading="lazy" decoding="async">
            <div class="post-body">
              <span class="post-cat">${esc(p.category)}</span>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.excerpt)}</p>
              <time>${esc(p.date)}</time>
            </div>
          </a>`
        )
        .join("")}
    </div>
    <p style="text-align:center;margin-top:1.5rem"><a class="link-arrow" href="/blog/">블로그 전체 보기 ${icon("arrow")}</a></p>
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
