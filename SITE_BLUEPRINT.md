# 구구마사지 사이트 제작 설계서

이 문서는 `gugumassage.club` 사이트를 어떤 기준으로 만들었는지 정리한 재사용용 제작 노트입니다. 다음에 비슷한 출장마사지, 지역 SEO, 서비스 안내형 정적 사이트를 만들 때 메인 페이지 디자인, 지역 페이지 구조, 콘텐츠 원칙, 검색엔진 대응 방식을 다시 활용하기 위한 기준서입니다.

## 1. 사이트 제작 목표

구구마사지 사이트는 단순 홍보 페이지가 아니라, 사용자가 실제 예약 전에 확인해야 하는 정보를 먼저 보여주는 구조로 제작했습니다.

핵심 목표는 다음과 같습니다.

- 전국 출장마사지 서비스의 신뢰감 있는 브랜드 첫인상 만들기
- 서비스 안내, 출장 가능 지역, 이용 방법, 요금, FAQ, 예약 문의를 한 화면에서 빠르게 이해시키기
- 지역 페이지를 대량 복제처럼 보이지 않게 만들고, 지역별 생활권과 이용 조건을 다르게 구성하기
- Google과 Naver 검색엔진이 페이지 구조를 쉽게 발견하도록 sitemap, RSS, robots, canonical을 정리하기
- 의료 효과나 과장 표현 없이 건전한 웰니스/휴식 관리 범위로 안내하기

## 2. 전체 파일 구조

현재 사이트는 정적 HTML 사이트이며, 핵심 생성기는 `build-site.mjs`입니다.

```text
/
├─ build-site.mjs          # 전체 HTML, sitemap, RSS, robots 생성기
├─ index.html              # 메인 페이지
├─ styles.css              # 전체 UI 스타일
├─ script.js               # FAQ, 메뉴 등 인터랙션
├─ robots.txt              # 검색엔진 크롤러 안내
├─ sitemap.xml             # 기본 사이트맵
├─ sitemap1.xml            # 구글 제출용 보조 사이트맵
├─ rss.xml                 # RSS 피드
├─ assets/
│  ├─ favicon.svg
│  └─ og-image.svg
├─ services/               # 서비스 상세 페이지
├─ areas/                  # 실제 색인 대상 지역 페이지
└─ regions/                # 구 주소 redirect/noindex 보관
```

다음 사이트를 만들 때는 `build-site.mjs`의 데이터 배열과 콘텐츠 블록을 먼저 수정하고, 생성기를 실행해서 HTML을 다시 만드는 방식이 가장 안전합니다.

## 3. 메인 페이지 디자인 방향

메인 페이지는 첨부 참고 이미지처럼 어두운 프리미엄 마사지 브랜드 톤을 기반으로 만들었습니다. 다만 단순히 이미지를 따라 한 것이 아니라, 실제 예약 전환과 지역 탐색을 빠르게 하기 위한 구조로 재배치했습니다.

### UI 톤

- 어두운 배경
- 살구/골드 계열 포인트 컬러
- 얇은 라인과 넓은 여백
- 과한 이미지보다 텍스트 가독성과 버튼 접근성 우선
- `GUGU` 영문 로고를 첫 화면 브랜드 신호로 사용

### 메인 페이지 주요 섹션

```text
1. Hero
   - 브랜드명
   - 서비스 핵심 문장
   - 전화예약 / 지역 보기 CTA

2. Trust / 요약 정보
   - 운영 안내
   - 서비스 범위
   - 상담 기준

3. 서비스 안내
   - 스웨디시
   - 아로마테라피
   - 딥티슈
   - 타이마사지
   - 스포츠마사지
   - 림프마사지

4. 출장 가능 지역
   - 전국 시도 단위 지역 카드
   - 서울, 경기, 인천, 부산 등 지역 페이지 연결

5. 이용 방법
   - 예약 절차
   - 관리 전 준비사항
   - 결제 방법
   - 취소/환불 안내
   - 방문 유의사항

6. 요금 안내
   - 60분 / 90분 / 120분 기준
   - 추가 출장비와 심야/장거리 안내

7. FAQ
   - 예약, 결제, 장소, 위생, 관리사 배정, 취소 관련 질문

8. 예약 문의 CTA
   - 전화예약
   - 문자문의
```

### 재사용 포인트

다음 사이트에서도 첫 화면은 랜딩 페이지처럼 만들기보다 실제 사용자가 바로 예약하거나 지역을 찾을 수 있는 구조로 시작하는 것이 좋습니다.

```text
Hero CTA = 전화예약 + 지역 보기
하단 고정 CTA = 전화예약 + 문자문의
상단 메뉴 = 서비스 안내 | 출장 가능 지역 | 이용 방법 | 요금 안내 | FAQ | 예약 문의
```

## 4. 상단 메뉴 구조

현재 메뉴는 사용자가 이해하기 쉬운 표현으로 바꿨습니다.

```text
서비스 안내 | 출장 가능 지역 | 이용 방법 | 요금 안내 | FAQ | 예약 문의
```

드롭다운은 다음 기준으로 만들었습니다.

### 서비스 안내

```text
스웨디시
아로마테라피
딥티슈
타이마사지
스포츠마사지
림프마사지
```

### 출장 가능 지역

```text
서울
경기
인천
부산
대구
대전
광주
울산
세종
강원
충청
전라
경상
제주
```

다음 사이트에서 메뉴명을 바꿀 때도 너무 광고성 단어보다 사용자가 실제로 찾는 단어를 우선합니다.

## 5. 서비스 페이지 제작 방식

서비스 페이지는 `services` 배열과 상세 콘텐츠 데이터를 기반으로 생성됩니다.

대표 서비스:

```text
스웨디시
아로마테라피
딥티슈
타이마사지
스포츠마사지
림프마사지
```

각 서비스 상세 페이지는 아래 구조를 따릅니다.

```text
H1. 서비스명 출장마사지 서비스 안내

H2. 서비스란?
H2. 필요한 경우
H2. 특징
H2. 관리 진행 방식
H2. 추천 관리 시간
H2. 다른 마사지와의 차이
H2. 이용 전 준비사항
H2. 예약 전 확인사항
H2. 자주 묻는 질문
```

### 표현 원칙

사용 가능한 표현:

```text
휴식
릴랙스
긴장 완화
몸이 무겁게 느껴지는 경우
편안한 관리
컨디션에 맞춘 압 조절
웰니스 관리
```

피해야 할 표현:

```text
치료
완치
질병 개선
통증 치료
의학적 효과 보장
전문 의료 관리
```

마사지 사이트는 건강 관련 오해가 생기기 쉬우므로, 의료 행위처럼 보이는 문장은 사용하지 않았습니다.

## 6. 지역 페이지 제작 방식

지역 페이지는 크게 세 단계로 구성했습니다.

```text
1. 시도 단위 페이지
   예: /areas/seoul/, /areas/gyeonggi/, /areas/busan/

2. 서울 25개 구 페이지
   예: /areas/seoul/gangnam-gu/

3. 경기, 인천, 부산, 경상권 하위 행정구역 페이지
   예: /areas/gyeonggi/suwon/
   예: /areas/incheon/yeonsu-gu/
   예: /areas/busan/haeundae-gu/
   예: /areas/gyeongsang/changwon/
```

### 지역 페이지에서 가장 중요한 원칙

지역명만 바꾼 복사 페이지를 만들지 않습니다.

나쁜 예:

```text
서울 출장마사지 안내입니다.
부산 출장마사지 안내입니다.
대구 출장마사지 안내입니다.
```

위처럼 도시명만 바꾸고 나머지 문장이 같으면 도어웨이 페이지나 대량 생성 저품질 콘텐츠처럼 보일 수 있습니다.

좋은 예:

```text
서울 강남권은 퇴근 이후 오피스텔과 호텔 문의가 많아 공동현관, 주차, 프런트 규정 확인이 중요합니다.

부산 해운대권은 관광 숙소와 성수기 이동 지연이 변수라 객실 방문 가능 여부와 해안도로 정체를 함께 확인합니다.

인천 영종권은 공항 일정과 교량 이동 시간이 예약 가능 여부에 영향을 주므로 항공편 전후 여유 시간을 확인합니다.
```

이처럼 지역별 생활권, 이동 조건, 숙소 유형, 출장비 판단 기준, FAQ를 다르게 넣는 것이 핵심입니다.

## 7. 서울 지역 페이지 구조

서울은 별도로 25개 구 페이지를 만들었습니다.

서울 구 페이지는 다음 구조를 따릅니다.

```text
H1. 구명 출장마사지 서비스 안내

H2. 구명 출장마사지 이용 안내
H2. 주요 권역별 안내
H2. 예약 전 확인사항
H2. 이용 가능한 관리
H2. 이용 전 준비사항
H2. 자주 묻는 질문
H2. 예약 문의
```

서울 구 페이지에는 다음 요소를 각각 다르게 넣었습니다.

```text
주요 동/생활권
이용 고객 상황
업무권/주거권/숙소권 차이
방문 시 확인할 점
추천 관리
지역별 FAQ
작성/검수 기준
```

예:

```text
강남구 = 역삼, 삼성, 청담, 압구정 등 업무/오피스텔 중심
마포구 = 공덕, 홍대, 합정, 상암 등 숙소/상권/업무 혼합
강서구 = 마곡, 발산, 김포공항 등 공항/업무/주거 혼합
```

## 8. 경기, 인천, 부산, 경상권 하위 페이지 제작 방식

처음에는 하위 행정구역 페이지가 너무 유사하게 생성될 위험이 있었습니다. 그래서 색인 전에 유사도 검사를 했고, 유사도가 높은 페이지는 `noindex`로 막았다가 개별 고유 콘텐츠로 다시 재작성했습니다.

현재는 아래 기준으로 고유성을 확보했습니다.

```text
지역별 주요 행정동
생활권별 이용 상황
건물 유형
이동 변수
시간대 변수
출장비 판단 기준
추천 서비스
지역별 FAQ
작성/검수 기준
```

예:

```text
수원시 = 장안구, 권선구, 팔달구, 영통구 등 생활권 구분
해운대구 = 해운대, 센텀, 우동, 좌동 등 관광/숙소/업무권
연수구 = 송도, 연수, 동춘 등 국제도시/주거권 조건
창원시 = 성산, 의창, 마산, 진해 등 산업/주거권 조건
```

## 9. 지역 페이지 고유성 체크 방법

다음 사이트에서도 지역 페이지를 많이 만들 경우 아래 기준으로 점검합니다.

### 필수 점검

```text
title 중복 없음
description 중복 없음
canonical 중복 없음
본문 유사도 과다 없음
지역명만 바뀐 문단 없음
도시별 FAQ가 서로 다름
각 페이지에 작성/검수 기준 존재
sitemap에 색인 대상 페이지만 포함
noindex 페이지는 sitemap에 넣지 않음
```

### 위험 신호

```text
모든 페이지 첫 문단 구조가 동일함
FAQ 질문이 모든 지역에서 동일함
지역명만 바꾸면 문장이 그대로 말이 됨
서비스 설명 문단이 모든 지역에서 반복됨
출장비 기준이 모든 지역에서 같은 문장임
```

## 10. E-E-A-T와 신뢰 신호 적용 방식

사이트에는 아래 신뢰 신호를 넣었습니다.

```text
상호명: 구구마사지
대표 책임자: 고객센터 운영팀
고객센터: 0508-202-4743
건전한 휴식 관리 안내, 의료 행위 아님
작성·검수 기준 문장
예약 전 확인사항
이용 전 준비사항
FAQ
```

작성자 실명 대신 “고객센터 운영팀”을 책임 주체로 표시했습니다. 실제 담당자나 사업자 정보가 확정되면 다음 사이트에서는 더 구체적으로 넣는 것이 좋습니다.

## 11. 구조화 데이터 적용 방식

실제 주소가 없는 상태에서는 `LocalBusiness`를 쓰지 않았습니다.

이유:

```text
LocalBusiness는 실제 주소, 영업시간, 지점 정보가 있을 때 더 적합합니다.
허위 주소나 보이지 않는 지점 정보를 넣으면 구조화 데이터 스팸처럼 보일 수 있습니다.
```

현재는 아래처럼 사용했습니다.

```text
메인 페이지 = Organization
서비스/지역 페이지 = Service
provider = Organization
telephone = 0508-202-4743
areaServed = 해당 지역명
```

다음 사이트에서 실제 매장 주소가 있다면 `LocalBusiness`를 검토할 수 있습니다. 단, 페이지에 보이는 정보와 구조화 데이터가 일치해야 합니다.

## 12. 검색엔진 파일 구성

검색엔진 발견을 위해 아래 파일을 만들었습니다.

```text
/sitemap.xml
/sitemap1.xml
/rss.xml
/robots.txt
```

### sitemap.xml

기본 사이트맵입니다.

포함 정보:

```text
loc
lastmod
changefreq
priority
```

### sitemap1.xml

구글 서치콘솔 제출용 보조 사이트맵입니다.

내용은 `sitemap.xml`과 동일합니다. 구글에서 기존 sitemap 처리가 늦거나 오류가 있을 때 별도 제출용으로 사용합니다.

### rss.xml

전체 페이지 업데이트 피드입니다.

포함 정보:

```text
title
link
guid
description
pubDate
```

### robots.txt

현재 구성:

```text
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Yeti
Allow: /

User-agent: NaverBot
Allow: /

User-agent: Daumoa
Allow: /

Sitemap: https://gugumassage.club/sitemap.xml
Sitemap: https://gugumassage.club/sitemap1.xml
Sitemap: https://gugumassage.club/rss.xml
```

## 13. 사이트 인증 설정

메인 페이지에만 사이트 인증 메타 태그를 넣었습니다.

```html
<meta name="naver-site-verification" content="b02242d4dbddbd4ab9b652a0e9741b1ecdbf6d88">
<meta name="google-site-verification" content="Thez9awP1XI45EPoOGC5apckYcRsJMzHzTJ29w7yZV4">
```

하위 페이지에 반복 삽입하지 않았습니다. 인증은 메인 루트 페이지에서 확인되면 충분합니다.

## 14. 도메인과 canonical 기준

처음에는 Cloudflare Pages 기본 도메인인 `gugumassage.pages.dev`로 배포했습니다.

최종 도메인은 다음으로 변경했습니다.

```text
https://gugumassage.club
```

사이트 내 canonical, og:url, sitemap, RSS, robots는 모두 `gugumassage.club` 기준입니다.

다음 사이트에서도 커스텀 도메인을 연결한 뒤에는 반드시 아래 항목을 새 도메인 기준으로 바꿔야 합니다.

```text
canonical
og:url
og:image
sitemap loc
RSS link/guid
robots Sitemap
Organization url
Service url
```

## 15. 배포 방식

현재 배포 흐름:

```text
GitHub 저장소 main 브랜치
→ Cloudflare Pages 자동 배포
→ gugumassage.club 라이브 반영
```

작업 후 항상 아래 순서로 확인했습니다.

```text
1. build-site.mjs 수정
2. 정적 파일 재생성
3. 로컬 파일 확인
4. git commit
5. git push
6. Cloudflare Pages 자동 배포 확인
7. 라이브 URL 직접 확인
```

## 16. 다음 사이트 제작 순서

다음 프로젝트에서 재사용할 때는 아래 순서대로 진행합니다.

```text
1. 브랜드명, 전화번호, 도메인 변경
2. 서비스 목록 확정
3. 메인 페이지 섹션 문구 수정
4. 시도 단위 지역 목록 수정
5. 행정구역 데이터 작성
6. 지역별 고유 생활권/FAQ/출장비 기준 작성
7. 의료·과장 표현 제거
8. sitemap/RSS/robots 생성
9. Google/Naver 인증 태그 삽입
10. 유사도/중복 title/description/canonical 검사
11. GitHub push
12. Cloudflare Pages 배포
13. Search Console, Naver Search Advisor에 sitemap 제출
```

## 17. 다음 사이트에서 꼭 바꿔야 할 값

`build-site.mjs` 상단과 주요 데이터에서 아래 값을 바꿉니다.

```js
const siteUrl = "https://새도메인";
const phone = "새 전화번호";
const brand = "새 상호명";
```

그리고 아래 데이터도 바꿉니다.

```text
regions
services
regionDetails
seoulDistricts
adminAreaGroups
detailedServices
site verification meta tags
footer business text
OG image
favicon
```

## 18. SEO 안전 체크리스트

최종 배포 전 아래를 확인합니다.

```text
[ ] 모든 색인 대상 페이지에 고유 title 존재
[ ] 모든 색인 대상 페이지에 고유 description 존재
[ ] canonical이 새 도메인을 가리킴
[ ] sitemap에 noindex 페이지 없음
[ ] robots.txt가 sitemap을 가리킴
[ ] RSS가 UTF-8로 정상 출력됨
[ ] LocalBusiness를 허위로 사용하지 않음
[ ] 지역명만 바꾼 복붙 페이지 없음
[ ] 의료 효과 보장 표현 없음
[ ] 전화번호와 상호명이 전체 페이지에서 일관됨
[ ] 메인 페이지에 검색엔진 인증 태그 존재
[ ] Cloudflare Pages 라이브 URL에서 200 OK 확인
```

## 19. 라이브 확인 URL

현재 사이트 확인 URL입니다.

```text
https://gugumassage.club/
https://gugumassage.club/sitemap.xml
https://gugumassage.club/sitemap1.xml
https://gugumassage.club/rss.xml
https://gugumassage.club/robots.txt
```

## 20. 핵심 결론

이 사이트의 핵심은 “많은 지역 페이지를 만드는 것”이 아니라 “각 지역 페이지가 실제 이용자에게 다른 정보를 제공하도록 만드는 것”입니다.

다음 사이트에서도 아래 기준을 유지해야 합니다.

```text
디자인은 프리미엄하고 단순하게
메뉴는 사용자가 이해하는 말로
지역 페이지는 생활권과 예약 조건 중심으로
SEO는 검색엔진보다 사용자를 먼저 생각해서
구조화 데이터는 실제 정보만
색인 대상은 고유 콘텐츠만
```

