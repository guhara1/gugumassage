import fs from "node:fs";
import path from "node:path";

const siteUrl = "https://gugumassage.pages.dev";
const phone = "010-3915-2498";
const brand = "구구마사지";

const regions = [
  ["seoul", "서울", "Seoul", "강남, 여의도, 광화문, 잠실처럼 이동과 업무가 빠른 생활권", "퇴근 후 호텔, 자택, 오피스텔에서 조용히 회복하고 싶은 고객"],
  ["gyeonggi", "경기", "Gyeonggi", "분당, 판교, 수원, 일산, 용인 등 넓게 이어진 주거와 업무 권역", "장거리 이동 뒤 몸의 긴장을 낮추고 다음 일정을 준비하려는 고객"],
  ["incheon", "인천", "Incheon", "송도, 청라, 부평, 공항권을 잇는 국제 업무와 주거 지역", "출장 전후 컨디션 조절과 숙소 내 휴식을 원하는 고객"],
  ["busan", "부산", "Busan", "해운대, 센텀, 서면, 남포를 중심으로 관광과 비즈니스가 만나는 도시", "여행 피로와 업무 일정을 함께 관리하고 싶은 고객"],
  ["daegu", "대구", "Daegu", "동성로, 수성구, 달서구처럼 생활 동선이 또렷한 내륙 중심 도시", "무더운 날씨와 긴 이동 뒤 차분한 순환 관리를 원하는 고객"],
  ["daejeon", "대전", "Daejeon", "정부청사, 둔산, 유성, 연구단지의 업무와 거주가 가까운 지역", "회의와 연구 일정 후 어깨, 등, 하체의 긴장을 풀고 싶은 고객"],
  ["gwangju", "광주", "Gwangju", "상무지구, 충장로, 첨단지구를 중심으로 활동 반경이 넓은 도시", "일상 피로와 이동 피로를 함께 덜고 싶은 고객"],
  ["ulsan", "울산", "Ulsan", "산업단지, 삼산, 태화강 일대의 근무와 생활이 이어지는 지역", "교대 근무나 장시간 서 있는 업무 뒤 깊은 이완이 필요한 고객"],
  ["sejong", "세종", "Sejong", "정부세종청사와 신도심 생활권이 균형 있게 이어진 행정 도시", "반복되는 사무 업무와 장거리 통근 뒤 조용한 관리를 찾는 고객"],
  ["chungbuk", "충북", "Chungbuk", "청주, 충주, 제천 등 도시 간 이동이 많은 중부 내륙권", "출장과 운전 시간이 길어 목, 허리, 다리 피로가 쌓인 고객"],
  ["chungnam", "충남", "Chungnam", "천안, 아산, 당진, 서산으로 이어지는 산업과 생활 권역", "업무 강도가 높은 하루 뒤 숙소에서 편안한 회복을 원하는 고객"],
  ["jeonbuk", "전북", "Jeonbuk", "전주, 군산, 익산을 중심으로 관광과 산업 일정이 교차하는 지역", "여행 일정과 업무 일정 사이에 몸을 가볍게 만들고 싶은 고객"],
  ["jeonnam", "전남", "Jeonnam", "목포, 여수, 순천, 광양처럼 해안과 산업 도시가 함께 있는 권역", "이동 거리가 긴 일정 후 근육 긴장과 피로감을 줄이고 싶은 고객"],
  ["gyeongbuk", "경북", "Gyeongbuk", "포항, 구미, 경주, 안동 등 지역별 성격이 뚜렷한 넓은 권역", "출장, 여행, 현장 업무 후 안정적인 방문 관리를 원하는 고객"],
  ["gyeongnam", "경남", "Gyeongnam", "창원, 김해, 진주, 거제 등 산업과 주거가 넓게 분포한 지역", "현장 업무와 운전 피로를 풀고 균형 있는 휴식을 원하는 고객"],
  ["jeju", "제주", "Jeju", "제주시, 서귀포, 중문, 공항권을 중심으로 여행과 체류가 이어지는 섬", "여행 중 쌓인 보행 피로와 숙소 휴식을 함께 챙기려는 고객"],
];

const services = [
  ["스웨디시", "부드러운 압과 긴 호흡으로 전신 긴장을 낮추는 릴랙스 관리"],
  ["아로마테라피", "피부 자극이 적은 오일을 사용해 향과 터치로 안정감을 더하는 관리"],
  ["딥티슈", "등, 어깨, 하체처럼 뭉침이 잦은 부위를 천천히 풀어 주는 집중 관리"],
  ["타이마사지", "스트레칭과 지압을 조합해 굳은 움직임을 부드럽게 만드는 관리"],
  ["스포츠마사지", "활동량이 많은 고객의 근육 피로와 회복 리듬을 돕는 관리"],
  ["림프마사지", "가벼운 압과 일정한 방향의 터치로 붓기와 무거움을 덜어 주는 관리"],
];

const nav = `<nav aria-label="주요 메뉴">
  <a href="/#services">서비스</a>
  <a href="/#areas">지역안내</a>
  <a href="/#pricing">가격안내</a>
  <a href="/#faq">자주묻는질문</a>
  <a href="/#contact">예약문의</a>
</nav>`;

function layout({ title, description, canonical, body, schema }) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${siteUrl}/assets/og-image.svg">
  <meta property="og:url" content="${canonical}">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="${brand} 홈">
      <span>GUGU</span>
      <small>Premium Massage</small>
    </a>
    ${nav}
    <a class="header-phone" href="tel:${phone.replaceAll("-", "")}">${phone}</a>
    <button class="menu-toggle" type="button" aria-label="메뉴 열기">☰</button>
  </header>
  ${body}
  <aside class="quick-actions" aria-label="빠른 문의">
    <a class="quick primary" href="tel:${phone.replaceAll("-", "")}">전화예약</a>
    <a class="quick secondary" href="sms:${phone.replaceAll("-", "")}">문자문의</a>
  </aside>
  <footer class="site-footer" id="contact">
    <div class="footer-grid">
      <div>
        <strong class="footer-logo">GUGU</strong>
        <p>${brand}는 전국 출장마사지 상담과 방문 관리를 안내하는 프리미엄 케어 브랜드입니다. 모든 안내는 과장보다 확인 가능한 정보, 예약 전 설명, 이용 후 피드백을 기준으로 정리합니다.</p>
      </div>
      <div><h2>서비스</h2>${services.slice(0, 4).map(([s]) => `<a href="/#services">${s}</a>`).join("")}</div>
      <div><h2>지역</h2>${regions.slice(0, 6).map(([slug, ko]) => `<a href="/regions/${slug}.html">${ko}</a>`).join("")}</div>
      <div><h2>고객센터</h2><a href="/#faq">자주묻는질문</a><a href="/#pricing">가격안내</a><a href="tel:${phone.replaceAll("-", "")}">${phone}</a></div>
    </div>
    <p class="business">상호명: ${brand} | 대표 책임자: 고객센터 운영팀 | 이메일: contact@gugumassage.example | 건전한 휴식 관리 안내, 의료 행위 아님.</p>
    <p class="copyright">© 2026 ${brand}</p>
  </footer>
  <script src="/script.js"></script>
</body>
</html>`;
}

function homeArticle() {
  return `<article class="long-copy">
    <h2>${brand}가 콘텐츠와 서비스를 만드는 방식</h2>
    <p>${brand} 메인페이지는 예약 전 고객이 확인해야 할 정보를 빠르게 이해하도록 구성했습니다. 상담 단계에서 희망 지역, 입실 가능 시간, 선호 관리, 주차와 출입 조건을 확인하고 가능한 일정과 총 금액을 먼저 안내합니다.</p>
    <p>콘텐츠는 고객센터 운영 기록, 반복 질문, 테라피스트 배정 기준, 지역별 이동 경험을 바탕으로 작성했습니다. 과장된 의학적 효과는 쓰지 않고 휴식과 컨디션 관리라는 일반 웰니스 목적을 중심으로 설명합니다. 지역 페이지도 권역별 생활 동선과 고객 상황을 다르게 반영했습니다.</p>
  </article>`;
}

function home() {
  const body = `<main>
    <section class="hero">
      <div class="hero-inner">
        <p class="eyebrow">Korea's Premium Wellness Care</p>
        <h1>${brand}</h1>
        <p class="subtitle">전국 어디서나 조용하고 정돈된 출장마사지 상담과 방문 관리를 안내합니다.</p>
        <div class="hero-actions"><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="#areas">지역 보기</a></div>
      </div>
    </section>
    <section class="metrics" aria-label="운영 기준">
      <div><strong>예약 전</strong><span>총 금액 고지</span></div><div><strong>전국</strong><span>지역별 상담</span></div><div><strong>6종</strong><span>대표 관리</span></div><div><strong>24/7</strong><span>상담 접수</span></div>
    </section>
    <section class="section" id="services"><p class="eyebrow">Our Services</p><h2>프리미엄 마사지 서비스</h2><p class="lead">목적과 컨디션에 맞춰 부드러운 릴랙스부터 집중 케어까지 선택할 수 있습니다.</p><div class="card-grid">${services.map(([name, desc]) => `<article class="service-card"><span>✦</span><h3>${name}</h3><p>${desc}</p></article>`).join("")}</div></section>
    <section class="section band" id="areas"><p class="eyebrow">Service Areas</p><h2>전국 서비스 지역</h2><p class="lead">지역명만 나열하지 않고, 권역별 이동 특성과 이용 상황을 반영한 안내 페이지를 제공합니다.</p><div class="area-grid">${regions.map(([slug, ko, en]) => `<a href="/regions/${slug}.html"><strong>${ko}</strong><span>${en}</span></a>`).join("")}</div></section>
    <section class="section"><p class="eyebrow">Why Choose Us</p><h2>${brand}를 선택하는 이유</h2><div class="reason-grid">${["예약 전 금액과 코스 범위를 먼저 설명합니다.","서비스 범위를 벗어나는 요청은 받지 않습니다.","지역별 이동 가능 시간을 무리하게 약속하지 않습니다.","고객 피드백을 반영해 안내 문구와 운영 기준을 갱신합니다."].map((t, i) => `<article><b>0${i + 1}</b><h3>${t}</h3><p>확인 가능한 정보와 현장 경험을 기준으로 안내해 처음 이용하는 고객도 절차를 쉽게 이해할 수 있게 돕습니다.</p></article>`).join("")}</div></section>
    <section class="section band" id="pricing"><p class="eyebrow">Pricing</p><h2>서비스 가격 안내</h2><p class="lead">아래 금액은 기본 안내이며 지역, 시간, 관리 구성에 따라 상담 시 최종 확인합니다.</p><div class="price-grid">${[["Basic","80,000원","60분","기본 릴랙스 관리"],["Premium","110,000원","90분","아로마 포함 추천 코스"],["Royal","140,000원","120분","전신 집중 맞춤 관리"]].map((p, i) => `<article class="${i === 1 ? "featured" : ""}"><h3>${p[0]} 코스</h3><strong>${p[1]}</strong><span>${p[2]}</span><p>${p[3]}</p><a class="button outline" href="tel:${phone.replaceAll("-", "")}">예약 문의</a></article>`).join("")}</div></section>
    <section class="section faq" id="faq"><p class="eyebrow">FAQ</p><h2>자주 묻는 질문</h2>${["출장마사지 예약은 어떻게 하나요?","서비스 가격은 어떻게 되나요?","어떤 마사지 종류가 있나요?","운영 시간은 어떻게 되나요?"].map((q, i) => `<details ${i === 0 ? "open" : ""}><summary>${q}</summary><p>전화 또는 문자로 지역, 희망 시간, 관리 목적을 알려주시면 가능 여부와 예상 비용을 확인해 안내합니다. 예약 확정 전 총 금액과 준비 사항을 다시 설명합니다.</p></details>`).join("")}</section>
    <section class="cta"><h2>오늘의 회복을 시작하세요</h2><p>매일 상담 접수 · 전국 출장 · 예약 전 가격 안내 · 건전한 웰니스 관리</p><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="sms:${phone.replaceAll("-", "")}">문자문의</a></section>
    ${homeArticle()}
  </main>`;
  return layout({
    title: `${brand} | 전국 프리미엄 출장마사지 안내`,
    description: `${brand}는 전국 출장마사지 예약 상담, 지역별 방문 가능 안내, 가격과 서비스 범위를 투명하게 제공하는 프리미엄 웰니스 브랜드입니다.`,
    canonical: `${siteUrl}/`,
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: brand,
      url: `${siteUrl}/`,
      telephone: phone,
      areaServed: regions.map(([, ko]) => ko),
      description: `${brand} 전국 출장마사지 상담 및 방문 관리 안내`,
      image: `${siteUrl}/assets/og-image.svg`
    }
  });
}

function regionArticle(ko, en, context, customer) {
  return `<article class="long-copy">
    <h2>${ko} 출장마사지 이용 전 확인할 점</h2>
    <p>${ko} 지역에서 ${brand}를 찾는 고객은 대체로 일정이 빠듯합니다. ${context}에서는 이동 시간, 주차, 출입 방식, 엘리베이터 이용 가능 여부처럼 작은 조건이 실제 예약 만족도에 큰 영향을 줍니다. 그래서 ${brand}는 지역명만 확인하고 바로 확정하지 않습니다. 상담 단계에서 방문 주소의 대략적인 권역, 희망 시간대, 관리가 가능한 공간, 동행 여부, 숙소 규정을 함께 확인해 가능한 일정인지 먼저 판단합니다.</p>
    <p>${ko} 안내 페이지는 검색어를 반복하기 위해 만든 문서가 아닙니다. ${customer}에게 필요한 정보를 기준으로 작성했습니다. 장시간 운전 뒤라면 하체와 허리 긴장이 두드러질 수 있고, 사무 일정이 길었다면 목과 어깨 피로가 먼저 느껴질 수 있습니다. 여행 중이라면 보행량과 수면 부족을 함께 고려해야 합니다. 이런 차이를 반영해 스웨디시, 아로마테라피, 딥티슈, 타이마사지, 스포츠마사지, 림프마사지 중 어떤 방향이 적절한지 상담에서 설명합니다.</p>
    <p>관리 전에는 압 강도와 피해야 할 부위를 다시 확인합니다. 피부가 민감하거나 특정 향에 예민한 고객은 오일 사용 전 반드시 알려주셔야 하며, 음주 직후나 컨디션이 좋지 않은 경우에는 이용을 권하지 않을 수 있습니다. ${brand}는 질병 치료, 통증 치료, 의학적 회복을 보장하지 않습니다. 본 서비스는 건전한 휴식과 컨디션 관리를 위한 웰니스 안내이며, 증상이 지속되거나 질환이 의심되는 경우에는 의료기관 상담이 우선입니다.</p>
    <p>${ko} 지역의 예약 가능 시간은 교통 흐름과 배정 가능한 테라피스트 상황에 따라 달라집니다. 무리하게 빠른 방문을 약속하기보다 실제 도착 가능한 범위를 솔직하게 안내하고, 예약 전 총 금액을 고지합니다. 고객이 호텔에 머무르는 경우에는 객실 방문 규정과 프런트 안내를 확인해야 하며, 자택이나 오피스텔에서는 관리 공간과 주차 정보를 미리 공유하면 준비가 빨라집니다.</p>
    <p>${brand}의 지역 콘텐츠는 실제 상담에서 자주 나온 질문을 반영해 계속 정리합니다. 같은 전국 서비스라도 ${ko}의 이동 조건, 고객 일정, 체류 목적은 다른 지역과 다릅니다. 이 페이지가 처음 이용하는 고객에게는 절차를 알려 주고, 재이용 고객에게는 예약 전 확인 사항을 다시 점검하는 기준표가 되도록 운영합니다. 필요한 것은 화려한 약속보다 정확한 안내, 안전한 범위, 그리고 이용 후에도 불편함이 남지 않는 책임 있는 응대입니다.</p>
  </article>`;
}

function regionPage([slug, ko, en, context, customer]) {
  const body = `<main>
    <section class="sub-hero">
      <p class="eyebrow">Service Area · ${en}</p>
      <h1>${ko} 출장마사지</h1>
      <p>${context}에 맞춰 예약 가능 시간과 방문 조건을 확인한 뒤 안내합니다.</p>
      <a class="button solid" href="tel:${phone.replaceAll("-", "")}">${ko} 예약 문의</a>
    </section>
    <section class="section compact">
      <div class="info-grid">
        <article><b>지역 특성</b><p>${context}</p></article>
        <article><b>추천 고객</b><p>${customer}</p></article>
        <article><b>상담 기준</b><p>주소 권역, 희망 시간, 관리 목적, 공간 조건을 확인한 뒤 가능 여부를 안내합니다.</p></article>
      </div>
    </section>
    <section class="section band"><p class="eyebrow">Available Care</p><h2>${ko}에서 상담 가능한 관리</h2><div class="card-grid">${services.map(([name, desc]) => `<article class="service-card"><span>✦</span><h3>${name}</h3><p>${desc}</p></article>`).join("")}</div></section>
    ${regionArticle(ko, en, context, customer)}
    <section class="cta"><h2>${ko} 지역 상담이 필요하신가요?</h2><p>희망 시간과 위치를 알려주시면 예약 가능 여부와 예상 비용을 먼저 안내합니다.</p><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="sms:${phone.replaceAll("-", "")}">문자문의</a></section>
  </main>`;
  return layout({
    title: `${ko} 출장마사지 | ${brand} 지역별 방문 관리 안내`,
    description: `${ko} 출장마사지 예약 전 확인할 지역 특성, 방문 조건, 서비스 종류와 가격 상담 기준을 ${brand}가 투명하게 안내합니다.`,
    canonical: `${siteUrl}/regions/${slug}.html`,
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${ko} 출장마사지`,
      provider: { "@type": "LocalBusiness", name: brand, telephone: phone },
      areaServed: ko,
      serviceType: "출장마사지 상담 및 웰니스 관리 안내",
      url: `${siteUrl}/regions/${slug}.html`
    }
  });
}

fs.mkdirSync("regions", { recursive: true });
fs.mkdirSync("assets", { recursive: true });
fs.writeFileSync("index.html", home());
for (const region of regions) fs.writeFileSync(path.join("regions", `${region[0]}.html`), regionPage(region));
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n${regions.map(([slug]) => `  <url><loc>${siteUrl}/regions/${slug}.html</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
