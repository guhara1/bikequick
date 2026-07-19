import { site, benefits } from "../data/site.js";
import { faq } from "../data/faq.js";
import { layout } from "../templates/layout.js";
import {
  esc,
  icon,
  ctaButtons,
  sectionTitle,
  incomeDisclaimer,
} from "../templates/components.js";

const bc = (extra) => [
  { name: "홈", href: "/" },
  ...extra,
];

function page(path, title, description, body, opts = {}) {
  return {
    path,
    html: layout({ title, description, path, body, ...opts }),
  };
}

// 근무안내 -------------------------------------------------------------
function workGuide() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>근무안내</h1>
  <p class="lead">바이크퀵의 근무 방식과 조건을 안내합니다. 자유로운 근무와 투명한 운영을 지향합니다.</p>
</div></section>
<section class="section"><div class="wrap prose">
  <h2 id="how">근무방식</h2>
  <p>콜(오더)을 받아 출발지에서 도착지까지 서류·물품을 배송합니다. 자사콜과 공유콜을 함께 선택할 수 있어 오더 폭이 넓습니다.</p>
  <h2 id="flexible">출퇴근 자유</h2>
  <p>정해진 출퇴근 시간이 없습니다. 원하는 시간과 지역을 스스로 선택해 운행할 수 있어 부업·투잡·주말 근무 모두 가능합니다.</p>
  <h2 id="hours">24시간 근무 가능</h2>
  <p>오전·오후·야간·주말 등 원하는 시간대에 운행할 수 있습니다. 시간대별 오더 특성은 <a href="/income/">수익안내</a>에서 확인하세요.</p>
  <h2 id="online">비대면 가입</h2>
  <p>방문 없이 전화·카카오톡 상담과 서류 제출로 가입이 완료됩니다. 자세한 절차는 <a href="/join/">가입방법</a>을 참고하세요.</p>
  <h2 id="deposit">예치금 0원</h2>
  <p>가입 시 예치금 부담이 없습니다. 세부 정산·비용 조건은 상담 시 투명하게 안내드립니다.</p>
  <h2 id="insurance">보험 안내</h2>
  <p>배송 목적의 이륜차는 유상운송에 해당해 일반 개인용 보험과 보장 범위가 다를 수 있습니다. 본인 운행 형태에 맞는 보험 가입이 필요하며, 정확한 조건은 보험사·상담을 통해 확인하세요.</p>
  <h2 id="fee">관리비 안내</h2>
  <p>관리비 등 세부 비용은 운영 정책과 선택하는 콜(자사콜/공유콜)에 따라 달라질 수 있습니다. 가입 상담 시 정확히 안내드립니다.</p>
</div></section>
${band("근무 조건이 궁금하신가요?", "전화 또는 카카오톡으로 편하게 문의하세요.")}
`;
  return page(
    "/work-guide/",
    "근무안내 — 근무방식·출퇴근 자유·예치금·보험",
    "바이크퀵 근무안내: 근무방식, 출퇴근 자유, 24시간 근무, 비대면 가입, 예치금 0원, 보험·관리비 안내.",
    body,
    { breadcrumbs: bc([{ name: "근무안내", href: "/work-guide/" }]) }
  );
}

// 수익안내 -------------------------------------------------------------
function income() {
  const rows = [
    ["morning", "오전 수입", "출근 시간대 서류·업무 오더가 발생합니다. 오피스 밀집 지역에서 대기 없이 오더를 받기 좋은 시간대입니다."],
    ["afternoon", "오후 수입", "점심 이후 B2B·상업 오더가 이어집니다. 지역에 따라 물품·샘플 오더 비중이 높아집니다."],
    ["night", "야간 수입", "저녁·야간에는 상권·생활 오더가 늘어납니다. 야간 운행 시 안전에 특히 유의해야 합니다."],
    ["weekend", "주말 수입", "주말에는 상업·생활 오더가 증가하는 지역이 많습니다. 주말 집중 운행에 적합합니다."],
  ];
  const body = `
<section class="page-head"><div class="wrap">
  <h1>수익안내</h1>
  <p class="lead">시간대·근무형태별 운행 특성을 안내합니다. 아래 내용은 참고용 예시이며 특정 금액을 보장하지 않습니다.</p>
</div></section>
<section class="section"><div class="wrap prose">
  <h2 id="average">평균 수입에 대하여</h2>
  <p>퀵서비스 수익은 <strong>운행 지역·시간대·경력·운행량</strong>에 따라 크게 달라집니다. 동일한 시간을 운행해도 오더 밀도가 높은 지역과 시간대에서 결과가 달라질 수 있습니다. 특정 금액을 기대하기보다 본인 상황에 맞는 운행 패턴을 찾는 것이 중요합니다.</p>
  ${rows
    .map(
      ([id, h, p]) => `<h2 id="${id}">${esc(h.replace(" 수입", ""))} 시간대</h2><p>${esc(p)}</p>`
    )
    .join("")}
  <h2 id="twojob">투잡 사례</h2>
  <p>본업이 끝난 저녁이나 주말에만 운행하는 투잡 라이더가 많습니다. 하루 1~2시간부터 시작할 수 있어 본업과 병행하기 좋습니다. 실제 결과는 개인의 운행 방식에 따라 다릅니다.</p>
  <h2 id="tips">수익 관리 노하우</h2>
  <ul class="check-list">
    <li>${icon("check")} 오더가 몰리는 시간대(출근·점심·퇴근)를 활용하세요.</li>
    <li>${icon("check")} 오더 밀도가 높은 지역을 베이스로 잡아 대기 시간을 줄이세요.</li>
    <li>${icon("check")} 자사콜·공유콜을 함께 선택해 오더 폭을 넓히세요.</li>
    <li>${icon("check")} 유지비(연료·소모품)를 계산해 실수입을 관리하세요.</li>
    <li>${icon("check")} 무리한 운행보다 안전과 정확성을 우선하세요.</li>
  </ul>
</div></section>
<section class="section section-alt"><div class="wrap">
  ${sectionTitle("EXAMPLE", "근무형태별 운행 예시")}
  <div class="table-wrap"><table class="income-table">
    <thead><tr><th>근무형태</th><th>운행 예시</th></tr></thead>
    <tbody>
      <tr><td>오전</td><td>오전 시간대 중심 운행</td></tr>
      <tr><td>오후</td><td>오후 시간대 중심 운행</td></tr>
      <tr><td>주말</td><td>주말 집중 운행</td></tr>
      <tr><td>투잡</td><td>퇴근 후 운행</td></tr>
    </tbody>
  </table></div>
  ${incomeDisclaimer}
</div></section>
${band("나에게 맞는 운행 방식 상담받기", "지역·시간대에 맞는 운행 방법을 안내해 드립니다.")}
`;
  return page(
    "/income/",
    "수익안내 — 시간대·근무형태별 운행 예시",
    "퀵서비스 수익 예시: 오전·오후·야간·주말·투잡 시간대별 운행 특성과 수익 관리 노하우. 실제 수익은 운행 조건에 따라 달라집니다.",
    body,
    { breadcrumbs: bc([{ name: "수익안내", href: "/income/" }]) }
  );
}

// 가입방법 -------------------------------------------------------------
function join() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>가입방법</h1>
  <p class="lead">방문 없이 비대면으로 가입할 수 있습니다. 문의부터 근무 시작까지 함께 도와드립니다.</p>
  ${ctaButtons()}
</div></section>
<section class="section"><div class="wrap prose">
  <h2 id="steps">가입 절차</h2>
  <ol class="steps steps-vertical">
    <li><span class="step-n">1</span><h3>문의</h3><p>전화 또는 카카오톡으로 문의합니다.</p></li>
    <li><span class="step-n">2</span><h3>전화 상담</h3><p>근무 조건·지역·시간대를 상담합니다.</p></li>
    <li><span class="step-n">3</span><h3>비대면 가입</h3><p>준비서류를 제출하고 가입을 진행합니다.</p></li>
    <li><span class="step-n">4</span><h3>교육</h3><p>오더 확인·배차·앱 사용법을 안내받습니다.</p></li>
    <li><span class="step-n">5</span><h3>근무 시작</h3><p>원하는 시간·지역에서 운행을 시작합니다.</p></li>
  </ol>
  <h2 id="phone">전화 가입</h2>
  <p><a href="${site.contact.phoneHref}">${esc(site.contact.phone)}</a> 로 전화 주시면 상담원이 가입을 안내합니다. (${esc(site.contact.hours)})</p>
  <h2 id="kakao">카카오톡 가입</h2>
  <p><a href="${site.contact.kakao}" target="_blank" rel="noopener">${esc(site.contact.kakaoLabel)}</a>로 문의하시면 채팅으로 편하게 가입할 수 있습니다.</p>
  <h2 id="online">비대면 가입</h2>
  <p>방문 없이 전화·카카오톡 상담과 서류 제출만으로 가입이 완료됩니다.</p>
  <h2 id="documents">준비서류</h2>
  <ul class="check-list">
    <li>${icon("check")} 신분증</li>
    <li>${icon("check")} 오토바이 운전면허(원동기 이상)</li>
    <li>${icon("check")} 이륜차 관련 서류(보유 시)</li>
    <li>${icon("check")} 정산용 본인 명의 계좌</li>
  </ul>
  <p class="disclaimer">※ 세부 준비서류는 근무 형태·지역에 따라 달라질 수 있으며, 상담 시 정확히 안내드립니다.</p>
  <h2 id="education">가입 후 교육</h2>
  <p>가입 후에는 <a href="/education/">기사교육</a>을 통해 오더 받는 법, 배차 노하우, 앱 사용법, 안전운전을 안내받습니다.</p>
</div></section>
${band("지금 가입 문의하기", "전화 또는 카카오톡으로 편하게 시작하세요.")}
`;
  return page(
    "/join/",
    "가입방법 — 비대면 전화·카카오톡 가입",
    "바이크퀵 가입방법: 전화·카카오톡 비대면 가입, 준비서류, 가입 절차, 가입 후 교육까지 단계별 안내.",
    body,
    { breadcrumbs: bc([{ name: "가입방법", href: "/join/" }]) }
  );
}

// 기사교육 -------------------------------------------------------------
function education() {
  const items = [
    ["beginner", "초보 교육", "오토바이 배송이 처음인 분을 위해 기본부터 단계별로 안내합니다. 무리한 목표보다 안전한 적응을 우선합니다."],
    ["orders", "오더 받는 방법", "앱에서 오더를 확인하고 수락하는 방법, 출발·도착지 확인 요령을 배웁니다."],
    ["dispatch", "배차 노하우", "동선을 고려해 오더를 선택하고 대기 시간을 줄이는 방법을 익힙니다."],
    ["income", "수익 올리는 방법", "오더가 몰리는 시간대·지역 활용, 자사콜·공유콜 병행 등 실수입 관리법을 안내합니다."],
    ["app", "앱 사용법", "통합콜·공유센터 앱의 기본 사용법과 정산 확인 방법을 안내합니다."],
    ["safety", "안전운전", "빗길·야간 운행 수칙, 방어운전, 보호장구 착용 등 안전 수칙을 강조합니다."],
  ];
  const body = `
<section class="page-head"><div class="wrap">
  <h1>기사교육</h1>
  <p class="lead">처음 시작하는 분도 걱정 없도록 오더부터 안전운전까지 단계별로 교육합니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="card-grid edu-grid">
    ${items
      .map(
        ([id, h, p]) =>
          `<div class="card edu-card" id="${id}"><h2>${esc(h)}</h2><p>${esc(p)}</p></div>`
      )
      .join("")}
  </div>
</div></section>
${band("교육과 함께 시작하세요", "초보도 안전하게 적응할 수 있도록 도와드립니다.")}
`;
  return page(
    "/education/",
    "기사교육 — 초보 교육·오더·배차·안전운전",
    "퀵서비스 기사교육: 초보 교육, 오더 받는 법, 배차 노하우, 수익 올리는 방법, 앱 사용법, 안전운전 안내.",
    body,
    { breadcrumbs: bc([{ name: "기사교육", href: "/education/" }]) }
  );
}

// FAQ -----------------------------------------------------------------
function faqPage() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>자주 묻는 질문</h1>
  <p class="lead">가입 전 궁금한 점을 모았습니다. 더 궁금한 내용은 전화·카카오톡으로 문의하세요.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="faq-list faq-full">
    ${faq
      .map(
        (f) =>
          `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`
      )
      .join("")}
  </div>
</div></section>
${band("답을 못 찾으셨나요?", "전화 또는 카카오톡으로 직접 문의해 주세요.")}
`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return page(
    "/faq/",
    "자주 묻는 질문 (FAQ)",
    "초보 가능 여부, 예치금, 출퇴근 시간, 교육, 보험, 관리비, 수익, 가입 방법 등 퀵서비스 기사 모집 FAQ.",
    body,
    { breadcrumbs: bc([{ name: "FAQ", href: "/faq/" }]), jsonld: [faqSchema] }
  );
}

// 회사소개 -------------------------------------------------------------
function about() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>회사소개</h1>
  <p class="lead">바이크퀵은 전국 오토바이 퀵서비스 기사 모집과 라이더 정보 제공을 함께하는 채용 정보 플랫폼입니다.</p>
</div></section>
<section class="section"><div class="wrap prose">
  <h2>우리가 하는 일</h2>
  <p>바이크퀵은 전국에서 오토바이 퀵서비스 기사를 모집하고, 라이더가 실제로 궁금해하는 근무·수익·교육·안전 정보를 함께 제공합니다. 광고성 정보가 아니라 구직자에게 실질적으로 도움이 되는 정보를 우선합니다.</p>
  <h2 id="insungdata">인성데이타 기반 운영</h2>
  <p>인성데이타 통합콜 시스템을 기반으로 자사콜과 공유콜을 함께 운영합니다. 라이더는 오더를 실시간으로 확인하고 선택할 수 있습니다.</p>
  <h2 id="how">운영방식</h2>
  <ul class="check-list">
    <li>${icon("check")} 출퇴근 시간·지역 자유 선택</li>
    <li>${icon("check")} 비대면 가입 및 예치금 0원</li>
    <li>${icon("check")} 자사콜·공유콜 동시 활용 가능</li>
    <li>${icon("check")} 초보 라이더 교육 및 안전운전 안내</li>
  </ul>
  <h2>정직한 정보 제공 원칙</h2>
  <p>본 사이트의 수익 예시는 참고용이며 특정 금액을 보장하지 않습니다. 후기는 실제 검증된 기사 후기만 게시하며, 과장·허위 정보를 포함하지 않습니다.</p>
  <div class="info-table">
    <table class="income-table">
      <tbody>
        <tr><td>운영 플랫폼</td><td>${esc(site.company.platform)}</td></tr>
        <tr><td>상담 연락처</td><td>${esc(site.contact.phone)}</td></tr>
        <tr><td>상담 시간</td><td>${esc(site.contact.hours)}</td></tr>
      </tbody>
    </table>
  </div>
  <p class="disclaimer">※ 사업자 정보(상호·대표자·사업자등록번호·주소)는 실제 운영 정보로 업데이트됩니다.</p>
</div></section>
${band("함께할 라이더를 찾습니다", "궁금한 점은 언제든 문의해 주세요.")}
`;
  return page(
    "/about/",
    "회사소개 — 바이크퀵",
    "바이크퀵 회사소개: 인성데이타 기반 전국 오토바이 퀵서비스 기사 모집 채용 정보 플랫폼. 정직한 정보 제공 원칙을 지킵니다.",
    body,
    { breadcrumbs: bc([{ name: "회사소개", href: "/about/" }]) }
  );
}

// 문의하기 -------------------------------------------------------------
function contact() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>문의하기</h1>
  <p class="lead">가입·근무·수익 등 궁금한 점을 편하게 문의하세요.</p>
</div></section>
<section class="section"><div class="wrap contact-grid">
  <a class="card contact-card" href="${site.contact.phoneHref}">
    <span class="benefit-ico">${icon("phone")}</span>
    <h2>전화 상담</h2><p>${esc(site.contact.phone)}</p><small>${esc(site.contact.phoneLabel)} · ${esc(site.contact.hours)}</small>
  </a>
  <a class="card contact-card" href="${site.contact.kakao}" target="_blank" rel="noopener">
    <span class="benefit-ico">${icon("chat")}</span>
    <h2>카카오톡 문의</h2><p>${esc(site.contact.kakaoLabel)}</p><small>채팅으로 편하게 문의</small>
  </a>
  <a class="card contact-card" href="mailto:${esc(site.contact.email)}">
    <span class="benefit-ico">${icon("book")}</span>
    <h2>이메일</h2><p>${esc(site.contact.email)}</p><small>서류·상세 문의</small>
  </a>
</div></section>
`;
  return page(
    "/contact/",
    "문의하기 — 전화·카카오톡·이메일",
    "바이크퀵 문의: 전화, 카카오톡 채널, 이메일로 퀵서비스 기사 모집·가입 문의를 받습니다.",
    body,
    { breadcrumbs: bc([{ name: "문의하기", href: "/contact/" }]) }
  );
}

// 개인정보처리방침 / 이용약관 (기본 뼈대 — 실제 운영 시 법무 검토 필요)
function privacy() {
  const body = `
<section class="page-head"><div class="wrap"><h1>개인정보처리방침</h1></div></section>
<section class="section"><div class="wrap prose">
  <p class="disclaimer">※ 아래는 기본 양식입니다. 실제 운영 전 사업자 정보에 맞춰 법적 검토 후 확정하세요.</p>
  <h2>1. 수집하는 개인정보 항목</h2><p>가입 상담 및 채용 진행을 위해 성명, 연락처, 면허 정보, 정산용 계좌 정보 등을 수집할 수 있습니다.</p>
  <h2>2. 이용 목적</h2><p>기사 모집·가입 상담, 교육 안내, 정산 및 고객 문의 응대를 위해 이용합니다.</p>
  <h2>3. 보유 및 이용 기간</h2><p>목적 달성 후 관련 법령에 따른 보존 기간을 제외하고 지체 없이 파기합니다.</p>
  <h2>4. 제3자 제공</h2><p>법령에 근거하거나 이용자 동의가 있는 경우를 제외하고 제3자에게 제공하지 않습니다.</p>
  <h2>5. 이용자의 권리</h2><p>이용자는 자신의 개인정보 열람·정정·삭제·처리정지를 요청할 수 있습니다.</p>
  <h2>6. 문의처</h2><p>개인정보 관련 문의: ${esc(site.contact.email)}</p>
</div></section>
`;
  return page("/privacy/", "개인정보처리방침", "바이크퀵 개인정보처리방침.", body, {
    breadcrumbs: bc([{ name: "개인정보처리방침", href: "/privacy/" }]),
  });
}

function terms() {
  const body = `
<section class="page-head"><div class="wrap"><h1>이용약관</h1></div></section>
<section class="section"><div class="wrap prose">
  <p class="disclaimer">※ 아래는 기본 양식입니다. 실제 운영 전 법적 검토 후 확정하세요.</p>
  <h2>제1조 (목적)</h2><p>본 약관은 바이크퀵이 제공하는 기사 모집·채용 정보 서비스의 이용 조건을 규정합니다.</p>
  <h2>제2조 (서비스 내용)</h2><p>퀵서비스 기사 모집 정보 제공, 가입 상담, 교육 안내 등을 제공합니다.</p>
  <h2>제3조 (이용자의 의무)</h2><p>이용자는 정확한 정보를 제공해야 하며, 관련 법령과 안전 수칙을 준수해야 합니다.</p>
  <h2>제4조 (면책)</h2><p>본 사이트의 수익 예시는 참고용이며 특정 금액을 보장하지 않습니다. 실제 수익·근무 조건은 개인 및 지역에 따라 달라질 수 있습니다.</p>
  <h2>제5조 (문의)</h2><p>약관 관련 문의: ${esc(site.contact.email)}</p>
</div></section>
`;
  return page("/terms/", "이용약관", "바이크퀵 이용약관.", body, {
    breadcrumbs: bc([{ name: "이용약관", href: "/terms/" }]),
  });
}

// 검색 (WebSite SearchAction 대상). 정적 사이트이므로 안내 페이지로 구성.
function search() {
  const body = `
<section class="page-head"><div class="wrap"><h1>검색</h1>
  <p class="lead">찾으시는 지역이나 정보를 아래에서 선택하거나, 메뉴에서 탐색하세요.</p></div></section>
<section class="section"><div class="wrap">
  <div class="search-links">
    <a class="btn btn-outline" href="/regions/">지역별 모집</a>
    <a class="btn btn-outline" href="/jobs/">기사모집</a>
    <a class="btn btn-outline" href="/faq/">FAQ</a>
    <a class="btn btn-outline" href="/blog/">블로그</a>
  </div>
</div></section>
`;
  return page("/search/", "검색", "바이크퀵 사이트 검색.", body);
}

function band(title, sub) {
  return `
<section class="cta-band"><div class="wrap">
  <h2>${esc(title)}</h2><p>${esc(sub)}</p>
  ${ctaButtons("cta-band-btns")}
</div></section>`;
}

export function contentPages() {
  return [
    workGuide(),
    income(),
    join(),
    education(),
    faqPage(),
    about(),
    contact(),
    privacy(),
    terms(),
    search(),
  ];
}
