// OpTrip — region dataset + rule-based recommendation
// PRD §6 (rule logic) + §7 (data structure)

const REGIONS = [
  {
    id: 'jeju',
    regionName: '제주도',
    shortDescription: '바다, 오름, 카페가 어우러진 휴양 일번지',
    reason: '여유로운 분위기와 다채로운 자연을 모두 즐길 수 있어요.',
    tags: ['#오션뷰', '#카페투어', '#한라산'],
    illus: 'jeju',
    budgetTier: 'high',     // 50만원 이상
    durationFit: ['2박3일', '3박4일', '4박5일', '5박6일'],
    purposeFit: ['힐링', '맛집', '액티비티'],
    companionFit: ['혼자', '연인', '친구', '가족', '부모님과', '아이와'],
  },
  {
    id: 'gangneung',
    regionName: '강원도 강릉',
    shortDescription: '푸른 동해와 커피향이 어우러진 여유',
    reason: '바다를 보며 힐링하기 좋은 최적의 장소예요.',
    tags: ['#오션뷰', '#카페거리', '#당일치기'],
    illus: 'gangneung',
    budgetTier: 'mid',
    durationFit: ['당일치기', '1박2일', '2박3일'],
    purposeFit: ['힐링', '맛집'],
    companionFit: ['혼자', '연인', '친구', '부모님과'],
  },
  {
    id: 'jeonju',
    regionName: '전라북도 전주',
    shortDescription: '한옥과 비빔밥, 느린 시간이 흐르는 도시',
    reason: '맛집과 전통이 살아있는 골목길 산책에 제격이에요.',
    tags: ['#한옥마을', '#로컬맛집', '#야경'],
    illus: 'jeonju',
    budgetTier: 'low',
    durationFit: ['당일치기', '1박2일', '2박3일'],
    purposeFit: ['맛집', '힐링', '역사적인'],
    companionFit: ['혼자', '연인', '친구', '가족', '부모님과'],
  },
  {
    id: 'gyeongju',
    regionName: '경상북도 경주',
    shortDescription: '천년 신라의 숨결, 능과 호수의 도시',
    reason: '역사와 문화 자원이 풍부해 의미있는 여행이 되어요.',
    tags: ['#유적지', '#대릉원', '#야경'],
    illus: 'gyeongju',
    budgetTier: 'mid',
    durationFit: ['1박2일', '2박3일', '3박4일'],
    purposeFit: ['역사적인', '힐링'],
    companionFit: ['가족', '부모님과', '연인', '친구', '아이와'],
  },
  {
    id: 'donghae',
    regionName: '강원도 동해',
    shortDescription: '깨끗한 바다와 한적한 해안 산책로',
    reason: '사람이 적고 풍경이 깨끗해 진짜 쉼이 가능해요.',
    tags: ['#오션뷰', '#한적한', '#일출'],
    illus: 'donghae',
    budgetTier: 'low',
    durationFit: ['당일치기', '1박2일', '2박3일'],
    purposeFit: ['힐링'],
    companionFit: ['혼자', '연인', '부모님과'],
  },
  {
    id: 'mokpo',
    regionName: '전라남도 목포',
    shortDescription: '근대 골목과 다도해, 남도의 정취',
    reason: '역사적인 풍경과 남도 음식을 함께 누릴 수 있어요.',
    tags: ['#남도음식', '#근대건축', '#섬여행'],
    illus: 'mokpo',
    budgetTier: 'low',
    durationFit: ['1박2일', '2박3일', '3박4일'],
    purposeFit: ['역사적인', '맛집', '힐링'],
    companionFit: ['가족', '부모님과', '친구'],
  },
  {
    id: 'yeosu',
    regionName: '전라남도 여수',
    shortDescription: '낭만적인 야경과 바다내음 가득한 항구도시',
    reason: '연인·친구와 야경 산책하며 추억 남기기 좋아요.',
    tags: ['#야경', '#오션뷰', '#케이블카'],
    illus: 'yeosu',
    budgetTier: 'mid',
    durationFit: ['1박2일', '2박3일'],
    purposeFit: ['힐링', '맛집', '액티비티'],
    companionFit: ['연인', '친구', '가족'],
  },
  {
    id: 'busan',
    regionName: '부산광역시',
    shortDescription: '도시와 바다가 만나는 활력의 항구',
    reason: '맛집·바다·도시 인프라까지 모두 잡을 수 있어요.',
    tags: ['#해운대', '#야경', '#먹방'],
    illus: 'busan',
    budgetTier: 'high',
    durationFit: ['1박2일', '2박3일', '3박4일'],
    purposeFit: ['맛집', '액티비티', '힐링'],
    companionFit: ['연인', '친구', '가족', '아이와'],
  },
];

// Budget tier mapping
function budgetTierFor(amount) {
  // amount in 만원 (10,000 KRW units)
  if (amount <= 30) return 'low';
  if (amount <= 70) return 'mid';
  return 'high';
}

// PRD §6 — weighted score
// 1순위 예산 +40 (예산 초과는 -∞ 탈락)
// 2순위 기간 +30
// 3순위 목적(추구미) +20
// 4순위 동행 +10
function recommend(prefs) {
  const userTier = budgetTierFor(prefs.budgetMan || 50);
  const tierRank = { low: 0, mid: 1, high: 2 };

  const scored = REGIONS.map((r) => {
    let score = 0;
    const reasons = [];

    // Budget — region tier <= user tier (사용자 예산 이내)
    if (tierRank[r.budgetTier] <= tierRank[userTier]) {
      score += 40;
      if (r.budgetTier === userTier) {
        score += 5;
        reasons.push('예산 적합도 100%');
      }
    } else {
      return { region: r, score: -Infinity, reasons };
    }

    // Duration
    if (prefs.duration && r.durationFit.includes(prefs.duration)) {
      score += 30;
      reasons.push(`${prefs.duration} 일정 적합`);
    }

    // Purpose (multi-select)
    const purposes = prefs.purposes || [];
    const purposeOverlap = purposes.filter((p) => r.purposeFit.includes(p));
    if (purposeOverlap.length) {
      score += 20 * purposeOverlap.length;
      reasons.push(`${purposeOverlap.join('·')} 분위기`);
    }

    // Companion
    if (prefs.companion && r.companionFit.includes(prefs.companion)) {
      score += 10;
    }

    return { region: r, score, reasons };
  });

  scored.sort((a, b) => b.score - a.score);
  const valid = scored.filter((s) => s.score > 0);
  const top = valid[0] || scored[0];
  return {
    region: top.region,
    score: top.score,
    reasons: top.reasons,
    runners: valid.slice(1, 4).map((s) => s.region),
    top3: valid.slice(0, 3).map((s) => ({ region: s.region, reasons: s.reasons, score: s.score })),
  };
}

window.OPTRIP_DATA = { REGIONS, recommend, budgetTierFor };
