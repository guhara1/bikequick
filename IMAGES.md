# 이미지 작업 지시서 (인터넷 열린 환경에서 실행)

> 이 문서는 **네트워크가 열린 환경**에서 사이트 이미지를 무료 이미지 사이트의
> 실사진으로 다양하게 교체하기 위한 작업 지시서입니다.
> (직전 환경은 조직 egress 정책으로 Pixabay/Unsplash/Pexels 접속이 차단되어
> 사용자가 업로드한 배너 1장만 크롭해 사용 → 모든 이미지가 비슷해 보였음.)

## 목표
주제별로 **서로 다른 실사진**을 넣어 반복을 없앤다. 모두 **WebP, 30KB 이하**.
배치 원칙: H1 위 대표 이미지 1장 + 본문 2~3장(이미 템플릿에 반영됨).

## 소스 (무료·상업적 사용 가능, 저작권 안전)
- https://pixabay.com/ko/ · https://unsplash.com/ko · https://www.pexels.com/ko-kr/
- 각 사이트 라이선스(무료·상업적 사용 허용) 범위 내에서만 사용.

## 실행 방법 (택1)
### 방법 1) raw-photos/ 에 받아서 변환 (권장, 이미 도구 있음)
1. 아래 슬롯별 추천 검색어로 사진을 받아 `raw-photos/{슬롯명}.jpg` 로 저장
2. `python3 scripts/import-photos.py`  → `assets/img/photos/*.webp` 로 30KB 변환
3. `node build.js` → `dist/` 갱신 → 커밋·푸시

### 방법 2) URL 목록으로 자동 다운로드
`photo-sources.json` 에 `{ "슬롯명": "이미지URL", ... }` 를 채우고
`python3 scripts/fetch-photos.py` 실행 (다운로드+변환 자동).

## 슬롯 목록 · 추천 검색어 (서로 다른 사진으로!)
| 슬롯(파일명) | 사용 위치 | 추천 검색어(다르게) |
| --- | --- | --- |
| `hero-main-upload` | 메인 상단 배너 | (현재 사용자 배너 유지 가능) |
| `hero-jobs` | 기사모집 대표 | delivery rider helmet |
| `hero-blog` | 블로그 대표 | motorcycle road city |
| `region-urban` | 도심권(서울·대구) | seoul city street |
| `region-industrial` | 산업권(경기·인천) | logistics warehouse delivery |
| `region-suburban` | 근교 | suburban road scooter |
| `region-coastal` | 해안권(부산·제주) | busan coast city |
| `theme-rider` | 라이더 본문 | motorcycle courier rider |
| `theme-city` | 도시 본문 | city skyline korea |
| `theme-delivery` | 배송 본문 | parcel delivery box |
| `theme-route` | 경로/근무 | motorcycle road route |
| `theme-income` | 수익 본문 | smartphone app money hand |
| `theme-safety` | 안전/교육 | motorcycle helmet gear |
| `theme-map` | 지도/플랫폼 | navigation map phone |
| `theme-night` | 야간 본문 | night city motorcycle lights |

## 이미지→위치 매핑 코드
`src/data/images.js` 에서 슬롯→페이지 매핑을 관리한다(파일명만 맞추면 자동 반영).
alt(대체 텍스트)는 페이지별로 자동 생성되므로 파일만 교체하면 된다.

## 완료 후
`node build.js && git add -A && git add -f dist && git commit && git push`
(dist 는 .gitignore 되어 있으므로 `-f` 로 강제 추가 — Cloudflare 배포용)
