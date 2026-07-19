# 바이크퀵 — 전국 오토바이 퀵서비스 기사 모집 사이트

전국 단위 오토바이 퀵서비스 기사 모집을 위한 **채용 정보 플랫폼 + 기사 가이드** 형태의 정적 사이트입니다.
단순 랜딩페이지가 아니라, 구직자가 실제 궁금해하는 정보(근무·수익·교육·안전·FAQ)와
전국 지역별 모집 정보를 함께 제공해 검색엔진(SEO)과 사용자 신뢰(E-E-A-T) 모두에 유리하도록 설계했습니다.

## 기술 개요

- **외부 의존성 없는 Node.js 정적 사이트 생성기** (Node 18+ 권장, `type: module`)
- 데이터(`src/data/`)와 템플릿(`src/templates/`)을 분리해 지역·직무·블로그 콘텐츠를 손쉽게 확장
- 빌드 시 `dist/`에 순수 정적 HTML/CSS/JS 생성 → 어떤 정적 호스팅에도 업로드 가능

## 빌드 & 실행

```bash
npm run build      # dist/ 에 정적 사이트 생성 (102개+ 페이지)
npm run serve      # 빌드 후 http://localhost:8080 로컬 미리보기
```

빌드 결과물은 `dist/` 에 생성됩니다. (git에는 소스만 커밋, `dist/`는 `.gitignore` 처리)

## 배포

`dist/` 폴더 전체를 정적 호스팅에 업로드하면 됩니다.

- **Netlify / Vercel / Cloudflare Pages**: 빌드 명령 `npm run build`, 배포 디렉터리 `dist`
- **일반 웹호스팅 / S3**: `npm run build` 후 `dist/` 내용을 업로드
- **GitHub Pages**: Actions에서 빌드 후 `dist/` 배포

> ⚠️ 배포 전 `src/data/site.js`의 **도메인(`url`)과 연락처(전화·카카오·이메일·회사정보)** 를
> 실제 값으로 교체하세요. 현재는 예시 placeholder(`1600-0000`, `bikequick.kr` 등)입니다.

## 디렉터리 구조

```
build.js                 # 빌드 오케스트레이터 (sitemap/robots/404 생성)
scripts/serve.js         # 개발용 정적 서버
assets/                  # css, js, 이미지(svg) — 그대로 dist/assets 로 복사
src/
  data/                  # 콘텐츠 데이터 (여기만 수정해도 페이지가 늘어남)
    site.js              #   사이트 설정·연락처·혜택·추천 대상
    nav.js               #   메인 메뉴 / 드롭다운
    regions.js           #   전국 지역 트리 (시·도 → 구 → 역세권) + 지역별 고유 콘텐츠
    jobs.js              #   기사모집 직무 카테고리
    faq.js               #   FAQ (FAQPage 스키마)
    reviews.js           #   기사 후기 (⚠️ 실제 검증 후기로 교체)
    blog.js              #   블로그 글 (BlogPosting 스키마)
  templates/
    layout.js            #   공통 HTML 레이아웃 (SEO 메타 + JSON-LD)
    components.js        #   재사용 UI (아이콘, 버튼, 브레드크럼 등)
  pages/                 # 페이지 빌더 (home/jobs/regions/content/blog/community)
```

## URL 구조

| 콘텐츠 | 경로 |
| --- | --- |
| 홈 | `/` |
| 기사모집 | `/jobs/`, `/jobs/quick-service-rider/` … |
| 지역모집 | `/regions/`, `/regions/seoul/`, `/regions/seoul/gangnam/`, `/regions/seoul/gangnam/gangnam-station/` |
| 근무안내 / 수익 / 가입 / 교육 | `/work-guide/`, `/income/`, `/join/`, `/education/` |
| 커뮤니티 | `/community/`, `/community/reviews/`, `/community/qna/`, `/community/notice/` |
| 블로그 | `/blog/`, `/blog/{slug}/` |
| FAQ / 회사소개 / 문의 | `/faq/`, `/about/`, `/contact/` |
| 약관 | `/privacy/`, `/terms/` |

> 지역 페이지는 `시·도 → 시·군·구 → 주요 역세권` 3단 구조로, **각 페이지마다 해당 지역의
> 오더 특성·운행 환경·모집 직무 등 고유 콘텐츠**를 담아 도어웨이(dooway) 페이지를 피합니다.

## 구조화 데이터 (Schema.org)

전 페이지에 다음 JSON-LD가 자동 삽입됩니다.

- `Organization`, `WebSite`(SearchAction 포함) — 전역
- `WebPage`, `BreadcrumbList` — 각 페이지
- `FAQPage` — 홈/FAQ
- `JobPosting` — 기사모집 상세 (⚠️ 실제 채용 내용과 일치해야 하며 과장·허위 금지. 확정 보상이 없어 `baseSalary`는 생략)
- `BlogPosting` — 블로그 글

## 콘텐츠 운영 원칙 (정직성)

- **수익**: 모든 수익 표기는 "예시"이며 특정 금액을 보장하지 않는다는 안내를 함께 표시합니다.
- **후기**: `src/data/reviews.js`는 현재 레이아웃용 예시(`reviewsArePlaceholders = true`)입니다.
  실제 검증된 기사 후기로 교체하고, **가짜 후기는 절대 게시하지 않습니다.**
- **지역 페이지**: 키워드만 바꾼 대량 생성 금지. 지역별 고유 정보를 지속적으로 보강하세요.

## 이미지 (WebP) 안내 · 실제 사진 교체 가이드

모든 이미지는 `assets/img/photos/*.webp` 에 있으며, 전부 **30KB 이하**로 최적화돼 있습니다.
현재는 브랜드 톤의 자체 생성 이미지(오토바이/도시/지도 등 모티프)입니다.
빌드 환경의 네트워크 제약으로 무료 스톡 사진을 직접 내려받을 수 없어 대체 이미지를 넣었으니,
아래 표를 참고해 **같은 파일명**으로 실제 사진(WebP, 30KB 내외)을 덮어쓰면 그대로 반영됩니다.

무료 이미지 사이트: [Pixabay](https://pixabay.com/ko/) · [Unsplash](https://unsplash.com/ko) · [Pexels](https://www.pexels.com/ko-kr/) · [123RF 무료](https://kr.123rf.com/)
(WebP 변환은 [squoosh.app](https://squoosh.app) 등에서 무료로 가능)

| 파일명 | 사용 위치 | 추천 검색어 |
| --- | --- | --- |
| `hero-home.webp` | 홈 히어로 | 오토바이 배달, motorcycle courier city |
| `hero-jobs.webp` | 기사모집 대표 | delivery rider helmet, 라이더 |
| `hero-blog.webp` | 블로그 대표 | motorcycle road, 오토바이 도로 |
| `region-urban.webp` | 도심권 지역(서울·대구 등) | city street motorcycle |
| `region-industrial.webp` | 산업권 지역(경기·인천 등) | delivery box, 물류 |
| `region-suburban.webp` | 근교 지역 | suburban road scooter |
| `region-coastal.webp` | 해안권 지역(부산·제주 등) | coastal city rider |
| `theme-rider.webp` | 라이더 본문 | motorcycle rider, 라이더 |
| `theme-city.webp` | 도시 본문 | city skyline korea |
| `theme-delivery.webp` | 배송 본문 | delivery parcel motorcycle |
| `theme-route.webp` | 경로/근무 본문 | road route map |
| `theme-income.webp` | 수익 본문 | income chart money |
| `theme-safety.webp` | 안전/교육 본문 | motorcycle helmet safety |
| `theme-map.webp` | 지도/플랫폼 본문 | map navigation pin |
| `theme-night.webp` | 야간 본문 | night city motorcycle |

> `alt`(대체 텍스트)는 페이지별로 키워드를 포함해 자동 생성되므로 파일만 교체하면 됩니다.
> 이미지 배치 원칙: **H1 제목 위 대표 이미지 1장 + 본문 2~3장**, 모두 `loading` 지연 로딩과
> 크기 지정(CLS 방지)을 적용했고, 이미지 사이트맵(`sitemap.xml`)에도 자동 포함됩니다.
> 대체 이미지를 다시 생성하려면 `npm run images` (Python + Pillow 필요).

## 콘텐츠 추가 방법

- **지역/역세권 추가**: `src/data/regions.js`에 항목 추가 → 자동으로 페이지·사이트맵·네비 반영
- **직무 추가**: `src/data/jobs.js`에 항목 추가
- **블로그 글 추가**: `src/data/blog.js`의 `posts` 배열에 추가
- 수정 후 `npm run build` 실행
