# raw-photos — 무료 사이트에서 받은 원본 사진을 넣는 폴더

이 실행 환경(세션)은 조직 네트워크 정책상 Pixabay/Unsplash/Pexels/123rf 등
**외부 이미지 사이트 접속이 차단**되어 있어, 에이전트가 직접 사진을 내려받을 수 없습니다.
대신 **사장님 브라우저에서 받은 사진을 이 폴더에 올리면 자동으로 WebP(30KB 내외)로
변환·배치**됩니다. (사진 다운로드 시 각 사이트의 무료 라이선스도 정상 취득됩니다.)

## 사용 방법

1. 아래 무료 사이트에서 주제에 맞는 사진을 다운로드합니다.
   - https://pixabay.com/ko/  ·  https://unsplash.com/ko  ·  https://www.pexels.com/ko-kr/  ·  https://kr.123rf.com/무료이미지/
2. 파일 이름을 **아래 슬롯명**으로 바꿔 이 `raw-photos/` 폴더에 넣습니다. (jpg/png/webp 가능)
3. 변환 실행: `npm run photos:import`  →  `npm run build`
   (또는 이 폴더에 파일을 올려 커밋만 해두시면, 에이전트가 변환·배치해 드립니다.)

원하는 슬롯만 넣으면 됩니다. 넣지 않은 슬롯은 기존 이미지가 유지됩니다.

## 슬롯명 · 추천 검색어

| 파일명(권장) | 사용 위치 | 추천 검색어 |
| --- | --- | --- |
| `hero-main-upload.jpg` | 메인 상단 배너 | motorcycle delivery rider city |
| `hero-home.jpg` | 홈 히어로 보조 | 오토바이 배달, courier motorcycle |
| `hero-jobs.jpg` | 기사모집 대표 | delivery rider helmet |
| `hero-blog.jpg` | 블로그 대표 | motorcycle road |
| `region-urban.jpg` | 도심권 지역(서울·대구 등) | seoul city street |
| `region-industrial.jpg` | 산업권 지역(경기·인천 등) | logistics delivery box |
| `region-suburban.jpg` | 근교 지역 | suburban road scooter |
| `region-coastal.jpg` | 해안권(부산·제주 등) | busan coast city |
| `theme-rider.jpg` | 라이더 본문 | motorcycle rider korea |
| `theme-city.jpg` | 도시 본문 | city skyline korea |
| `theme-delivery.jpg` | 배송 본문 | parcel delivery motorcycle |
| `theme-route.jpg` | 경로/근무 본문 | motorcycle road route |
| `theme-income.jpg` | 수익 본문 | smartphone app money |
| `theme-safety.jpg` | 안전/교육 본문 | motorcycle helmet gear |
| `theme-map.jpg` | 지도/플랫폼 본문 | navigation map phone |
| `theme-night.jpg` | 야간 본문 | night city motorcycle |

> 변환 결과는 `assets/img/photos/*.webp` 에 저장되며, `alt`는 페이지별로 자동 생성됩니다.
