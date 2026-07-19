// 전국 지역 데이터 (시·도 → 시·군·구 → 역세권/행정구)
//
// ⚠️ 도어웨이 페이지 방지 원칙:
//   키워드만 바꾼 대량 페이지는 금지. 각 지역은 해당 지역의
//   오더 특성 / 운행 환경 / 교육·안전 안내 등 "고유 정보"를 담습니다.
//
// 아래 배열은 시·도 메타데이터 + 일부 상세(강남 역세권 등) '큐레이션 오버레이'.
// 전국 전체 행정구역(자치구/시·군/행정구)은 districts.js 에서 병합됩니다.
import { districts as fullDistricts } from "./districts.js";
import { districtContent } from "./districtContent.js";
import { seoulDong } from "./seoulDong.js";

export const regions = [
  {
    slug: "seoul",
    name: "서울",
    fullName: "서울특별시",
    summary:
      "서울은 전국에서 오더 밀도가 가장 높은 지역입니다. 업무지구가 촘촘해 단거리 서류·물품 오더가 많고, 시간대별로 수요 패턴이 뚜렷합니다.",
    orderProfile:
      "강남·여의도·종로 등 오피스 밀집 지역은 평일 낮 서류·샘플 퀵 오더가 집중됩니다. 홍대·성수 등은 저녁·주말 소상공인/이커머스 오더 비중이 높습니다.",
    environment:
      "도로가 복잡하고 신호·정체 구간이 많아 골목 지리와 주차 동선을 익히는 것이 수익에 직결됩니다. 지하 주차장·대형 빌딩 진입 경로를 미리 파악해 두면 유리합니다.",
    tips: "출근 러시(08~10시)와 점심 전후(11~14시) 오더가 몰립니다. 강남·여의도권을 베이스로 잡으면 대기 시간을 줄일 수 있습니다.",
    districts: [
      {
        slug: "gangnam",
        name: "강남구",
        summary:
          "강남구는 서울에서도 오더량이 가장 많은 핵심 상권입니다. 테헤란로 오피스 벨트를 따라 서류·샘플 단거리 오더가 하루 종일 발생합니다.",
        orderProfile:
          "역삼·삼성동 오피스에서 발생하는 B2B 서류/물품 퀵이 주력입니다. 점심·퇴근 시간대 콜 집중도가 높아 초보도 물량 확보가 수월합니다.",
        environment:
          "테헤란로는 좌회전·유턴 제한 구간이 많아 우회 동선 숙지가 필요합니다. 대형 빌딩은 지정 하차 구역과 방문객 출입 절차를 확인하세요.",
        stations: [
          { slug: "gangnam-station", name: "강남역", summary: "유동인구 최대 상권. 강남대로 양방향 오더가 많고 대기 없이 콜 확보가 쉽습니다." },
          { slug: "yeoksam-station", name: "역삼역", summary: "오피스 밀집. 평일 낮 B2B 서류 퀵이 꾸준합니다." },
          { slug: "seolleung-station", name: "선릉역", summary: "테헤란로 중심. 샘플·물품 오더 비중이 높습니다." },
          { slug: "samseong-station", name: "삼성역", summary: "코엑스·업무지구. 전시·행사 시즌 물량이 증가합니다." },
          { slug: "nonhyeon-station", name: "논현역", summary: "가구·인테리어 상권 인접. 소형 물품 오더가 많습니다." },
          { slug: "sinnonhyeon-station", name: "신논현역", summary: "강남대로 북단. 강남역·논현 연계 동선이 좋습니다." },
        ],
      },
      {
        slug: "songpa",
        name: "송파구",
        summary:
          "송파구는 잠실 상권과 대규모 아파트·오피스가 공존해 주간 상업 오더와 저녁 생활 오더가 고르게 발생합니다.",
        orderProfile:
          "잠실 오피스·롯데월드타워 인근 B2B 오더와 문정동 지식산업센터 물류 오더가 함께 나옵니다.",
        environment:
          "올림픽로·송파대로는 신호 대기가 길어 시간 관리가 중요합니다. 대단지 아파트는 동·호수 진입 동선을 미리 확인하세요.",
        stations: [
          { slug: "jamsil-station", name: "잠실역", summary: "롯데월드타워·백화점 상권. 물품·서류 오더가 다양합니다." },
          { slug: "munjeong-station", name: "문정역", summary: "지식산업센터 밀집. 평일 물류·서류 오더가 안정적입니다." },
        ],
      },
      {
        slug: "seocho",
        name: "서초구",
        summary:
          "서초구는 법원·검찰 등 관공서와 대형 로펌이 밀집해 정확성이 요구되는 서류 퀵 비중이 높습니다.",
        orderProfile: "법조타운 서류 송달성 오더와 서초·양재 오피스 B2B 오더가 주력입니다.",
        environment: "관공서 주변은 출입 통제와 주정차 단속이 잦으니 하차 지점을 사전에 확인하세요.",
        stations: [
          { slug: "seocho-station", name: "서초역", summary: "법조타운 중심. 서류 정시 배송 수요가 큽니다." },
          { slug: "yangjae-station", name: "양재역", summary: "오피스·화훼단지 인접. 물품·서류 오더가 혼재합니다." },
        ],
      },
      { slug: "gwanak", name: "관악구", summary: "대학가·주거지 중심으로 생활 물품·음식 연계 오더가 많고 저녁 시간대 수요가 강한 지역입니다." },
      { slug: "yeongdeungpo", name: "영등포구", summary: "여의도 금융가와 영등포 상권이 결합해 평일 낮 서류 퀵과 상업 물품 오더가 활발합니다." },
      { slug: "gangseo", name: "강서구", summary: "마곡 업무지구 성장으로 B2B 오더가 늘고 있으며, 공항 인접 물류 수요도 있습니다." },
      { slug: "eunpyeong", name: "은평구", summary: "주거 밀집 지역으로 생활 오더 비중이 높고 출퇴근 시간대 수요가 뚜렷합니다." },
    ],
  },
  {
    slug: "gyeonggi",
    name: "경기도",
    fullName: "경기도",
    summary:
      "경기도는 면적이 넓고 산업단지·물류센터·신도시가 분포해 중장거리 오더와 물류 연계 오더가 많은 지역입니다.",
    orderProfile:
      "판교·수원 등 IT·산업 밀집지는 B2B 오더가, 화성·평택 산업단지는 부품·자재 오더가 강합니다. 신도시는 생활 물품 오더가 꾸준합니다.",
    environment:
      "지역 간 거리가 멀어 동선 설계가 수익을 좌우합니다. 고속화도로·외곽순환 경로를 활용하면 장거리 오더를 효율적으로 처리할 수 있습니다.",
    districts: [
      { slug: "suwon", name: "수원시", summary: "삼성·산업단지 인접으로 B2B 부품·서류 오더가 안정적이며 도심 상권 오더도 많습니다." },
      { slug: "seongnam", name: "성남시", summary: "판교테크노밸리 IT기업 밀집으로 평일 낮 서류·샘플 퀵 수요가 높습니다." },
      { slug: "yongin", name: "용인시", summary: "물류센터와 대규모 아파트가 혼재해 물류·생활 오더가 함께 발생합니다." },
      { slug: "goyang", name: "고양시", summary: "일산 신도시 상권 중심으로 생활·상업 오더가 꾸준합니다." },
      { slug: "bucheon", name: "부천시", summary: "인구 밀도가 높아 단거리 생활 오더가 촘촘하게 발생합니다." },
    ],
  },
  {
    slug: "incheon",
    name: "인천",
    fullName: "인천광역시",
    summary:
      "인천은 항만·공항·산업단지가 결합된 물류 중심 도시로, 물품·자재 오더 비중이 높은 편입니다.",
    orderProfile: "남동공단·송도 업무지구 오더와 항만·공항 연계 물류 오더가 특징입니다.",
    environment: "산업단지는 구획이 넓고 화물차 통행이 많아 안전 운행이 중요합니다. 공항·항만 진입은 통행 절차를 확인하세요.",
    districts: [
      { slug: "namdong", name: "남동구", summary: "남동국가산업단지 중심으로 부품·자재·서류 B2B 오더가 활발합니다." },
      { slug: "yeonsu", name: "연수구", summary: "송도국제도시 오피스 밀집으로 서류·샘플 퀵 수요가 늘고 있습니다." },
      { slug: "bupyeong", name: "부평구", summary: "상권·주거가 밀집해 단거리 생활·상업 오더가 많습니다." },
    ],
  },
  {
    slug: "busan",
    name: "부산",
    fullName: "부산광역시",
    summary:
      "부산은 항만 물류와 관광·상업이 공존하는 도시로, 원도심과 해운대·서면 상권의 오더 성격이 뚜렷하게 다릅니다.",
    orderProfile: "서면·센텀시티 상업 오더와 항만·물류 오더가 주력이며, 관광 성수기에는 물량이 증가합니다.",
    environment: "언덕·경사로가 많아 안전 운행 숙련도가 중요합니다. 해안·터널 구간 우회 동선을 익혀 두세요.",
    districts: [
      { slug: "busanjin", name: "부산진구", summary: "서면 최대 상권 중심으로 상업·생활 오더가 하루 종일 발생합니다." },
      { slug: "haeundae", name: "해운대구", summary: "센텀시티 업무·상업 지구로 서류·물품 오더와 관광 수요가 공존합니다." },
      { slug: "dongnae", name: "동래구", summary: "주거·상권 밀집으로 생활 오더가 안정적입니다." },
    ],
  },
  {
    slug: "daegu",
    name: "대구",
    fullName: "대구광역시",
    summary: "대구는 섬유·기계 산업과 대형 상권이 결합해 상업 물품 오더와 B2B 오더가 고르게 발생합니다.",
    orderProfile: "동성로 상권 생활·상업 오더와 산업단지 부품 오더가 주력입니다.",
    environment: "도심 정체 구간이 많아 지리 숙지가 중요하며 여름철 폭염 대비 운행 관리가 필요합니다.",
    districts: [
      { slug: "jung", name: "중구", summary: "동성로 상권 중심으로 단거리 상업·생활 오더가 촘촘합니다." },
      { slug: "dalseo", name: "달서구", summary: "성서산업단지 인접으로 부품·자재 B2B 오더가 활발합니다." },
    ],
  },
  {
    slug: "gwangju",
    name: "광주",
    fullName: "광주광역시",
    summary: "광주는 상무지구 업무 상권과 자동차·가전 산업이 결합해 서류·부품 오더가 함께 발생합니다.",
    orderProfile: "상무지구 오피스 서류 퀵과 산업단지 부품 오더가 주력입니다.",
    environment: "도심은 오더 밀도가 높고, 외곽 산업단지는 중거리 오더가 많습니다.",
    districts: [
      { slug: "seogu", name: "서구", summary: "상무지구 업무 중심으로 서류·샘플 퀵 수요가 높습니다." },
      { slug: "gwangsan", name: "광산구", summary: "하남산업단지 인접으로 부품·자재 오더가 활발합니다." },
    ],
  },
  {
    slug: "daejeon",
    name: "대전",
    fullName: "대전광역시",
    summary: "대전은 연구단지와 정부청사가 있어 서류·문서 오더 비중이 높고, 전국 물류 중심 입지로 중장거리 연계도 좋습니다.",
    orderProfile: "둔산 업무지구·정부청사 서류 퀵과 대덕연구단지 문서·샘플 오더가 특징입니다.",
    environment: "도로가 비교적 정비되어 있어 초보도 적응이 수월한 편입니다.",
    districts: [
      { slug: "seogu", name: "서구", summary: "둔산 업무·상업 중심으로 서류·물품 오더가 안정적입니다." },
      { slug: "yuseong", name: "유성구", summary: "대덕연구단지 인접으로 연구·문서 관련 오더가 많습니다." },
    ],
  },
  {
    slug: "ulsan",
    name: "울산",
    fullName: "울산광역시",
    summary: "울산은 중화학·자동차·조선 산업 중심 도시로, 산업단지 부품·자재 B2B 오더 비중이 매우 높습니다.",
    orderProfile: "현대차·석유화학 단지 관련 부품·서류 오더가 주력입니다.",
    environment: "산업단지 규모가 커 진입 절차와 안전 수칙 준수가 중요합니다.",
    districts: [
      { slug: "nam", name: "남구", summary: "석유화학단지·업무지구 인접으로 B2B 오더가 활발합니다." },
      { slug: "buk", name: "북구", summary: "자동차 산업단지 인접으로 부품 관련 오더가 많습니다." },
    ],
  },
  {
    slug: "sejong",
    name: "세종",
    fullName: "세종특별자치시",
    summary: "세종은 정부세종청사 중심 계획도시로, 관공서 서류·문서 오더 비중이 높은 특성을 가집니다.",
    orderProfile: "정부청사·공공기관 서류 퀵이 주력이며 평일 낮 수요가 집중됩니다.",
    environment: "도로가 넓고 정비되어 운행 환경이 쾌적하나, 지역이 넓어 동선 계획이 필요합니다.",
    districts: [
      { slug: "sejong-city", name: "세종시 전역", summary: "정부청사·공공기관 중심으로 서류·문서 오더가 평일에 집중됩니다." },
    ],
  },
  {
    slug: "gangwon",
    name: "강원",
    fullName: "강원특별자치도",
    summary: "강원은 관광·산간 지형 특성으로 시즌·날씨 영향이 크며, 춘천·원주 등 거점 도시 중심으로 오더가 형성됩니다.",
    orderProfile: "원주·춘천 도심 상업 오더가 주력이며 관광 성수기 물량 변동이 큽니다.",
    environment: "산간·기상 변화가 잦아 안전 운행과 방한·우천 대비가 특히 중요합니다.",
    districts: [
      { slug: "wonju", name: "원주시", summary: "혁신도시·기업도시 중심으로 서류·물품 오더가 형성됩니다." },
      { slug: "chuncheon", name: "춘천시", summary: "도심 상권 중심 생활·상업 오더가 주를 이룹니다." },
    ],
  },
  {
    slug: "chungbuk",
    name: "충북",
    fullName: "충청북도",
    summary: "충북은 청주 중심 산업·행정 기능과 오송·오창 첨단산업단지로 B2B 오더가 성장하는 지역입니다.",
    orderProfile: "오송 바이오·오창 반도체 단지 관련 물품·서류 오더가 특징입니다.",
    environment: "산업단지 간 거리가 있어 중거리 오더가 많고 동선 관리가 중요합니다.",
    districts: [
      { slug: "cheongju", name: "청주시", summary: "행정·산업 중심으로 서류·부품 오더가 고르게 발생합니다." },
    ],
  },
  {
    slug: "chungnam",
    name: "충남",
    fullName: "충청남도",
    summary: "충남은 천안·아산 산업벨트와 서산 석유화학단지로 제조·물류 오더가 강한 지역입니다.",
    orderProfile: "천안·아산 디스플레이·자동차 부품 오더와 서산 화학단지 오더가 주력입니다.",
    environment: "산업단지 밀집으로 B2B 오더가 안정적이며 화물 통행이 많아 안전 운행이 중요합니다.",
    districts: [
      { slug: "cheonan", name: "천안시", summary: "산업단지·대학가가 결합해 B2B·생활 오더가 함께 발생합니다." },
      { slug: "asan", name: "아산시", summary: "디스플레이·자동차 부품 관련 B2B 오더가 활발합니다." },
    ],
  },
  {
    slug: "jeonbuk",
    name: "전북",
    fullName: "전북특별자치도",
    summary: "전북은 전주 행정·상업 기능과 군산·완주 산업단지로 상업·제조 오더가 공존하는 지역입니다.",
    orderProfile: "전주 도심 상업 오더와 군산·완주 산업단지 부품 오더가 주력입니다.",
    environment: "도심과 산업단지 거리가 있어 오더 성격에 따라 베이스 선정이 중요합니다.",
    districts: [
      { slug: "jeonju", name: "전주시", summary: "도심 상권 중심으로 생활·상업 오더가 안정적입니다." },
      { slug: "gunsan", name: "군산시", summary: "산업단지·항만 인접으로 물품·자재 오더가 발생합니다." },
    ],
  },
  {
    slug: "jeonnam",
    name: "전남",
    fullName: "전라남도",
    summary: "전남은 여수·광양 석유화학·철강 산단과 목포 상권으로 산업·상업 오더가 지역별로 뚜렷하게 나뉩니다.",
    orderProfile: "여수·광양 산단 B2B 오더와 목포·순천 도심 상업 오더가 특징입니다.",
    environment: "지역이 넓게 분산되어 있어 거점 도시 중심 운행이 효율적입니다.",
    districts: [
      { slug: "suncheon", name: "순천시", summary: "도심 상권 중심으로 생활·상업 오더가 형성됩니다." },
      { slug: "gwangyang", name: "광양시", summary: "철강·산업단지 인접으로 부품·자재 오더가 발생합니다." },
    ],
  },
  {
    slug: "gyeongbuk",
    name: "경북",
    fullName: "경상북도",
    summary: "경북은 구미 전자산업단지와 포항 철강산업으로 대표되는 제조 중심 지역입니다.",
    orderProfile: "구미 전자·포항 철강 관련 부품·자재 B2B 오더가 주력입니다.",
    environment: "산업단지 규모가 커 진입 절차 확인과 안전 운행이 중요합니다.",
    districts: [
      { slug: "gumi", name: "구미시", summary: "전자산업단지 중심으로 부품·서류 B2B 오더가 활발합니다." },
      { slug: "pohang", name: "포항시", summary: "철강산업 인접으로 자재·물품 오더가 발생합니다." },
    ],
  },
  {
    slug: "gyeongnam",
    name: "경남",
    fullName: "경상남도",
    summary: "경남은 창원 기계산업·거제 조선업 등 제조업 기반이 강해 산업단지 오더가 풍부한 지역입니다.",
    orderProfile: "창원 기계·부품 오더와 김해·양산 물류 오더가 주력입니다.",
    environment: "산업단지가 넓게 분포해 오더 성격별 베이스 선정이 중요합니다.",
    districts: [
      { slug: "changwon", name: "창원시", summary: "기계산업단지 중심으로 부품·서류 B2B 오더가 활발합니다." },
      { slug: "gimhae", name: "김해시", summary: "물류·산업단지 인접으로 물품·자재 오더가 많습니다." },
    ],
  },
  {
    slug: "jeju",
    name: "제주",
    fullName: "제주특별자치도",
    summary: "제주는 관광·상업 중심 지역으로, 제주시 원도심과 신제주 상권에서 오더가 집중됩니다.",
    orderProfile: "제주시 상업·생활 오더가 주력이며 관광 성수기 물량 변동이 큽니다.",
    environment: "바람·날씨 변화가 잦아 기상 대비와 안전 운행이 특히 중요합니다.",
    districts: [
      { slug: "jeju-city", name: "제주시", summary: "신제주·원도심 상권 중심으로 상업·생활 오더가 형성됩니다." },
    ],
  },
];

// 전체 행정구역 병합: districts.js 의 완전한 목록으로 채우되,
// 위 배열의 큐레이션 상세(orderProfile/environment/stations)는 slug로 보존.
// 행정시의 하위 행정구(gu)는 stations(3차 레벨)로 매핑.
for (const r of regions) {
  const full = fullDistricts[r.slug] || [];
  const content = districtContent[r.slug] || {};
  const curated = Object.fromEntries((r.districts || []).map((d) => [d.slug, d]));
  if (!full.length) continue;
  r.districts = full.map((d) => {
    const cur = curated[d.slug] || {};
    const c = content[d.slug] || {};
    const stations = d.gu
      ? d.gu.map((g) => {
          const gc = content[g.slug] || {};
          return { slug: g.slug, name: g.name, summary: g.summary, orderProfile: gc.order, environment: gc.env };
        })
      : r.slug === "seoul" && seoulDong[d.slug]
      ? seoulDong[d.slug].map((dn) => ({
          slug: dn.slug,
          name: dn.name,
          summary: dn.order,
          orderProfile: dn.order,
          environment: dn.env,
        }))
      : cur.stations;
    return {
      slug: d.slug,
      name: d.name,
      summary: cur.summary || d.summary,
      orderProfile: cur.orderProfile || c.order,
      environment: cur.environment || c.env,
      tips: cur.tips,
      stations,
    };
  });
}

// 헬퍼: 지역 slug로 조회
export function findRegion(slug) {
  return regions.find((r) => r.slug === slug);
}
