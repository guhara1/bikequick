import { site } from "../data/site.js";
import { regions } from "../data/regions.js";
import { regionHero } from "../data/images.js";
import { layout } from "../templates/layout.js";
import { esc, icon, ctaButtons, pageHero } from "../templates/components.js";
import { serviceSchema, itemListSchema } from "../templates/schema.js";
import { regionGuideLinks } from "../data/longtail.js";
import {
  jumpMenu, summaryBox, reasonSection, areasSection,
  conditionsSection, beginnerSection, tipsSection,
  regionFaq, applySection, relatedLinks,
} from "../templates/regionSections.js";

// href 기준 중복 제거
function dedupeLinks(links) {
  const seen = new Set();
  return (links || []).filter((l) => {
    if (!l || !l.href || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

// 공통 직무 내부링크
const jobLinks = [
  { name: "퀵서비스 기사 모집", href: "/jobs/quick-service-rider/" },
  { name: "오토바이 투잡 안내", href: "/jobs/two-job-rider/" },
  { name: "부업 라이더 모집", href: "/jobs/part-time-rider/" },
  { name: "초보 기사 모집", href: "/jobs/beginner-rider/" },
  { name: "퀵기사 수익 안내", href: "/income/" },
  { name: "비대면 가입방법", href: "/join/" },
];

// 고품질 지역 페이지 조립
function buildRegionPage({ place, path, node, parent, areas, related, breadcrumbs, heroSlug, description }) {
  const faq = regionFaq(place);
  // 롱테일 가이드·블로그 링크를 관련 안내에 병합(중복 href 제거)
  const relatedAll = dedupeLinks([...(related || []), ...regionGuideLinks]);
  const body = `
<section class="page-head region-head">
  <div class="wrap">
    ${pageHero(regionHero(heroSlug), `${place} 오토바이 퀵서비스 기사 모집`)}
    <span class="badge">${icon("pin")} 지역 기사모집</span>
    <h1>${esc(place)} 퀵서비스 기사모집</h1>
    <p class="lead">${esc(node.summary || `${place}에서 활동할 오토바이 퀵서비스 기사를 모집합니다.`)}</p>
    ${ctaButtons()}
  </div>
</section>

<div class="wrap region-body">
  ${jumpMenu()}
  ${summaryBox(place)}
  ${reasonSection(place, node, parent)}
  ${areasSection(place, areas)}
  ${beginnerSection(place, node, parent)}
  ${tipsSection(place, node, parent)}
  ${conditionsSection(place)}
  ${faq.html}
  ${applySection(place)}
  ${relatedLinks(relatedAll)}
</div>
`;
  // 스키마: FAQPage + Service(모집) + ItemList(운행지역)
  //   JobPosting은 지원자 비용 정책 충돌 우려로 지역 페이지에 미적용.
  //   Service 는 실제 후기가 있을 때만 별점/후기가 자동 부착됩니다(허위 별점 없음).
  const service = serviceSchema(place);
  const areaList = itemListSchema(`${place} 주요 운행지역`, areas);
  return {
    path,
    html: layout({
      title: `${place} 퀵서비스 기사모집 — 오토바이 퀵기사 채용·투잡`,
      description,
      path,
      body,
      jsonld: [faq.schema, service, areaList].filter(Boolean),
      breadcrumbs,
    }),
  };
}

// /regions/ 인덱스
function regionsIndex() {
  const body = `
<section class="page-head"><div class="wrap">
  <span class="badge">${icon("pin")} 지역모집</span>
  <h1>전국 지역별 퀵서비스 기사 모집</h1>
  <p class="lead">시·도를 선택하면 해당 지역의 오더 특성·운행 환경, 근무 방식·수익 구조·수수료·가입 절차와 시·군·구·역세권별 운행지역을 확인할 수 있습니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="card-grid region-grid">
    ${regions
      .map(
        (r) => `<a class="card region-card" href="/regions/${r.slug}/">
          <span class="region-ico">${icon("pin")}</span>
          <h2>${esc(r.name)}</h2>
          <p>${esc(r.summary)}</p>
          ${r.districts ? `<span class="region-count">${r.districts.length}개 지역</span>` : ""}
        </a>`
      )
      .join("")}
  </div>
</div></section>`;
  return {
    path: "/regions/",
    html: layout({
      title: "전국 지역별 퀵서비스 기사 모집",
      description: "서울·경기·인천·부산 등 전국 17개 시·도 오토바이 퀵서비스 기사 모집. 지역별 오더 특성·근무 방식·수익 구조·가입 절차를 확인하세요.",
      path: "/regions/",
      body,
      breadcrumbs: [{ name: "홈", href: "/" }, { name: "지역모집", href: "/regions/" }],
    }),
  };
}

// 시·도
function regionPage(r) {
  const districts = r.districts || [];
  const areas = districts.map((d) => ({
    name: `${r.name} ${d.name}`,
    href: `/regions/${r.slug}/${d.slug}/`,
    desc: d.summary,
  }));
  const siblings = regions.filter((x) => x.slug !== r.slug).slice(0, 5)
    .map((x) => ({ name: `${x.name} 퀵서비스 기사모집`, href: `/regions/${x.slug}/` }));
  return buildRegionPage({
    place: r.name,
    path: `/regions/${r.slug}/`,
    node: r,
    parent: null,
    areas,
    related: [...siblings, ...jobLinks],
    heroSlug: r.slug,
    description: `${r.fullName || r.name}에서 활동할 오토바이 퀵서비스 기사를 모집합니다. 초보자·경력자·투잡 지원 가능하며 근무 방식, 수익 구조, 수수료, 준비물, 가입 절차와 ${r.name} 주요 운행지역을 확인하세요.`,
    breadcrumbs: [
      { name: "홈", href: "/" },
      { name: "지역모집", href: "/regions/" },
      { name: r.name, href: `/regions/${r.slug}/` },
    ],
  });
}

// 시·군·구
function districtPage(r, d) {
  const stations = d.stations || [];
  const place = `${r.name} ${d.name}`;
  const areas = stations.length
    ? stations.map((s) => ({
        name: s.name,
        href: `/regions/${r.slug}/${d.slug}/${s.slug}/`,
        desc: s.summary,
      }))
    : (r.districts || []).filter((x) => x.slug !== d.slug).slice(0, 4)
        .map((x) => ({ name: `${r.name} ${x.name}`, href: `/regions/${r.slug}/${x.slug}/`, desc: x.summary }));
  const sibling = (r.districts || []).filter((x) => x.slug !== d.slug).slice(0, 4)
    .map((x) => ({ name: `${r.name} ${x.name} 기사모집`, href: `/regions/${r.slug}/${x.slug}/` }));
  return buildRegionPage({
    place,
    path: `/regions/${r.slug}/${d.slug}/`,
    node: d,
    parent: r,
    areas,
    related: [
      { name: `${r.name} 전체 기사모집`, href: `/regions/${r.slug}/` },
      ...sibling,
      ...jobLinks,
    ],
    heroSlug: r.slug,
    description: `${place}에서 활동할 오토바이 퀵서비스 기사를 모집합니다. 초보자·경력자·투잡 지원 가능하며 근무 방식, 수익 구조, 수수료, 준비물, 가입 절차와 ${place} 주요 운행지역을 확인하세요.`,
    breadcrumbs: [
      { name: "홈", href: "/" },
      { name: "지역모집", href: "/regions/" },
      { name: r.name, href: `/regions/${r.slug}/` },
      { name: d.name, href: `/regions/${r.slug}/${d.slug}/` },
    ],
  });
}

// 역세권 / 행정구 / 행정동
function stationPage(r, d, s) {
  const place = `${d.name} ${s.name}`;
  const children = s.stations || [];
  const siblings = (d.stations || []).filter((x) => x.slug !== s.slug);
  // 행정구(하위 행정동 보유)면 소속 행정동을, 아니면 형제 지역을 운행지역으로 노출
  const areas = children.length
    ? children.map((x) => ({
        name: `${s.name} ${x.name}`,
        href: `/regions/${r.slug}/${d.slug}/${s.slug}/${x.slug}/`,
        desc: x.summary,
      }))
    : siblings.map((x) => ({
        name: x.name,
        href: `/regions/${r.slug}/${d.slug}/${x.slug}/`,
        desc: x.summary,
      }));
  return buildRegionPage({
    place,
    path: `/regions/${r.slug}/${d.slug}/${s.slug}/`,
    node: s,
    parent: d.orderProfile ? d : r,
    areas,
    related: [
      { name: `${r.name} ${d.name} 기사모집`, href: `/regions/${r.slug}/${d.slug}/` },
      { name: `${r.name} 전체 기사모집`, href: `/regions/${r.slug}/` },
      ...siblings.slice(0, 3).map((x) => ({ name: `${x.name} 기사모집`, href: `/regions/${r.slug}/${d.slug}/${x.slug}/` })),
      ...jobLinks,
    ],
    heroSlug: r.slug,
    description: `${s.name} 일대 오토바이 퀵서비스 기사를 모집합니다. 초보자·경력자·투잡 지원 가능하며 근무 방식, 수익 구조, 수수료, 준비물, 가입 절차와 ${s.name} 인근 운행지역을 확인하세요.`,
    breadcrumbs: [
      { name: "홈", href: "/" },
      { name: "지역모집", href: "/regions/" },
      { name: r.name, href: `/regions/${r.slug}/` },
      { name: d.name, href: `/regions/${r.slug}/${d.slug}/` },
      { name: s.name, href: `/regions/${r.slug}/${d.slug}/${s.slug}/` },
    ],
  });
}

// 4단계: 행정구 하위 행정동 (예: 수원시 → 장안구 → 정자동)
function subStationPage(r, d, s, dn) {
  const place = `${s.name} ${dn.name}`;
  const siblings = (s.stations || []).filter((x) => x.slug !== dn.slug);
  const areas = siblings.map((x) => ({
    name: x.name,
    href: `/regions/${r.slug}/${d.slug}/${s.slug}/${x.slug}/`,
    desc: x.summary,
  }));
  return buildRegionPage({
    place,
    path: `/regions/${r.slug}/${d.slug}/${s.slug}/${dn.slug}/`,
    node: dn,
    parent: s.orderProfile ? s : d,
    areas,
    related: [
      { name: `${d.name} ${s.name} 기사모집`, href: `/regions/${r.slug}/${d.slug}/${s.slug}/` },
      { name: `${d.name} 전체 기사모집`, href: `/regions/${r.slug}/${d.slug}/` },
      ...siblings.slice(0, 3).map((x) => ({ name: `${x.name} 기사모집`, href: `/regions/${r.slug}/${d.slug}/${s.slug}/${x.slug}/` })),
      ...jobLinks,
    ],
    heroSlug: r.slug,
    description: `${place} 일대 오토바이 퀵서비스 기사를 모집합니다. 초보자·경력자·투잡 지원 가능하며 근무 방식, 수익 구조, 수수료, 준비물, 가입 절차와 ${dn.name} 인근 운행지역을 확인하세요.`,
    breadcrumbs: [
      { name: "홈", href: "/" },
      { name: "지역모집", href: "/regions/" },
      { name: r.name, href: `/regions/${r.slug}/` },
      { name: d.name, href: `/regions/${r.slug}/${d.slug}/` },
      { name: s.name, href: `/regions/${r.slug}/${d.slug}/${s.slug}/` },
      { name: dn.name, href: `/regions/${r.slug}/${d.slug}/${s.slug}/${dn.slug}/` },
    ],
  });
}

export function regionsPages() {
  const pages = [regionsIndex()];
  for (const r of regions) {
    pages.push(regionPage(r));
    for (const d of r.districts || []) {
      pages.push(districtPage(r, d));
      for (const s of d.stations || []) {
        pages.push(stationPage(r, d, s));
        for (const dn of s.stations || []) pages.push(subStationPage(r, d, s, dn));
      }
    }
  }
  return pages;
}
