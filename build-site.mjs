import fs from "node:fs";
import path from "node:path";

const siteUrl = "https://gugumassage.pages.dev";
const phone = "0508-202-4743";
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
  ["gangwon", "강원", "Gangwon", "춘천, 원주, 강릉, 속초처럼 관광과 주거 동선이 넓게 이어지는 산악·해안 권역", "장거리 운전과 여행 일정 뒤 숙소에서 편안한 관리를 원하는 고객"],
  ["chungcheong", "충청", "Chungcheong", "청주, 천안, 아산, 대전, 세종을 잇는 중부권 출장과 생활 동선", "업무 이동과 차량 이동이 잦아 목, 허리, 하체 피로가 쌓인 고객"],
  ["jeolla", "전라", "Jeolla", "전주, 광주, 여수, 목포, 순천을 잇는 관광과 산업 일정이 함께 있는 권역", "여행과 출장 사이에 휴식 시간을 안정적으로 확보하고 싶은 고객"],
  ["gyeongsang", "경상", "Gyeongsang", "부산, 대구, 울산, 창원, 포항 등 산업과 관광 거점이 넓게 분포한 권역", "현장 업무, 이동 피로, 숙소 휴식을 함께 고려하는 고객"],
];

const services = [
  ["swedish-massage", "스웨디시", "부드러운 압과 긴 호흡으로 전신 긴장을 낮추는 릴랙스 관리", "조용한 휴식, 수면 전 안정감, 처음 이용하는 고객", "강한 압보다 일정한 리듬과 편안한 터치감을 우선합니다."],
  ["aroma", "아로마테라피", "피부 자극이 적은 오일을 사용해 향과 터치로 안정감을 더하는 관리", "건조함, 긴장감, 향을 통한 휴식 분위기가 필요한 고객", "오일 선호도와 향 민감도를 확인한 뒤 진행합니다."],
  ["deep-tissue", "딥티슈", "등, 어깨, 하체처럼 뭉침이 잦은 부위를 천천히 풀어 주는 집중 관리", "장시간 앉아 있거나 특정 부위가 무겁게 느껴지는 고객", "불편 부위를 중심으로 압 강도를 단계적으로 조절합니다."],
  ["thai", "타이마사지", "스트레칭과 지압을 조합해 굳은 움직임을 부드럽게 만드는 관리", "몸이 뻣뻣하거나 가벼운 스트레칭을 원하는 고객", "무리한 꺾기보다 호흡에 맞춘 움직임을 기준으로 합니다."],
  ["sports", "스포츠마사지", "활동량이 많은 고객의 근육 피로와 회복 리듬을 돕는 관리", "운동 후 피로, 출장 이동, 현장 업무로 몸이 무거운 고객", "활동량과 피로 부위를 확인해 회복 중심으로 안내합니다."],
  ["lymph", "림프마사지", "가벼운 압과 일정한 방향의 터치로 붓기와 무거움을 덜어 주는 관리", "오래 서 있거나 다리와 몸이 무겁게 느껴지는 고객", "강한 자극보다 부드러운 흐름과 편안함을 우선합니다."],
];

const serviceDropdown = services;

const detailedServices = {
  dry: {
    eyebrow: "Dry Care",
    h1: "건식 출장마사지 서비스 안내",
    title: "건식 출장마사지 서비스 안내 | 오일 없이 편안한 전신 관리",
    description: "건식 출장마사지의 특징, 추천 대상, 진행 방식, 이용 전 준비사항을 안내합니다. 오일 없이 압과 스트레칭 중심의 편안한 관리를 확인해 보세요.",
    intro: "건식 관리는 오일을 사용하지 않고 손의 압, 지압, 가벼운 스트레칭을 조합해 몸의 긴장을 낮추는 관리입니다. 옷을 갈아입는 과정이나 오일 사용이 부담스러운 고객에게 적합하며, 짧은 시간에도 담백하게 몸을 정리하고 싶을 때 선택하기 좋습니다.",
    what: "건식 관리는 피부에 오일을 바르지 않고 진행하는 웰니스 관리입니다. 목, 어깨, 등, 허리, 하체처럼 뻐근함을 느끼기 쉬운 부위를 중심으로 압을 조절하며, 강한 자극보다 고객이 편안하게 받아들일 수 있는 범위를 중요하게 봅니다.",
    need: ["오일 사용이 부담스러운 경우", "옷을 갈아입는 과정 없이 간단히 관리받고 싶은 경우", "장시간 앉아 있어 목과 어깨가 무거운 경우", "출장 중 짧은 휴식 시간이 필요한 경우", "강한 압보다 안정적인 압 조절을 원하는 경우"],
    features: ["오일 없이 진행", "부위별 압 조절", "가벼운 스트레칭 병행", "준비 시간이 짧음", "숙소나 사무 공간에서도 비교적 간편함"],
    process: ["예약 접수", "방문 가능 지역과 시간 확인", "불편 부위와 선호 압 강도 확인", "관리 공간 확보", "건식 관리 진행", "마무리 후 다음 이용 시 참고사항 확인"],
    times: [["60분", "목, 어깨, 등처럼 주요 부위를 가볍게 풀고 싶은 고객에게 적합합니다."], ["90분", "상체와 하체를 균형 있게 관리하고 싶은 고객에게 권장합니다."], ["120분", "여유 있게 전신을 정리하고 싶은 고객에게 어울립니다."]],
    compare: [["구분", "건식 관리", "아로마 관리", "스포츠 관리"], ["사용 제품", "오일 없음", "오일 사용 가능", "필요 시 부위 중심"], ["목적", "담백한 긴장 완화", "휴식감과 부드러운 흐름", "활동 후 피로 관리"], ["추천 대상", "오일이 부담스러운 고객", "향과 릴랙스를 원하는 고객", "활동량이 많은 고객"]],
    faq: [["건식 관리는 오일을 사용하지 않나요?", "네. 기본적으로 오일 없이 진행하며, 압과 스트레칭 중심으로 관리합니다."], ["강한 관리인가요?", "고객 선호에 맞춰 조절합니다. 강한 압이 부담스러우면 미리 말씀해 주세요."], ["출장 중 짧게 받을 수 있나요?", "가능 여부는 지역과 시간에 따라 다르며, 60분 코스부터 상담할 수 있습니다."], ["복장은 어떻게 준비하나요?", "편안한 복장이 좋고, 방문 환경에 따라 상담 시 안내합니다."]]
  },
  aroma: {
    eyebrow: "Aroma Care",
    h1: "아로마테라피 출장마사지 서비스 안내",
    title: "아로마테라피 출장마사지 서비스 안내 | 향과 오일 중심 릴랙스 관리",
    description: "아로마테라피 출장마사지의 특징, 추천 대상, 관리 방식, 이용 전 준비사항을 안내합니다. 은은한 오일과 부드러운 터치의 릴랙스 관리를 확인해 보세요.",
    intro: "아로마테라피는 은은한 오일과 부드러운 터치를 활용해 편안한 휴식감을 높이는 관리입니다. 향과 촉감을 통해 긴장을 낮추고 싶은 고객에게 적합하며, 피부 마찰을 줄여 보다 부드러운 흐름으로 전신을 관리합니다.",
    what: "아로마 관리는 오일 사용 여부와 향 민감도를 먼저 확인한 뒤 진행합니다. 강한 자극보다 편안한 흐름, 안정적인 분위기, 일정한 압 조절을 중심으로 하며 휴식 목적의 전신 관리에 잘 어울립니다.",
    need: ["건조함이나 마찰이 부담스러운 경우", "향을 통한 편안한 분위기를 원하는 경우", "강한 지압보다 부드러운 흐름을 선호하는 경우", "수면 전 차분한 관리가 필요한 경우", "호텔이나 숙소에서 조용히 쉬고 싶은 경우"],
    features: ["오일 사용 가능", "은은한 향 선택", "부드러운 터치", "전신 중심 관리", "편안한 분위기"],
    process: ["예약 접수", "향 민감도와 오일 사용 가능 여부 확인", "방문 지역과 시간 확인", "관리 공간과 타월 준비", "아로마 관리 진행", "마무리 안내"],
    times: [["60분", "짧게 휴식감을 얻고 싶은 고객에게 적합합니다."], ["90분", "전신 아로마 관리를 충분히 원하는 고객에게 권장합니다."], ["120분", "여유 있는 숙소 휴식과 깊은 릴랙스를 원하는 고객에게 어울립니다."]],
    compare: [["구분", "아로마 관리", "건식 관리", "스웨디시"], ["제품", "오일 사용 가능", "오일 없음", "오일 사용 가능"], ["목적", "향과 릴랙스", "간편한 긴장 완화", "부드러운 전신 흐름"], ["추천 대상", "향과 오일을 원하는 고객", "오일이 부담스러운 고객", "편안한 압을 원하는 고객"]],
    faq: [["아로마테라피는 어떤 분에게 적합한가요?", "향과 오일을 통한 편안한 휴식감을 원하고 강한 압보다 부드러운 흐름을 선호하는 고객에게 적합합니다."], ["오일을 사용하나요?", "네. 오일 사용이 가능하며 민감도가 있으면 예약 전 알려주시면 됩니다."], ["향이 강한가요?", "은은한 향을 기준으로 하며, 향이 부담스러운 경우 조절할 수 있습니다."], ["피부가 민감해도 가능한가요?", "민감한 피부라면 상담 단계에서 반드시 알려주세요. 상황에 따라 이용을 권하지 않을 수도 있습니다."], ["출장 가능한 지역은 어디인가요?", "지역과 시간에 따라 가능 여부를 확인하며, 예약 전 방문 조건과 예상 비용을 안내합니다."], ["예약 전 무엇을 말해야 하나요?", "지역, 시간, 오일 선호도, 피해야 할 향이나 부위를 알려주시면 됩니다."]]
  },
  sports: {
    eyebrow: "Sports Care",
    h1: "스포츠마사지 출장마사지 서비스 안내",
    title: "스포츠마사지 출장마사지 서비스 안내 | 활동 후 근육 피로 관리",
    description: "스포츠마사지 출장마사지의 특징, 추천 대상, 진행 방식, 이용 전 준비사항을 안내합니다. 활동량이 많은 고객을 위한 근육 피로 관리 정보를 확인해 보세요.",
    intro: "스포츠마사지는 운동, 장거리 이동, 현장 업무처럼 활동량이 많은 일정 뒤 몸의 무거움을 줄이는 데 초점을 둔 관리입니다. 특정 부위를 무리하게 자극하기보다 피로 부위와 활동 패턴을 확인해 압과 속도를 조절합니다.",
    what: "스포츠 관리는 근육 피로를 느끼는 부위를 중심으로 진행하지만 의료 치료나 재활을 의미하지 않습니다. 고객의 활동량, 불편 부위, 다음 일정까지의 시간을 확인한 뒤 무리 없는 범위에서 관리 방향을 잡습니다.",
    need: ["운동 후 몸이 무겁게 느껴지는 경우", "출장 이동과 장시간 운전이 이어진 경우", "하체나 어깨 피로가 반복되는 경우", "현장 업무 후 휴식이 필요한 경우", "중간~강한 압을 선호하는 경우"],
    features: ["부위 중심 관리", "압 강도 단계 조절", "활동량 확인", "회복 리듬 고려", "다음 일정 전 무리 없는 진행"],
    process: ["예약 접수", "활동량과 피로 부위 확인", "방문 가능 지역 확인", "압 강도와 피해야 할 부위 확인", "스포츠 관리 진행", "마무리 후 주의사항 안내"],
    times: [["60분", "주요 피로 부위 위주로 관리하고 싶은 고객에게 적합합니다."], ["90분", "상체와 하체를 함께 관리하고 싶은 고객에게 권장합니다."], ["120분", "운동이나 업무 후 전신 피로가 큰 고객에게 어울립니다."]],
    compare: [["구분", "스포츠 관리", "스웨디시", "타이마사지"], ["압 강도", "중간~강한 편", "부드러운 편", "스트레칭 중심"], ["목적", "근육 피로 관리", "전신 릴랙스", "움직임과 유연성"], ["추천 대상", "활동량이 많은 고객", "편안한 관리를 원하는 고객", "몸이 뻣뻣한 고객"]],
    faq: [["스포츠마사지는 어떤 분에게 적합한가요?", "운동, 장거리 이동, 현장 업무 등 활동량이 많아 몸이 무겁게 느껴지는 고객에게 적합합니다."], ["운동 직후 바로 받아도 되나요?", "컨디션에 따라 다릅니다. 과도한 피로, 통증, 부상 의심이 있으면 이용보다 휴식이나 의료 상담이 우선입니다."], ["압을 강하게 받을 수 있나요?", "가능한 범위에서 조절하지만 무리한 강압은 권하지 않습니다."], ["어떤 부위를 중심으로 하나요?", "어깨, 등, 허리, 하체 등 피로 부위를 상담에서 먼저 확인합니다."], ["출장 중 받을 수 있나요?", "지역과 시간, 방문 장소 조건을 확인한 뒤 가능 여부를 안내합니다."], ["관리 시간은 어떻게 선택하나요?", "주요 부위 중심은 60분, 전신 피로가 큰 경우에는 90분 이상을 권장합니다."]]
  },
  "deep-tissue": {
    eyebrow: "Deep Tissue",
    h1: "딥티슈 출장마사지 서비스 안내",
    title: "딥티슈 출장마사지 서비스 안내 | 깊은 압 중심 집중 관리",
    description: "딥티슈 출장마사지의 특징, 추천 대상, 관리 방식, 이용 전 준비사항을 안내합니다. 등, 어깨, 하체처럼 뭉침이 잦은 부위의 집중 관리 정보를 확인해 보세요.",
    intro: "딥티슈는 등, 어깨, 하체처럼 뭉침이 잦은 부위를 천천히 풀어 주는 집중 관리입니다. 강한 자극을 무리하게 반복하기보다 고객이 받아들일 수 있는 범위 안에서 압을 단계적으로 조절하며, 깊은 압을 선호하는 고객에게 적합합니다.",
    what: "딥티슈 마사지는 표면적인 릴랙스보다 특정 부위의 무거움과 긴장을 세심하게 확인하는 방식입니다. 다만 의료 치료나 통증 개선을 보장하는 관리가 아니며, 심한 통증이나 부상 의심이 있다면 의료기관 상담이 우선입니다.",
    need: ["등과 어깨가 자주 무겁게 느껴지는 경우", "하체 피로가 오래 남는 경우", "가벼운 터치보다 깊은 압을 선호하는 경우", "장시간 앉아 있거나 서 있는 시간이 긴 경우", "부위별 집중 관리가 필요한 경우"],
    features: ["깊은 압 중심", "부위별 집중 관리", "압 강도 단계 조절", "천천히 진행되는 리듬", "피해야 할 부위 사전 확인"],
    process: ["예약 접수", "방문 가능 지역 확인", "불편 부위와 압 선호도 확인", "관리 공간 준비", "딥티슈 관리 진행", "마무리 안내"],
    times: [["60분", "주요 부위 한두 곳을 중심으로 관리하고 싶은 고객에게 적합합니다."], ["90분", "상체와 하체를 균형 있게 관리하고 싶은 고객에게 권장합니다."], ["120분", "여유 있게 전신의 깊은 긴장을 정리하고 싶은 고객에게 어울립니다."]],
    compare: [["구분", "딥티슈", "스웨디시", "스포츠마사지"], ["압 강도", "중간~강한 편", "부드러운 편", "중간~강한 편"], ["목적", "부위 집중 관리", "릴랙스", "활동 후 피로 관리"], ["추천 대상", "깊은 압을 원하는 고객", "편안한 관리를 원하는 고객", "활동량이 많은 고객"]],
    faq: [["딥티슈는 압이 강한 편인가요?", "스웨디시에 비해 깊은 압을 사용할 수 있지만 고객 컨디션에 맞춰 조절합니다."], ["아픈 부위도 관리 가능한가요?", "통증이나 부상이 의심되는 경우에는 이용보다 의료 상담이 우선입니다."], ["어떤 부위에 적합한가요?", "등, 어깨, 하체처럼 뭉침이 자주 느껴지는 부위를 중심으로 상담할 수 있습니다."], ["처음 받아도 괜찮나요?", "가능하지만 압 강도와 피해야 할 부위를 미리 알려주시면 더 안정적입니다."], ["예약은 어떻게 하나요?", "전화 또는 문자로 지역, 희망 시간, 관리 시간을 알려주시면 가능 여부를 안내합니다."], ["관리 시간은 어떻게 고르나요?", "주요 부위 중심은 60분, 전신 균형 관리는 90분 이상을 권장합니다."]]
  },
  thai: {
    eyebrow: "Thai Massage",
    h1: "타이마사지 출장마사지 서비스 안내",
    title: "타이마사지 출장마사지 서비스 안내 | 스트레칭 중심 전신 관리",
    description: "타이마사지 출장마사지의 특징, 추천 대상, 관리 방식, 이용 전 준비사항을 안내합니다. 스트레칭과 지압을 조합한 전신 관리 정보를 확인해 보세요.",
    intro: "타이마사지는 스트레칭과 지압을 조합해 굳은 움직임을 부드럽게 만드는 전신 관리입니다. 몸이 뻣뻣하거나 오래 앉아 있어 움직임이 둔해진 고객에게 적합하며, 무리한 꺾기보다 호흡에 맞춘 편안한 동작을 기준으로 합니다.",
    what: "타이마사지는 오일을 중심으로 한 릴랙스 관리와 달리 스트레칭 동작과 압을 함께 사용합니다. 유연성이나 움직임을 편안하게 정리하는 데 목적을 두지만, 치료나 교정을 의미하지 않으며 불편한 동작은 즉시 조절해야 합니다.",
    need: ["몸이 뻣뻣하게 느껴지는 경우", "장시간 앉아 있어 움직임이 둔한 경우", "스트레칭 중심 관리를 원하는 경우", "오일 관리보다 활동적인 관리가 편한 경우", "전신을 가볍게 움직이며 정리하고 싶은 경우"],
    features: ["스트레칭 중심", "지압 병행", "전신 움직임 확인", "호흡에 맞춘 진행", "무리한 동작 조절"],
    process: ["예약 접수", "방문 가능 지역 확인", "관절이나 피해야 할 동작 확인", "관리 공간 준비", "타이마사지 진행", "마무리 안내"],
    times: [["60분", "가볍게 전신 스트레칭을 받고 싶은 고객에게 적합합니다."], ["90분", "상체와 하체 움직임을 충분히 정리하고 싶은 고객에게 권장합니다."], ["120분", "여유롭게 전신을 관리하고 싶은 고객에게 어울립니다."]],
    compare: [["구분", "타이마사지", "스웨디시", "딥티슈"], ["압 강도", "스트레칭 중심", "부드러운 편", "깊은 압 중심"], ["목적", "유연성·움직임 개선", "릴랙스", "부위 집중 관리"], ["추천 대상", "몸이 뻣뻣한 고객", "편안한 관리를 원하는 고객", "깊은 압을 원하는 고객"]],
    faq: [["타이마사지는 스트레칭이 많은가요?", "네. 스트레칭과 지압을 조합하지만 불편한 동작은 조절합니다."], ["몸이 뻣뻣해도 받을 수 있나요?", "가능하지만 무리한 동작은 피해야 하므로 컨디션을 미리 알려주세요."], ["오일을 사용하나요?", "기본적으로 스트레칭과 지압 중심이며, 코스 구성은 상담 시 확인합니다."], ["출장 가능한 지역은 어디인가요?", "지역과 시간에 따라 가능 여부를 안내합니다."], ["예약은 어떻게 하나요?", "전화 또는 문자로 지역, 희망 시간, 방문 장소를 알려주시면 됩니다."], ["관리 시간은 어떻게 선택하나요?", "가벼운 관리는 60분, 충분한 전신 관리는 90분 이상을 권장합니다."]]
  },
  lymph: {
    eyebrow: "Lymph Care",
    h1: "림프마사지 출장마사지 서비스 안내",
    title: "림프마사지 출장마사지 서비스 안내 | 가벼운 압 중심 순환 관리",
    description: "림프마사지 출장마사지의 특징, 추천 대상, 관리 방식, 이용 전 준비사항을 안내합니다. 가벼운 압과 일정한 흐름의 전신 관리를 확인해 보세요.",
    intro: "림프마사지는 가벼운 압과 일정한 방향의 터치로 몸이 무겁게 느껴지는 상태를 편안하게 정리하는 관리입니다. 강한 자극보다 부드러운 흐름을 선호하는 고객에게 적합하며, 오래 서 있거나 이동이 많았던 날에 선택하기 좋습니다.",
    what: "림프마사지는 강하게 누르는 방식이 아니라 편안한 압과 반복적인 흐름을 중요하게 봅니다. 붓기나 질환의 개선을 보장하는 의료 행위가 아니며, 몸 상태가 좋지 않거나 질환이 의심되는 경우에는 의료기관 상담이 우선입니다.",
    need: ["몸이 무겁게 느껴지는 경우", "오래 서 있거나 이동이 많았던 경우", "강한 압이 부담스러운 경우", "부드러운 전신 관리를 원하는 경우", "수면 전 편안한 흐름을 선호하는 경우"],
    features: ["가벼운 압", "일정한 방향의 터치", "부드러운 전신 관리", "강한 자극 최소화", "편안한 분위기"],
    process: ["예약 접수", "방문 가능 지역 확인", "컨디션과 피해야 할 부위 확인", "관리 공간 준비", "림프마사지 진행", "마무리 안내"],
    times: [["60분", "가볍게 몸을 정리하고 싶은 고객에게 적합합니다."], ["90분", "전신을 충분히 편안하게 관리하고 싶은 고객에게 권장합니다."], ["120분", "여유 있는 휴식과 부드러운 전신 관리를 원하는 고객에게 어울립니다."]],
    compare: [["구분", "림프마사지", "스웨디시", "딥티슈"], ["압 강도", "가벼운 편", "부드러운 편", "중간~강한 편"], ["목적", "편안한 흐름", "릴랙스", "부위 집중 관리"], ["추천 대상", "강한 압이 부담스러운 고객", "전신 휴식을 원하는 고객", "깊은 압을 원하는 고객"]],
    faq: [["림프마사지는 압이 약한 편인가요?", "네. 일반적으로 가벼운 압과 부드러운 흐름을 중심으로 진행합니다."], ["붓기 개선을 보장하나요?", "의학적 개선이나 치료를 보장하지 않습니다. 컨디션 관리 목적의 웰니스 서비스입니다."], ["오일을 사용하나요?", "코스와 고객 선호에 따라 상담 시 확인합니다."], ["어떤 분에게 적합한가요?", "강한 압이 부담스럽고 몸이 무겁게 느껴지는 고객에게 적합합니다."], ["예약은 어떻게 하나요?", "전화 또는 문자로 지역, 시간, 방문 장소를 알려주시면 됩니다."], ["관리 시간은 어떻게 선택하나요?", "가벼운 관리는 60분, 충분한 전신 관리는 90분 이상을 권장합니다."]]
  },
  couple: {
    eyebrow: "Couple Care",
    h1: "커플 출장마사지 서비스 안내",
    title: "커플 출장마사지 서비스 안내 | 함께 받는 휴식 관리",
    description: "커플 출장마사지의 예약 조건, 진행 방식, 준비사항, 이용 전 확인사항을 안내합니다. 여행과 숙소 체류 중 함께 받는 휴식 관리를 확인해 보세요.",
    intro: "커플 관리는 두 명이 같은 장소에서 순차 또는 동시로 관리를 요청할 수 있는 서비스입니다. 여행, 기념일, 숙소 체류 중 함께 휴식을 원할 때 적합하며, 공간 조건과 관리사 배정 가능 여부를 예약 전에 확인해야 합니다.",
    what: "커플 관리는 단순히 두 명이 함께 예약한다는 의미를 넘어, 시간표와 공간, 동선, 준비물을 함께 조율하는 방식입니다. 동시 진행은 배정 가능한 인원과 지역 상황에 따라 달라질 수 있어 예약 전 확인이 중요합니다.",
    need: ["여행 중 함께 휴식 시간을 갖고 싶은 경우", "기념일이나 숙소 체류 일정이 있는 경우", "두 명의 관리 시간을 한 번에 조율하고 싶은 경우", "호텔이나 펜션에서 방문 관리를 원하는 경우", "각자 다른 코스를 상담하고 싶은 경우"],
    features: ["2인 예약 상담", "순차 또는 동시 진행 확인", "각자 압 강도 조절", "숙소 공간 조건 확인", "예약 전 총 금액 안내"],
    process: ["예약 접수", "인원과 희망 코스 확인", "동시 진행 가능 여부 확인", "방문 장소와 공간 조건 확인", "각 고객 컨디션 확인", "관리 진행 후 마무리 안내"],
    times: [["60분", "두 명 모두 가볍게 관리받고 싶은 일정에 적합합니다."], ["90분", "여행 후 충분한 휴식을 원하는 커플에게 권장합니다."], ["120분", "숙소에서 여유롭게 깊은 휴식을 원할 때 어울립니다."]],
    compare: [["구분", "커플 관리", "개인 관리", "기업·숙소 방문 관리"], ["대상", "2인 이용", "1인 이용", "단체·일정형 이용"], ["확인 사항", "공간과 인원 배정", "개인 컨디션", "출입·시간표"], ["추천 상황", "여행·기념일", "개인 휴식", "출장팀·행사"]],
    faq: [["동시에 받을 수 있나요?", "지역과 배정 가능 인원, 공간 조건에 따라 달라집니다. 예약 전 확인합니다."], ["두 명이 다른 코스를 선택할 수 있나요?", "가능 여부를 상담에서 확인합니다. 각자의 컨디션과 선호 압을 따로 전달해 주세요."], ["숙소에서 이용 가능한가요?", "호텔, 펜션, 오피스텔 등 장소 규정과 출입 조건을 확인해야 합니다."], ["요금은 어떻게 안내되나요?", "인원, 시간, 지역, 동시 진행 여부에 따라 총 금액을 예약 전 안내합니다."]]
  },
  "business-visit": {
    eyebrow: "Business Visit Care",
    h1: "기업·숙소 방문 마사지 서비스 안내",
    title: "기업·숙소 방문 마사지 서비스 안내 | 출장팀과 숙소 체류 고객 관리",
    description: "기업·숙소 방문 마사지의 예약 조건, 진행 방식, 결제와 방문 유의사항을 안내합니다. 출장팀, 행사, 숙소 체류 일정에 맞춘 방문 관리를 확인해 보세요.",
    intro: "기업·숙소 방문 관리는 출장팀, 행사 일정, 장기 숙소 체류처럼 여러 조건을 함께 조율해야 하는 예약에 적합한 서비스입니다. 방문 규정, 출입 방식, 시간표, 결제 방식을 사전에 확인해 현장 혼선을 줄이는 데 초점을 둡니다.",
    what: "기업·숙소 방문 관리는 개인 예약보다 준비 정보가 더 중요합니다. 방문 장소의 규정, 담당자 연락처, 이용 인원, 희망 코스, 대기 공간, 결제 방식이 명확해야 예약과 배정이 안정적으로 진행됩니다.",
    need: ["출장팀 일정 후 휴식 관리가 필요한 경우", "호텔이나 숙소 체류 인원이 여러 명인 경우", "행사 후 피로 관리를 예약하고 싶은 경우", "기업 복지나 내부 일정으로 방문 관리가 필요한 경우", "시간표와 결제 방식을 사전에 맞춰야 하는 경우"],
    features: ["담당자 기준 예약", "인원과 시간표 확인", "방문 규정 사전 체크", "결제 방식 조율", "서비스 범위 명확화"],
    process: ["상담 접수", "인원과 희망 시간표 확인", "방문 장소 규정과 출입 방식 확인", "코스와 총 금액 안내", "관리사 배정 가능 여부 확인", "방문 진행 후 피드백 확인"],
    times: [["60분", "인원이 많거나 일정이 촘촘할 때 기본 관리 단위로 활용하기 좋습니다."], ["90분", "개별 휴식 만족도를 높이고 싶은 일정에 권장합니다."], ["120분", "장기 체류나 충분한 휴식 시간이 확보된 경우에 적합합니다."]],
    compare: [["구분", "기업·숙소 방문", "개인 예약", "커플 관리"], ["대상", "팀·숙소·행사", "개인", "2인"], ["핵심 확인", "인원·출입·결제", "컨디션·시간", "공간·동시 가능 여부"], ["추천 상황", "출장팀·행사", "개인 휴식", "여행·기념일"]],
    faq: [["여러 명 예약도 가능한가요?", "가능 여부는 지역, 시간, 배정 인원에 따라 달라집니다. 인원과 시간표를 먼저 알려주세요."], ["기업 결제가 가능한가요?", "결제 방식은 상담에서 확인합니다. 필요한 안내 정보가 있다면 예약 전 말씀해 주세요."], ["호텔 방문은 어떻게 확인하나요?", "객실 방문 규정, 프런트 안내, 출입 방식, 주차 조건을 확인해야 합니다."], ["서비스 범위는 어떻게 안내되나요?", "예약 전 코스, 시간, 총 금액, 유의사항을 명확히 안내합니다."]]
  }
};

const navRegions = [
  ["seoul", "서울"],
  ["gyeonggi", "경기"],
  ["incheon", "인천"],
  ["busan", "부산"],
  ["daegu", "대구"],
  ["daejeon", "대전"],
  ["gwangju", "광주"],
  ["ulsan", "울산"],
  ["sejong", "세종"],
  ["gangwon", "강원"],
  ["chungcheong", "충청"],
  ["jeolla", "전라"],
  ["gyeongsang", "경상"],
  ["jeju", "제주"],
];

const nav = `<nav aria-label="주요 메뉴">
  <div class="nav-item"><a href="/#services">서비스 안내</a><div class="dropdown">${serviceDropdown.map(([slug, name]) => `<a href="${serviceHref(slug)}">${name}</a>`).join("")}</div></div>
  <div class="nav-item"><a href="/#areas">출장 가능 지역</a><div class="dropdown region-menu">${navRegions.map(([slug, name]) => `<a href="/regions/${slug}.html">${name}</a>`).join("")}</div></div>
  <div class="nav-item"><a href="/#how-to">이용 방법</a><div class="dropdown"><a href="/#booking-process">예약 절차</a><a href="/#before-care">관리 전 준비사항</a><a href="/#payment-method">결제 방법</a><a href="/#cancel-refund">취소·환불 안내</a><a href="/#visit-notice">방문 유의사항</a></div></div>
  <div class="nav-item"><a href="/#pricing">요금 안내</a><div class="dropdown"><a href="/#pricing">코스별 요금</a><a href="/#extra-fee">추가 요금</a><a href="/#night-distance">심야·장거리 출장비</a><a href="/#payment-method">결제 방식</a></div></div>
  <a href="/#faq">FAQ</a>
  <a href="/#contact">예약 문의</a>
</nav>`;

function serviceHref(slug) {
  return slug === "swedish-massage" ? "/services/swedish-massage/" : `/services/${slug}.html`;
}

function serviceCanonical(slug) {
  return slug === "swedish-massage" ? `${siteUrl}/services/swedish-massage/` : `${siteUrl}/services/${slug}.html`;
}

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
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="shortcut icon" href="/assets/favicon.svg">
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
      <div><h2>서비스 안내</h2>${services.map(([slug, name]) => `<a href="${serviceHref(slug)}">${name}</a>`).join("")}</div>
      <div><h2>출장 가능 지역</h2>${navRegions.slice(0, 6).map(([slug, ko]) => `<a href="/regions/${slug}.html">${ko}</a>`).join("")}</div>
      <div><h2>고객센터</h2><a href="/#faq">FAQ</a><a href="/#pricing">요금 안내</a><a href="tel:${phone.replaceAll("-", "")}">${phone}</a></div>
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
        <h1>Premium Massage</h1>
        <p class="subtitle">전국 어디서나 조용하고 정돈된 출장마사지 상담과 방문 관리를 안내합니다.</p>
        <div class="hero-actions"><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="#areas">지역 보기</a></div>
      </div>
    </section>
    <section class="metrics" aria-label="운영 기준">
      <div><strong>예약 전</strong><span>총 금액 고지</span></div><div><strong>전국</strong><span>지역별 상담</span></div><div><strong>6종</strong><span>대표 관리</span></div><div><strong>24/7</strong><span>상담 접수</span></div>
    </section>
    <section class="section" id="services"><p class="eyebrow">Service Guide</p><h2>서비스 안내</h2><p class="lead">목적과 컨디션에 맞춰 부드러운 릴랙스부터 집중 케어까지 선택할 수 있습니다.</p><div class="service-list" aria-label="서비스 안내 메뉴">${services.map(([slug, name]) => `<a href="${serviceHref(slug)}">${name}</a>`).join("")}</div><div class="card-grid">${services.map(([slug, name, desc]) => `<a class="service-card" href="${serviceHref(slug)}"><span>✦</span><h3>${name}</h3><p>${desc}</p></a>`).join("")}</div></section>
    <section class="section band" id="areas"><p class="eyebrow">Service Areas</p><h2>출장 가능 지역</h2><p class="lead">지역명만 나열하지 않고, 권역별 이동 특성과 이용 상황을 반영한 안내 페이지를 제공합니다.</p><div class="area-grid">${navRegions.map(([slug, ko]) => `<a href="/regions/${slug}.html"><strong>${ko}</strong><span>출장마사지</span></a>`).join("")}</div></section>
    <section class="section" id="how-to"><p class="eyebrow">How To Use</p><h2>이용 방법</h2><p class="lead">예약부터 방문까지 필요한 정보를 미리 확인하면 더 안정적으로 이용할 수 있습니다.</p><div class="reason-grid how-grid"><article id="booking-process"><b>01</b><h3>예약 절차</h3><p>전화 또는 문자로 지역, 희망 시간, 인원, 관리 목적을 알려주시면 가능 여부와 예상 비용을 안내합니다.</p></article><article id="before-care"><b>02</b><h3>관리 전 준비사항</h3><p>조용한 공간, 샤워 가능 여부, 주차와 출입 정보를 미리 확인하면 방문 준비가 빨라집니다.</p></article><article id="payment-method"><b>03</b><h3>결제 방법</h3><p>예약 확정 전 총 금액과 결제 방식을 확인하며, 현장 상황에 따른 추가 비용은 사전 안내를 원칙으로 합니다.</p></article><article id="cancel-refund"><b>04</b><h3>취소·환불 안내</h3><p>배정 전 취소와 방문 직전 취소 기준이 다를 수 있어 상담 시 시간 변경 가능 여부를 함께 확인합니다.</p></article><article id="visit-notice"><b>05</b><h3>방문 유의사항</h3><p>호텔과 숙소는 객실 방문 규정을 확인해야 하며, 서비스 범위를 벗어나는 요청은 운영 정책상 받지 않습니다.</p></article></div></section>
    <section class="section"><p class="eyebrow">Why Choose Us</p><h2>${brand}를 선택하는 이유</h2><div class="reason-grid">${["예약 전 금액과 코스 범위를 먼저 설명합니다.","서비스 범위를 벗어나는 요청은 받지 않습니다.","지역별 이동 가능 시간을 무리하게 약속하지 않습니다.","고객 피드백을 반영해 안내 문구와 운영 기준을 갱신합니다."].map((t, i) => `<article><b>0${i + 1}</b><h3>${t}</h3><p>확인 가능한 정보와 현장 경험을 기준으로 안내해 처음 이용하는 고객도 절차를 쉽게 이해할 수 있게 돕습니다.</p></article>`).join("")}</div></section>
    <section class="section band" id="pricing"><p class="eyebrow">Pricing</p><h2>요금 안내</h2><p class="lead">아래 금액은 기본 안내이며 지역, 시간, 관리 구성에 따라 상담 시 최종 확인합니다.</p><div class="price-grid">${[["Basic","80,000원","60분","기본 릴랙스 관리"],["Premium","110,000원","90분","아로마 포함 추천 코스"],["Royal","140,000원","120분","전신 집중 맞춤 관리"]].map((p, i) => `<article class="${i === 1 ? "featured" : ""}"><h3>${p[0]} 코스</h3><strong>${p[1]}</strong><span>${p[2]}</span><p>${p[3]}</p><a class="button outline" href="tel:${phone.replaceAll("-", "")}">예약 문의</a></article>`).join("")}</div><div class="fee-notes"><article id="extra-fee"><b>추가 요금</b><p>관리 시간 연장, 인원 추가, 특수 방문 조건은 예약 전 별도 안내합니다.</p></article><article id="night-distance"><b>심야·장거리 출장비</b><p>심야 시간, 외곽 이동, 주차 조건에 따라 출장비가 달라질 수 있습니다.</p></article></div></section>
    <section class="section faq" id="faq"><p class="eyebrow">FAQ</p><h2>FAQ</h2>${["예약은 어떻게 하나요?","결제 방식은 어떻게 확인하나요?","방문 가능 장소는 어디인가요?","위생 관리는 어떻게 하나요?","관리사 배정은 어떻게 되나요?","취소 기준은 어떻게 되나요?"].map((q, i) => `<details ${i === 0 ? "open" : ""}><summary>${q}</summary><p>전화 또는 문자로 지역, 희망 시간, 관리 목적을 알려주시면 가능 여부와 예상 비용을 확인해 안내합니다. 예약 확정 전 총 금액과 준비 사항을 다시 설명합니다.</p></details>`).join("")}</section>
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
    <section class="section band"><p class="eyebrow">Available Care</p><h2>${ko}에서 상담 가능한 관리</h2><div class="card-grid">${services.map(([slug, name, desc]) => `<a class="service-card" href="${serviceHref(slug)}"><span>✦</span><h3>${name}</h3><p>${desc}</p></a>`).join("")}</div></section>
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

function serviceArticle([slug, name, desc, intent, method]) {
  return `<article class="long-copy">
    <h2>${name} 이용 전 확인할 점</h2>
    <p>${name}는 ${desc}입니다. ${brand}는 서비스 이름만 보고 일괄적으로 진행하지 않고, 예약 상담에서 고객의 일정, 공간, 컨디션, 선호 압 강도, 피해야 할 부위를 먼저 확인합니다. 같은 ${name}라도 호텔에서 쉬는 고객과 장거리 운전 뒤 자택에서 이용하는 고객의 목적은 다를 수 있기 때문입니다.</p>
    <p>추천 대상은 ${intent}입니다. 다만 마사지 안내는 의료 진단이나 치료가 아니며, 통증이 심하거나 질환이 의심되는 경우에는 의료기관 상담이 우선입니다. ${brand}의 서비스 안내는 과장된 효과를 약속하기보다 어떤 상황에서 어떤 관리 방향이 어울리는지 설명하는 데 목적이 있습니다.</p>
    <p>진행 방식은 ${method} 예약 전에는 방문 지역, 희망 시간, 관리 시간, 준비 가능한 공간을 확인하고, 예약 확정 전에 총 금액을 다시 안내합니다. 관리 중 불편함이 있으면 바로 압 강도와 속도를 조절할 수 있으며, 특정 향이나 오일에 민감한 경우에는 상담 단계에서 미리 알려주셔야 합니다.</p>
    <p>${name}를 처음 이용하는 고객에게 가장 중요한 것은 무리하지 않는 선택입니다. 강한 압이 항상 좋은 관리가 아니고, 긴 시간이 모든 고객에게 맞는 것도 아닙니다. ${brand}는 고객의 피로 유형과 이용 목적을 듣고 스웨디시, 아로마테라피, 딥티슈, 타이마사지, 스포츠마사지, 림프마사지 중 적절한 방향을 함께 안내합니다.</p>
  </article>`;
}

function swedishMassagePage() {
  const body = `<main>
    <section class="sub-hero">
      <p class="eyebrow">Swedish Massage</p>
      <h1>스웨디시 출장마사지 서비스 안내</h1>
      <p>스웨디시는 부드러운 압과 긴 호흡의 터치로 전신의 긴장을 완화하는 릴랙스 중심 관리입니다. 강한 압보다 편안한 흐름과 안정감을 선호하는 고객에게 적합하며, 바쁜 일상 후 몸과 마음을 차분하게 정리하는 데 도움을 줍니다.</p>
      <a class="button solid" href="tel:${phone.replaceAll("-", "")}">스웨디시 예약 문의</a>
    </section>
    <article class="long-copy service-detail">
      <h2>스웨디시 마사지란?</h2>
      <p>스웨디시 마사지는 부드러운 터치와 일정한 리듬을 바탕으로 몸의 긴장을 낮추는 전신 릴랙스 관리입니다. 손의 흐름을 길게 이어 가며 압을 천천히 조절하기 때문에 강한 지압이 부담스러운 고객도 비교적 편안하게 선택할 수 있습니다.</p>
      <p>이 관리는 특정 부위를 세게 누르는 방식보다 전신의 흐름과 안정감을 중요하게 봅니다. 그래서 피로한 부위를 무리하게 자극하기보다 고객의 호흡과 컨디션에 맞춰 편안한 압을 찾는 것이 핵심입니다.</p>
      <h2>스웨디시 관리가 필요한 경우</h2>
      <ul>
        <li>전신 긴장이 쌓여 몸이 무겁게 느껴지는 경우</li>
        <li>강한 압이나 깊은 지압이 부담스러운 경우</li>
        <li>조용하고 편안한 휴식 시간이 필요한 경우</li>
        <li>수면 전 몸을 가볍게 정리하고 싶은 경우</li>
        <li>장시간 앉아서 일해 목, 어깨, 허리가 뻐근한 경우</li>
      </ul>
      <h2>스웨디시 마사지의 특징</h2>
      <p>스웨디시의 가장 큰 특징은 부드러운 터치와 일정한 압 조절입니다. 전신 중심으로 진행하며, 고객이 편안하게 느끼는 범위 안에서 압과 속도를 맞춥니다. 관리 공간의 조도, 온도, 소음 같은 분위기도 만족도에 영향을 주기 때문에 예약 전 방문 환경을 함께 확인합니다.</p>
      <p>필요한 경우 피부 자극이 적은 오일을 사용해 마찰을 줄이고 움직임을 부드럽게 이어 갑니다. 특정 향이나 오일에 민감한 고객은 상담 단계에서 미리 알려주시면 관리 방향을 조정할 수 있습니다.</p>
      <h2>관리 진행 방식</h2>
      <ol>
        <li>전화 또는 문자로 예약을 접수합니다.</li>
        <li>출장 가능 지역과 예상 이동 시간을 확인합니다.</li>
        <li>고객 컨디션, 선호 압 강도, 피해야 할 부위를 확인합니다.</li>
        <li>관리받을 공간, 샤워 가능 여부, 주차와 출입 조건을 준비합니다.</li>
        <li>스웨디시 관리를 진행하며 불편함이 있으면 압과 속도를 조절합니다.</li>
        <li>마무리 후 이용 중 불편했던 점과 다음 예약 시 참고할 내용을 확인합니다.</li>
      </ol>
      <h2>추천 관리 시간</h2>
      <div class="info-grid">
        <article><b>60분</b><p>가볍게 전신을 풀고 싶은 고객에게 적합합니다. 처음 이용하거나 짧은 휴식 시간이 필요할 때 선택하기 좋습니다.</p></article>
        <article><b>90분</b><p>전신 릴랙스를 충분히 원하는 고객에게 권장합니다. 상체와 하체를 균형 있게 관리하기에 무리가 적습니다.</p></article>
        <article><b>120분</b><p>여유 있게 깊은 휴식을 원하는 고객에게 어울립니다. 이동 피로가 크거나 숙소에서 충분히 쉬고 싶은 경우에 적합합니다.</p></article>
      </div>
      <h2>스웨디시와 다른 마사지의 차이</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>구분</th><th>스웨디시</th><th>스포츠마사지</th><th>타이마사지</th></tr></thead>
          <tbody>
            <tr><th>압 강도</th><td>부드러운 편</td><td>중간~강한 편</td><td>스트레칭 중심</td></tr>
            <tr><th>목적</th><td>릴랙스</td><td>근육 피로 완화</td><td>유연성·움직임 개선</td></tr>
            <tr><th>추천 대상</th><td>편안한 관리를 원하는 고객</td><td>활동량이 많은 고객</td><td>몸이 뻣뻣한 고객</td></tr>
          </tbody>
        </table>
      </div>
      <h2>이용 전 준비사항</h2>
      <ul>
        <li>관리받을 공간을 미리 확보해 주세요.</li>
        <li>샤워 또는 간단한 공간 정돈을 마치면 진행이 수월합니다.</li>
        <li>과식이나 음주 직후 이용은 자제하는 것이 좋습니다.</li>
        <li>원하는 압 강도와 불편한 부위를 사전에 알려주세요.</li>
        <li>오일이나 향에 민감한 경우 예약 상담에서 먼저 말씀해 주세요.</li>
      </ul>
      <h2>예약 전 확인사항</h2>
      <p>예약 전에는 출장 가능 지역, 예약 가능 시간, 관리 코스와 소요 시간, 추가 출장비 여부, 결제 방식을 확인합니다. 호텔과 숙소는 객실 방문 규정이 다를 수 있어 프런트 안내나 출입 조건도 함께 확인하면 좋습니다.</p>
      <h2>스웨디시 자주 묻는 질문</h2>
      <div class="faq service-faq">
        <details open><summary>스웨디시는 어떤 분에게 적합한가요?</summary><p>강한 압보다 편안한 흐름을 선호하고, 전신 릴랙스 중심의 관리를 원하는 고객에게 적합합니다.</p></details>
        <details><summary>압이 강한 관리인가요?</summary><p>스웨디시는 대체로 부드러운 압을 사용합니다. 다만 고객의 선호에 따라 가능한 범위 안에서 강도를 조절합니다.</p></details>
        <details><summary>오일을 사용하나요?</summary><p>일반적으로 오일을 사용할 수 있으며, 향이나 피부 민감도가 있는 경우 예약 전 미리 알려주시면 됩니다.</p></details>
        <details><summary>출장 가능한 지역은 어디인가요?</summary><p>서울, 경기, 인천, 부산, 대구, 대전, 광주, 울산, 세종, 강원, 충청, 전라, 경상, 제주 등 지역별 가능 여부를 상담 시 확인합니다.</p></details>
        <details><summary>예약은 어떻게 하나요?</summary><p>전화 또는 문자로 지역, 희망 시간, 관리 시간, 방문 장소 조건을 알려주시면 가능 여부와 총 금액을 안내합니다.</p></details>
        <details><summary>관리 시간은 어떻게 선택하면 좋나요?</summary><p>가벼운 전신 관리는 60분, 충분한 릴랙스는 90분, 여유 있는 휴식은 120분을 기준으로 선택할 수 있습니다.</p></details>
      </div>
    </article>
    <section class="cta"><h2>스웨디시 상담이 필요하신가요?</h2><p>희망 지역과 시간을 알려주시면 가능 여부와 예상 비용을 먼저 안내합니다.</p><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="sms:${phone.replaceAll("-", "")}">문자문의</a></section>
  </main>`;
  return layout({
    title: "스웨디시 출장마사지 서비스 안내 | 부드러운 전신 릴랙스 관리",
    description: "스웨디시 출장마사지의 특징, 추천 대상, 관리 방식, 이용 전 준비사항을 안내합니다. 부드러운 압과 편안한 흐름의 전신 릴랙스 관리를 확인해 보세요.",
    canonical: `${siteUrl}/services/swedish-massage/`,
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "스웨디시 출장마사지",
      provider: { "@type": "LocalBusiness", name: brand, telephone: phone },
      serviceType: "스웨디시 출장마사지 서비스",
      url: `${siteUrl}/services/swedish-massage/`
    }
  });
}

function detailedDropdownServicePage(service) {
  const [slug, name] = service;
  const detail = detailedServices[slug];
  const body = `<main>
    <section class="sub-hero">
      <p class="eyebrow">${detail.eyebrow}</p>
      <h1>${detail.h1}</h1>
      <p>${detail.intro}</p>
      <a class="button solid" href="tel:${phone.replaceAll("-", "")}">${name} 예약 문의</a>
    </section>
    <article class="long-copy service-detail">
      <h2>${name}란?</h2>
      <p>${detail.what}</p>
      <h2>${name}가 필요한 경우</h2>
      <ul>${detail.need.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h2>${name}의 특징</h2>
      <ul>${detail.features.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h2>관리 진행 방식</h2>
      <ol>${detail.process.map((item) => `<li>${item}</li>`).join("")}</ol>
      <h2>추천 관리 시간</h2>
      <div class="info-grid">${detail.times.map(([time, text]) => `<article><b>${time}</b><p>${text}</p></article>`).join("")}</div>
      <h2>${name}와 다른 서비스의 차이</h2>
      <div class="table-wrap">
        <table>
          <thead><tr>${detail.compare[0].map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
          <tbody>${detail.compare.slice(1).map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      <h2>이용 전 준비사항</h2>
      <ul>
        <li>관리받을 공간을 미리 확보해 주세요.</li>
        <li>호텔이나 숙소는 방문 규정과 출입 조건을 확인해 주세요.</li>
        <li>과식이나 음주 직후 이용은 자제하는 것이 좋습니다.</li>
        <li>원하는 압 강도와 피해야 할 부위를 사전에 알려주세요.</li>
        <li>피부 민감도, 향 민감도, 컨디션 이슈가 있으면 상담 단계에서 말씀해 주세요.</li>
      </ul>
      <h2>예약 전 확인사항</h2>
      <p>예약 전에는 출장 가능 지역, 예약 가능 시간, 관리 코스와 소요 시간, 추가 출장비 여부, 결제 방식을 확인합니다. 현장 상황에 따라 방문 가능 여부가 달라질 수 있으므로 확정 전 총 금액과 준비 사항을 다시 안내합니다.</p>
      <h2>${name} 자주 묻는 질문</h2>
      <div class="faq service-faq">${detail.faq.map(([q, a], index) => `<details ${index === 0 ? "open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>
    </article>
    <section class="cta"><h2>${name} 상담이 필요하신가요?</h2><p>희망 지역과 시간을 알려주시면 가능 여부와 예상 비용을 먼저 안내합니다.</p><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="sms:${phone.replaceAll("-", "")}">문자문의</a></section>
  </main>`;
  return layout({
    title: detail.title,
    description: detail.description,
    canonical: serviceCanonical(slug),
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: detail.h1,
      provider: { "@type": "LocalBusiness", name: brand, telephone: phone },
      serviceType: `${name} 출장마사지 서비스`,
      url: serviceCanonical(slug)
    }
  });
}

function servicePage(service) {
  const [slug, name, desc, intent, method] = service;
  const body = `<main>
    <section class="sub-hero">
      <p class="eyebrow">Service Guide</p>
      <h1>${name}</h1>
      <p>${desc}</p>
      <a class="button solid" href="tel:${phone.replaceAll("-", "")}">${name} 예약 문의</a>
    </section>
    <section class="section compact">
      <div class="info-grid">
        <article><b>추천 상황</b><p>${intent}</p></article>
        <article><b>관리 기준</b><p>${method}</p></article>
        <article><b>예약 확인</b><p>지역, 시간, 공간 조건, 선호 압 강도, 총 금액을 예약 전 안내합니다.</p></article>
      </div>
    </section>
    <section class="section band"><p class="eyebrow">Service Menu</p><h2>서비스 안내</h2><div class="service-list">${services.map(([itemSlug, itemName]) => `<a href="${serviceHref(itemSlug)}" class="${itemSlug === slug ? "active" : ""}">${itemName}</a>`).join("")}</div></section>
    ${serviceArticle(service)}
    <section class="cta"><h2>${name} 상담이 필요하신가요?</h2><p>희망 지역과 시간을 알려주시면 가능 여부와 예상 비용을 먼저 안내합니다.</p><a class="button solid" href="tel:${phone.replaceAll("-", "")}">전화예약</a><a class="button outline" href="sms:${phone.replaceAll("-", "")}">문자문의</a></section>
  </main>`;
  return layout({
    title: `${name} | ${brand} 서비스 안내`,
    description: `${brand} ${name} 서비스의 추천 상황, 진행 기준, 예약 전 확인 사항을 투명하게 안내합니다.`,
    canonical: serviceCanonical(slug),
    body,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${brand} ${name}`,
      provider: { "@type": "LocalBusiness", name: brand, telephone: phone },
      serviceType: `${name} 출장마사지 상담 및 웰니스 관리 안내`,
      url: serviceCanonical(slug)
    }
  });
}

fs.mkdirSync("regions", { recursive: true });
fs.mkdirSync("services", { recursive: true });
fs.mkdirSync("assets", { recursive: true });
fs.writeFileSync("index.html", home());
for (const region of regions) fs.writeFileSync(path.join("regions", `${region[0]}.html`), regionPage(region));
for (const service of services) {
  if (service[0] === "swedish-massage") {
    fs.mkdirSync(path.join("services", "swedish-massage"), { recursive: true });
    fs.writeFileSync(path.join("services", "swedish-massage", "index.html"), swedishMassagePage());
  } else if (detailedServices[service[0]]) {
    fs.writeFileSync(path.join("services", `${service[0]}.html`), detailedDropdownServicePage(service));
  } else {
    fs.writeFileSync(path.join("services", `${service[0]}.html`), servicePage(service));
  }
}
for (const service of serviceDropdown.filter(([slug]) => !services.some(([serviceSlug]) => serviceSlug === slug))) {
  fs.writeFileSync(path.join("services", `${service[0]}.html`), detailedServices[service[0]] ? detailedDropdownServicePage(service) : servicePage(service));
}
fs.writeFileSync(path.join("services", "swedish.html"), `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=/services/swedish-massage/">
  <link rel="canonical" href="${siteUrl}/services/swedish-massage/">
  <title>스웨디시 출장마사지 서비스 안내로 이동</title>
</head>
<body>
  <p><a href="/services/swedish-massage/">스웨디시 출장마사지 서비스 안내</a> 페이지로 이동합니다.</p>
</body>
</html>`);
const serviceUrls = [...new Set([...services.map(([slug]) => slug), ...serviceDropdown.map(([slug]) => slug)])];
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n${serviceUrls.map((slug) => `  <url><loc>${serviceCanonical(slug)}</loc></url>`).join("\n")}\n${regions.map(([slug]) => `  <url><loc>${siteUrl}/regions/${slug}.html</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
