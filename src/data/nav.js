// 메인 메뉴 및 드롭다운 구조
export const nav = [
  {
    label: "HOME",
    href: "/",
    children: [
      { label: "오늘의 모집지역", href: "/#today" },
      { label: "실시간 모집현황", href: "/#status" },
      { label: "공지사항", href: "/community/notice/" },
    ],
  },
  {
    label: "기사모집",
    href: "/jobs/",
    children: [
      { label: "퀵서비스 기사 모집", href: "/jobs/quick-service-rider/" },
      { label: "오토바이 기사 모집", href: "/jobs/motorcycle-rider/" },
      { label: "부업 라이더 모집", href: "/jobs/part-time-rider/" },
      { label: "투잡 라이더 모집", href: "/jobs/two-job-rider/" },
      { label: "주말 기사 모집", href: "/jobs/weekend-rider/" },
      { label: "초보 기사 모집", href: "/jobs/beginner-rider/" },
      { label: "경력 기사 모집", href: "/jobs/experienced-rider/" },
      { label: "여성 라이더 모집", href: "/jobs/woman-rider/" },
    ],
  },
  {
    label: "근무안내",
    href: "/work-guide/",
    children: [
      { label: "근무방식", href: "/work-guide/#how" },
      { label: "출퇴근 자유", href: "/work-guide/#flexible" },
      { label: "24시간 근무 가능", href: "/work-guide/#hours" },
      { label: "비대면 가입", href: "/work-guide/#online" },
      { label: "예치금 0원", href: "/work-guide/#deposit" },
      { label: "보험 안내", href: "/work-guide/#insurance" },
      { label: "관리비 안내", href: "/work-guide/#fee" },
      { label: "자주 묻는 질문", href: "/faq/" },
    ],
  },
  {
    label: "수익안내",
    href: "/income/",
    children: [
      { label: "평균 수입", href: "/income/#average" },
      { label: "오전 수입", href: "/income/#morning" },
      { label: "오후 수입", href: "/income/#afternoon" },
      { label: "야간 수입", href: "/income/#night" },
      { label: "주말 수입", href: "/income/#weekend" },
      { label: "투잡 사례", href: "/income/#twojob" },
      { label: "고수익 노하우", href: "/income/#tips" },
    ],
  },
  {
    label: "가입방법",
    href: "/join/",
    children: [
      { label: "전화 가입", href: "/join/#phone" },
      { label: "카카오톡 가입", href: "/join/#kakao" },
      { label: "비대면 가입", href: "/join/#online" },
      { label: "준비서류", href: "/join/#documents" },
      { label: "가입 절차", href: "/join/#steps" },
      { label: "가입 후 교육", href: "/join/#education" },
    ],
  },
  {
    label: "지역모집",
    href: "/regions/",
    children: [], // 동적으로 시·도 목록 채움
  },
  {
    label: "기사교육",
    href: "/education/",
    children: [
      { label: "초보 교육", href: "/education/#beginner" },
      { label: "오더 받는 방법", href: "/education/#orders" },
      { label: "배차 노하우", href: "/education/#dispatch" },
      { label: "수익 올리는 방법", href: "/education/#income" },
      { label: "앱 사용법", href: "/education/#app" },
      { label: "안전운전", href: "/education/#safety" },
    ],
  },
  {
    label: "커뮤니티",
    href: "/community/",
    children: [
      { label: "기사 후기", href: "/community/reviews/" },
      { label: "수익 인증", href: "/community/income-proof/" },
      { label: "질문답변", href: "/community/qna/" },
      { label: "공지사항", href: "/community/notice/" },
      { label: "라이더 이야기", href: "/blog/" },
    ],
  },
  {
    label: "회사소개",
    href: "/about/",
    children: [
      { label: "회사소개", href: "/about/" },
      { label: "인성데이타", href: "/about/#insungdata" },
      { label: "운영방식", href: "/about/#how" },
      { label: "개인정보처리방침", href: "/privacy/" },
      { label: "이용약관", href: "/terms/" },
      { label: "문의하기", href: "/contact/" },
    ],
  },
];
