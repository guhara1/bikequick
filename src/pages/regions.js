import { site } from "../data/site.js";
import { regions } from "../data/regions.js";
import { layout } from "../templates/layout.js";
import { esc, icon, ctaButtons, sectionTitle } from "../templates/components.js";

// /regions/ — 전국 지역 인덱스
function regionsIndex() {
  const body = `
<section class="page-head">
  <div class="wrap">
    <h1>전국 지역별 퀵서비스 기사 모집</h1>
    <p class="lead">시·도를 선택하면 해당 지역의 오더 특성과 운행 환경, 시·군·구·역세권별 모집 정보를 확인할 수 있습니다.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="card-grid region-grid">
      ${regions
        .map(
          (r) => `<a class="card region-card" href="/regions/${r.slug}/">
            <span class="region-ico">${icon("pin")}</span>
            <h2>${esc(r.name)}</h2>
            <p>${esc(r.summary)}</p>
            ${
              r.districts
                ? `<span class="region-count">${r.districts.length}개 지역</span>`
                : ""
            }
          </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;
  return {
    path: "/regions/",
    html: layout({
      title: "전국 지역별 퀵서비스 기사 모집",
      description:
        "서울·경기·인천·부산 등 전국 17개 시·도 오토바이 퀵서비스 기사 모집. 지역별 오더 특성과 운행 환경을 확인하세요.",
      path: "/regions/",
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "지역모집", href: "/regions/" },
      ],
    }),
  };
}

// 공통: 지역 상세 본문 블록 (오더 특성/운행 환경/팁)
function localInfoBlock(node) {
  return `
    <div class="prose local-info">
      ${node.orderProfile ? `<h2>오더 특성</h2><p>${esc(node.orderProfile)}</p>` : ""}
      ${node.environment ? `<h2>운행 환경</h2><p>${esc(node.environment)}</p>` : ""}
      ${node.tips ? `<h2>운행 팁</h2><p>${esc(node.tips)}</p>` : ""}
    </div>`;
}

function jobLinksBlock(placeName) {
  const kinds = [
    { t: "퀵서비스 기사 모집", s: "quick-service-rider" },
    { t: "오토바이 기사 모집", s: "motorcycle-rider" },
    { t: "투잡 라이더 모집", s: "two-job-rider" },
    { t: "부업 라이더 모집", s: "part-time-rider" },
  ];
  return `
    <div class="local-jobs">
      <h2>${esc(placeName)} 모집 직무</h2>
      <div class="tag-grid">
        ${kinds
          .map(
            (k) =>
              `<a class="tag-link" href="/jobs/${k.s}/">${esc(placeName)} ${esc(k.t)}</a>`
          )
          .join("")}
      </div>
    </div>`;
}

// /regions/{region}/
function regionPage(r) {
  const path = `/regions/${r.slug}/`;
  const districts = r.districts || [];
  const body = `
<section class="page-head">
  <div class="wrap">
    <span class="badge">${icon("pin")} 지역모집</span>
    <h1>${esc(r.name)} 퀵서비스 기사 모집</h1>
    <p class="lead">${esc(r.summary)}</p>
    ${ctaButtons()}
  </div>
</section>

<section class="section">
  <div class="wrap grid-2">
    <div>
      ${localInfoBlock(r)}
      ${jobLinksBlock(r.name)}
    </div>
    <aside class="side-card">
      <h3>${esc(r.name)} 시·군·구</h3>
      ${
        districts.length
          ? `<div class="district-list">${districts
              .map(
                (d) =>
                  `<a href="/regions/${r.slug}/${d.slug}/">${esc(d.name)} ${icon("arrow")}</a>`
              )
              .join("")}</div>`
          : `<p>세부 지역 정보를 준비 중입니다.</p>`
      }
      <a class="btn btn-primary btn-block" href="${site.contact.phoneHref}">${icon("phone")} ${esc(r.name)} 모집 상담</a>
    </aside>
  </div>
</section>`;
  return {
    path,
    html: layout({
      title: `${r.name} 퀵서비스 기사 모집`,
      description: r.summary,
      path,
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "지역모집", href: "/regions/" },
        { name: r.name, href: path },
      ],
    }),
  };
}

// /regions/{region}/{district}/
function districtPage(r, d) {
  const path = `/regions/${r.slug}/${d.slug}/`;
  const stations = d.stations || [];
  const body = `
<section class="page-head">
  <div class="wrap">
    <span class="badge">${icon("pin")} ${esc(r.name)}</span>
    <h1>${esc(r.name)} ${esc(d.name)} 퀵서비스 기사 모집</h1>
    <p class="lead">${esc(d.summary)}</p>
    ${ctaButtons()}
  </div>
</section>

<section class="section">
  <div class="wrap grid-2">
    <div>
      ${localInfoBlock(d)}
      ${jobLinksBlock(`${r.name} ${d.name}`)}
    </div>
    <aside class="side-card">
      ${
        stations.length
          ? `<h3>${esc(d.name)} 주요 역세권</h3>
             <div class="district-list">${stations
               .map(
                 (s) =>
                   `<a href="/regions/${r.slug}/${d.slug}/${s.slug}/">${esc(s.name)} ${icon("arrow")}</a>`
               )
               .join("")}</div>`
          : `<h3>${esc(d.name)} 모집</h3><p>${esc(d.name)} 지역에서 함께할 라이더를 모집합니다.</p>`
      }
      <a class="btn btn-primary btn-block" href="${site.contact.phoneHref}">${icon("phone")} 모집 상담</a>
      <a class="btn btn-outline btn-block" href="/regions/${r.slug}/">← ${esc(r.name)} 전체 보기</a>
    </aside>
  </div>
</section>`;
  return {
    path,
    html: layout({
      title: `${r.name} ${d.name} 퀵서비스 기사 모집`,
      description: d.summary,
      path,
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "지역모집", href: "/regions/" },
        { name: r.name, href: `/regions/${r.slug}/` },
        { name: d.name, href: path },
      ],
    }),
  };
}

// /regions/{region}/{district}/{station}/
function stationPage(r, d, s) {
  const path = `/regions/${r.slug}/${d.slug}/${s.slug}/`;
  const body = `
<section class="page-head">
  <div class="wrap">
    <span class="badge">${icon("pin")} ${esc(r.name)} ${esc(d.name)}</span>
    <h1>${esc(s.name)} 퀵서비스 기사 모집</h1>
    <p class="lead">${esc(s.summary)}</p>
    ${ctaButtons()}
  </div>
</section>

<section class="section">
  <div class="wrap prose">
    <h2>${esc(s.name)} 오토바이 퀵기사 모집</h2>
    <p>${esc(s.name)} 일대에서 오토바이 퀵서비스 기사를 모집합니다. ${esc(d.summary)} 이 지역은 ${esc(r.name)} ${esc(d.name)}에 속하며, ${esc(
    (r.orderProfile || "").split(".")[0]
  )}.</p>
    <h2>${esc(s.name)} 투잡 · 부업</h2>
    <p>정해진 출퇴근 시간이 없어 ${esc(s.name)} 인근에서 퇴근 후·주말 시간을 활용한 투잡·부업 운행이 가능합니다. 원하는 시간대만 골라 운행할 수 있습니다.</p>
    ${jobLinksBlock(s.name)}
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="nearby">
      <h3>인근 역세권</h3>
      <div class="region-chips">
        ${(d.stations || [])
          .filter((x) => x.slug !== s.slug)
          .map(
            (x) =>
              `<a class="chip" href="/regions/${r.slug}/${d.slug}/${x.slug}/">${esc(x.name)}</a>`
          )
          .join("")}
      </div>
      <p style="margin-top:1rem"><a class="link-arrow" href="/regions/${r.slug}/${d.slug}/">${esc(d.name)} 전체 보기 ${icon("arrow")}</a></p>
    </div>
  </div>
</section>`;
  return {
    path,
    html: layout({
      title: `${s.name} 퀵서비스 기사 모집`,
      description: `${s.name} 오토바이 퀵서비스 기사 모집. ${s.summary}`,
      path,
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "지역모집", href: "/regions/" },
        { name: r.name, href: `/regions/${r.slug}/` },
        { name: d.name, href: `/regions/${r.slug}/${d.slug}/` },
        { name: s.name, href: path },
      ],
    }),
  };
}

export function regionsPages() {
  const pages = [regionsIndex()];
  for (const r of regions) {
    pages.push(regionPage(r));
    for (const d of r.districts || []) {
      pages.push(districtPage(r, d));
      for (const s of d.stations || []) {
        pages.push(stationPage(r, d, s));
      }
    }
  }
  return pages;
}
