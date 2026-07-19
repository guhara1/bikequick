// 지역 페이지 고품질 콘텐츠 섹션 (시·도 / 시·군·구 / 역세권 공용)
// 지역 고유 정보(모집 이유·운행지역·팁)는 데이터에서, 표준 섹션(업무·근무·수익·
// 수수료·조건·준비물·절차)은 지역명으로 맞춤화. 허위/보장 표현 금지, 예시는 명시.
import { site } from "../data/site.js";
import { esc, icon, ctaButtons } from "./components.js";

// 목차(점프 메뉴) — 지역 고유 섹션을 앞에, 공통 조건은 압축
const TOC = [
  ["summary", "모집 요약"],
  ["reason", "모집 이유"],
  ["areas", "운행지역"],
  ["beginner", "초보자 안내"],
  ["tips", "활동 팁"],
  ["conditions", "모집조건·수익·가입"],
  ["faq", "자주 묻는 질문"],
  ["apply", "지원하기"],
];
export function jumpMenu() {
  return `<nav class="toc" aria-label="페이지 목차">
    ${TOC.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}
  </nav>`;
}

// 1. 모집 요약
export function summaryBox(place) {
  return `<section class="rsec" id="summary">
    <h2>${esc(place)} 퀵기사 모집 요약</h2>
    <div class="summary-grid">
      <ul class="spec-list">
        <li><span>모집지역</span><strong>${esc(place)} 및 인접 지역</strong></li>
        <li><span>모집대상</span><strong>오토바이 퀵서비스 기사</strong></li>
        <li><span>근무형태</span><strong>전업 · 투잡 · 주말 · 시간제</strong></li>
        <li><span>경력조건</span><strong>초보자 및 경력자</strong></li>
        <li><span>배차방식</span><strong>모바일 앱 콜 선택</strong></li>
        <li><span>지원방법</span><strong>온라인 · 비대면 상담</strong></li>
      </ul>
      <div class="summary-cta">
        <p>정해진 조건만 안내드립니다. 무조건 고수익·즉시 배차 보장 같은 표현은 쓰지 않습니다.</p>
        ${ctaButtons()}
      </div>
    </div>
  </section>`;
}

// 2. 모집 이유 (지역 고유)
export function reasonSection(place, node, parent) {
  const order = node.orderProfile || (parent && parent.orderProfile) || "";
  const env = node.environment || (parent && parent.environment) || "";
  return `<section class="rsec" id="reason">
    <h2>${esc(place)}에서 퀵기사를 모집하는 이유</h2>
    <p>${esc(node.summary || "")}</p>
    ${order ? `<h3>오더 특성</h3><p>${esc(order)}</p>` : ""}
    ${env ? `<h3>운행 환경</h3><p>${esc(env)}</p>` : ""}
    <p class="muted-note">실제 운영 데이터가 쌓이면 시간대별 수요·자주 연결되는 도착지역 등 구체 정보를 계속 보강합니다. 추정치를 사실처럼 표기하지 않습니다.</p>
  </section>`;
}

// 3. 주요 운행지역 (지역 고유) — areas: [{name, href?, desc}]
export function areasSection(place, areas) {
  if (!areas || !areas.length) {
    return `<section class="rsec" id="areas">
      <h2>${esc(place)} 주요 운행지역</h2>
      <p>${esc(place)} 및 인접 지역에서 서류·소형물품·부품·샘플 등 다양한 배송 콜이 발생할 수 있습니다. 세부 운행지역 정보는 상담 시 안내합니다.</p>
    </section>`;
  }
  return `<section class="rsec" id="areas">
    <h2>${esc(place)} 주요 운행지역</h2>
    <div class="area-list">
      ${areas
        .map(
          (a) => `<div class="area-item">
        <h3>${a.href ? `<a href="${a.href}">${esc(a.name)}</a>` : esc(a.name)}</h3>
        <p>${esc(a.desc || `${a.name} 일대에서 업무성·생활 배송 수요가 발생할 수 있는 지역입니다.`)}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

// 4. 업무 내용
export function dutiesSection() {
  return `<section class="rsec" id="duties">
    <h2>퀵서비스 기사 업무 내용</h2>
    <ul class="two-col check-list">
      <li>${icon("check")} 서류·계약서 배송</li>
      <li>${icon("check")} 소형 박스·부품·샘플 배송</li>
      <li>${icon("check")} 쇼핑백·의류 배송</li>
      <li>${icon("check")} 기업 간 물품 전달</li>
      <li>${icon("check")} 긴급 당일 배송</li>
      <li>${icon("check")} 왕복·경유 배송</li>
    </ul>
    <p>기사는 앱에서 콜을 <strong>직접 선택</strong>합니다. 출발지 도착 → 물품 인수·확인 → 이동 → 도착지 전달 → 앱에서 배송 완료 처리 순으로 진행되며, 현금·신용 콜 정산과 기본 고객 응대 수칙은 가입 교육에서 안내합니다.</p>
  </section>`;
}

// 5. 근무 방식
export function workStyleSection(place) {
  return `<section class="rsec" id="work">
    <h2>${esc(place)} 퀵기사 근무 방식</h2>
    <div class="card-grid work-grid">
      <div class="card"><h3>전업 기사</h3><p>평일 주간을 중심으로 지속적으로 콜을 수행하는 방식입니다.</p></div>
      <div class="card"><h3>투잡 기사</h3><p>출퇴근 전후나 원하는 시간에 선택적으로 활동하는 방식입니다.</p></div>
      <div class="card"><h3>주말·야간 기사</h3><p>주말이나 저녁 시간대에 가능한 콜을 선택해 활동합니다.</p></div>
      <div class="card"><h3>지역 집중형</h3><p>특정 지역과 인접 지역을 중심으로 활동하는 방식입니다.</p></div>
    </div>
    <p>회사가 근무시간을 강제로 정하지 않는 자유출근 형태이며, 출근비·최소 활동 조건 등 실제 기준이 있으면 가입 전에 투명하게 공개합니다.</p>
  </section>`;
}

// 6. 수익 구조
export function incomeSection(place) {
  return `<section class="rsec" id="income">
    <h2>${esc(place)} 퀵기사 수익은 어떻게 계산되나요?</h2>
    <p class="formula">기사 수입 = 수행한 배송 운임 − 기사 부담 수수료 − 보험료 − 출근비 등</p>
    <div class="table-wrap"><table class="income-table">
      <thead><tr><th>하루 운임(예시)</th><th>수수료 20% 예시</th><th>차감 후(예시)</th></tr></thead>
      <tbody>
        <tr><td>80,000원</td><td>16,000원</td><td>64,000원</td></tr>
        <tr><td>100,000원</td><td>20,000원</td><td>80,000원</td></tr>
        <tr><td>150,000원</td><td>30,000원</td><td>120,000원</td></tr>
      </tbody>
    </table></div>
    <p class="disclaimer">※ 위 표는 <strong>계산 예시</strong>이며 보장 수익이 아닙니다. 출근비·고용보험·적재물보험·유류비·통신비 등은 별도이며, 실제 수입은 근무시간·콜 선택·이동거리·날씨·교통상황·경력·활동일수에 따라 달라집니다. 수수료율은 실제 계약 기준으로 안내합니다.</p>
  </section>`;
}

// 7. 수수료·비용
export function feesSection() {
  return `<section class="rsec" id="fees">
    <h2>기사 수수료와 비용 안내</h2>
    <ul class="two-col check-list">
      <li>${icon("check")} 기사 수수료: 실제 계약 기준 공개</li>
      <li>${icon("check")} 예치금: 0원</li>
      <li>${icon("check")} 가입비: 실제 적용 여부 공개</li>
      <li>${icon("check")} 1일 출근비: 활동일 기준으로 안내</li>
      <li>${icon("check")} 고용보험: 기사 부담 비율 공개</li>
      <li>${icon("check")} 적재물보험: 차종별 적용 금액 공개</li>
      <li>${icon("check")} 프로그램 이용료 · 정산 수수료: 실제 기준 공개</li>
    </ul>
    <p class="muted-note">모든 비용 항목은 가입 상담에서 실제 금액·비율을 투명하게 안내합니다. 숨은 비용은 없습니다.</p>
  </section>`;
}

// 8. 지원 조건
export function eligibilitySection() {
  return `<section class="rsec" id="eligibility">
    <h2>지원 자격</h2>
    <ul class="two-col check-list">
      <li>${icon("check")} 만 18세 이상</li>
      <li>${icon("check")} 본인 명의 휴대전화</li>
      <li>${icon("check")} 운전면허 보유(배기량에 맞는 면허)</li>
      <li>${icon("check")} 오토바이 운행 가능</li>
      <li>${icon("check")} 안전 운행이 가능한 분</li>
      <li>${icon("check")} 고객 연락·앱 사용이 가능한 분</li>
    </ul>
    <p>오토바이 소유 필수 여부, 렌탈·리스 지원 가능 여부, 보험 가입 조건, 경력 필수 여부 등은 회사 운영 조건에 따라 상담 시 안내합니다.</p>
  </section>`;
}

// 9. 준비물
export function documentsSection() {
  return `<section class="rsec" id="documents">
    <h2>가입 준비물</h2>
    <ul class="two-col check-list">
      <li>${icon("check")} 신분증</li>
      <li>${icon("check")} 운전면허증</li>
      <li>${icon("check")} 본인 명의 휴대전화</li>
      <li>${icon("check")} 본인 명의 계좌</li>
      <li>${icon("check")} 오토바이 관련 서류</li>
      <li>${icon("check")} 보험 관련 서류</li>
    </ul>
    <p class="muted-note">실제 필요한 서류만 요청하며, 주민등록번호 등 민감정보는 일반 문의폼에서 직접 수집하지 않습니다.</p>
  </section>`;
}

// 10. 가입 절차
export function joinStepsSection() {
  const steps = [
    ["온라인 지원", "이름·연락처·희망 지역 등 간단히 접수합니다."],
    ["담당자 상담", "근무 조건·지역·비용을 안내합니다."],
    ["지원 조건 확인", "면허·차량·보험 등 조건을 확인합니다."],
    ["서류 제출", "준비물을 비대면으로 제출합니다."],
    ["프로그램 등록 · 앱 설치", "배차 앱 설치와 사용 교육을 진행합니다."],
    ["운행 시작", "원하는 시간·지역에서 콜을 선택해 시작합니다."],
  ];
  return `<section class="rsec" id="join">
    <h2>비대면 가입 절차</h2>
    <ol class="steps steps-vertical">
      ${steps.map(([t, d], i) => `<li><span class="step-n">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}
    </ol>
  </section>`;
}

// 11. 초보자 안내 (지역 맞춤)
export function beginnerSection(place, node, parent) {
  const env = node.environment || (parent && parent.environment) || "";
  return `<section class="rsec" id="beginner">
    <h2>초보 기사 운행 안내</h2>
    <ul class="check-list">
      <li>${icon("check")} 처음에는 가까운 거리의 콜부터 선택해 지리와 앱에 익숙해지세요.</li>
      <li>${icon("check")} 물품 크기와 오토바이 적재 가능 여부를 먼저 확인하세요.</li>
      <li>${icon("check")} 혼잡 시간대 도로 상황을 미리 파악해 이동시간을 넉넉히 계산하세요.</li>
      <li>${icon("check")} 대형 빌딩은 주차·출입 절차를 사전에 확인하세요.</li>
      <li>${icon("check")} 픽업 전 출발지 담당자와 통화하고, 배송 완료 전 수령인을 확인하세요.</li>
    </ul>
    ${env ? `<p>${esc(place)}의 운행 환경 특성상 ${esc(env.split(".")[0])}. 이런 부분을 미리 알고 시작하면 초보도 안전하게 적응할 수 있습니다.</p>` : ""}
  </section>`;
}

// 12. 활동 팁 (지역 고유)
export function tipsSection(place, node, parent) {
  const tip = node.tips || (parent && parent.tips) || "";
  if (!tip) return "";
  return `<section class="rsec" id="tips">
    <h2>${esc(place)} 기사에게 유리한 활동 팁</h2>
    <p>${esc(tip)}</p>
    <p class="muted-note">운영 경험이 쌓이면 지역별 활동 팁을 계속 업데이트합니다.</p>
  </section>`;
}

// 통합: 모집 조건·수익·비용·가입 (공통 내용은 압축 + 정식 안내 페이지로 링크)
export function conditionsSection(place) {
  return `<section class="rsec" id="conditions">
    <h2>${esc(place)} 퀵기사 모집 조건 · 수익 · 가입</h2>
    <p>${esc(place)}도 전국 공통 조건으로 모집합니다. <strong>출퇴근 자유 · 예치금 0원 · 비대면 가입</strong>이며, 서류·소형물품·부품·샘플 등 콜을 모바일 앱에서 직접 선택해 운행합니다. 만 18세 이상, 오토바이 운행이 가능하면 초보자도 지원할 수 있습니다. 수수료·고용보험·적재물보험·출근비 등 비용은 상담 시 실제 기준으로 투명하게 안내합니다.</p>
    <div class="table-wrap"><table class="income-table">
      <thead><tr><th>하루 운임(예시)</th><th>수수료 20% 예시</th><th>차감 후(예시)</th></tr></thead>
      <tbody>
        <tr><td>80,000원</td><td>16,000원</td><td>64,000원</td></tr>
        <tr><td>120,000원</td><td>24,000원</td><td>96,000원</td></tr>
      </tbody>
    </table></div>
    <p class="disclaimer">※ 위 표는 계산 예시이며 보장 수익이 아닙니다. 실제 수입은 근무시간·콜 선택·이동거리·교통상황·경력에 따라 달라집니다.</p>
    <div class="cond-links">
      <a class="tag-link" href="/work-guide/">근무 방식·조건 자세히</a>
      <a class="tag-link" href="/income/">수익 구조·시간대별 안내</a>
      <a class="tag-link" href="/join/">준비물·비대면 가입 절차</a>
      <a class="tag-link" href="/education/">초보 기사 교육</a>
      <a class="tag-link" href="/faq/">자주 묻는 질문</a>
    </div>
  </section>`;
}

// 13. FAQ (+ FAQPage 스키마 반환)
export function regionFaq(place) {
  const items = [
    [`${place}에 거주해야 지원할 수 있나요?`, `반드시 ${place}에 거주할 필요는 없습니다. ${place} 또는 인접 지역에서 이동·운행이 가능하면 지원할 수 있으며, 실제 활동 가능 지역은 상담 시 확인합니다.`],
    ["초보자도 퀵서비스 일을 할 수 있나요?", "초보자도 지원할 수 있습니다. 앱 사용법·물품 확인·고객 연락·안전 운행·배송 완료 절차에 대한 기본 교육을 받은 뒤 시작합니다."],
    ["출근시간이 정해져 있나요?", "자유출근 형태라면 원하는 시간에 활동할 수 있습니다. 출근비와 최소 활동 조건이 있다면 가입 전에 투명하게 안내합니다."],
    ["하루 수입은 얼마나 되나요?", "수입은 활동시간·수행 건수·이동거리·교통상황·콜 선택에 따라 달라집니다. 특정 금액을 보장하지 않으며, 수수료·비용을 차감한 금액이 실제 기사 수입입니다."],
    ["오토바이가 없어도 지원할 수 있나요?", "오토바이 소유가 필요한지, 렌탈·리스 지원이 가능한지는 실제 회사 운영 조건에 따라 상담 시 안내합니다."],
  ];
  const html = `<section class="rsec" id="faq">
    <h2>${esc(place)} 퀵기사 자주 묻는 질문</h2>
    <div class="faq-list faq-full">
      ${items.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><div class="faq-a">${esc(a)}</div></details>`).join("")}
    </div>
  </section>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return { html, schema };
}

// 14. 지원하기 CTA
export function applySection(place) {
  return `<section class="rsec rsec-apply" id="apply">
    <h2>${esc(place)} 퀵기사 지원하기</h2>
    <p>아래 연락처로 지원·문의하시면 담당자가 근무 조건과 활동 지역을 안내해 드립니다. 상담 시간: ${esc(site.contact.hours)}</p>
    ${ctaButtons("apply-cta")}
  </section>`;
}

// 15. 관련 내부링크 — links: [{name, href}]
export function relatedLinks(links) {
  if (!links || !links.length) return "";
  return `<section class="rsec related-links">
    <h2>관련 안내</h2>
    <div class="tag-grid">
      ${links.map((l) => `<a class="tag-link" href="${l.href}">${esc(l.name)}</a>`).join("")}
    </div>
  </section>`;
}
