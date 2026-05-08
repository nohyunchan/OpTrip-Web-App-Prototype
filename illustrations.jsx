// OpTrip — region illustrations (SVG, no external assets)
// Each takes accent color so it adapts to the active palette.

function IllusJeju({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="jejuSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FCE9D2"/>
          <stop offset="1" stopColor="#F6D8B0"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#jejuSky)"/>
      <circle cx="155" cy="55" r="22" fill="#FFC07A" opacity=".85"/>
      {/* Hallasan */}
      <path d="M0 145 L55 80 L100 115 L140 75 L200 130 L200 200 L0 200 Z" fill={accent} opacity=".9"/>
      <path d="M55 80 L62 92 L48 92 Z" fill="#fff" opacity=".7"/>
      <path d="M140 75 L148 88 L132 88 Z" fill="#fff" opacity=".7"/>
      {/* Sea */}
      <rect x="0" y="155" width="200" height="45" fill="#7BA8B8"/>
      <path d="M0 160 Q25 156 50 160 T100 160 T150 160 T200 160 V200 H0Z" fill="#6695A8"/>
      {/* Stone harubang */}
      <ellipse cx="35" cy="180" rx="9" ry="13" fill="#5A6B5F"/>
      <ellipse cx="35" cy="170" rx="6" ry="6" fill="#6E8073"/>
    </svg>
  );
}

function IllusGangneung({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="gnSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#D9ECF2"/>
          <stop offset="1" stopColor="#A8CADB"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#gnSky)"/>
      <circle cx="50" cy="55" r="18" fill="#FFE2B0"/>
      {/* Distant hills */}
      <path d="M0 130 Q50 105 100 120 T200 115 V200 H0Z" fill={accent} opacity=".55"/>
      {/* Sea */}
      <rect x="0" y="130" width="200" height="70" fill="#5C8FA8"/>
      <path d="M0 140 Q30 135 60 140 T120 140 T200 140 V200 H0Z" fill="#4A7B95"/>
      <path d="M0 158 Q40 154 80 158 T160 158 T200 158 V200 H0Z" fill="#3F6B82"/>
      {/* Beach */}
      <path d="M0 178 Q60 172 120 176 T200 180 V200 H0Z" fill="#EDD9B8"/>
      {/* Coffee cup motif */}
      <circle cx="170" cy="160" r="10" fill="#fff" opacity=".85"/>
      <rect x="167" y="155" width="6" height="3" fill="#3B2E2A"/>
    </svg>
  );
}

function IllusJeonju({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect width="200" height="200" fill="#F4E4D0"/>
      <circle cx="160" cy="50" r="16" fill="#FFB988" opacity=".7"/>
      {/* Hanok rooftops */}
      <g>
        {[0, 50, 100, 150].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${110 + (i % 2) * 8})`}>
            <path d={`M-5 30 L25 5 L55 30 Z`} fill="#3B2E2A"/>
            <path d={`M-5 30 L55 30 L55 35 L-5 35 Z`} fill="#5A453A"/>
            <rect x="5" y="35" width="40" height="35" fill="#D4B896"/>
            <rect x="20" y="48" width="10" height="22" fill={accent} opacity=".7"/>
          </g>
        ))}
      </g>
      <rect x="0" y="180" width="200" height="20" fill="#A8895F"/>
    </svg>
  );
}

function IllusGyeongju({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="gjSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F2D5B8"/>
          <stop offset="1" stopColor="#E5B894"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#gjSky)"/>
      <circle cx="155" cy="55" r="20" fill="#FF9966" opacity=".7"/>
      {/* Royal tomb mounds */}
      <ellipse cx="60" cy="155" rx="55" ry="35" fill={accent} opacity=".85"/>
      <ellipse cx="140" cy="160" rx="45" ry="28" fill={accent} opacity=".7"/>
      <ellipse cx="100" cy="170" rx="40" ry="20" fill={accent}/>
      <rect x="0" y="180" width="200" height="20" fill="#6E7E68"/>
    </svg>
  );
}

function IllusDonghae({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="dhSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB89A"/>
          <stop offset=".5" stopColor="#F8A19A"/>
          <stop offset="1" stopColor="#D4D8E5"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#dhSky)"/>
      <circle cx="100" cy="100" r="28" fill="#FFD89A"/>
      <circle cx="100" cy="100" r="20" fill="#FFE9C4"/>
      <rect x="0" y="120" width="200" height="80" fill="#3F5E78"/>
      <path d="M0 130 Q40 126 80 130 T160 130 T200 130 V200 H0Z" fill="#2E4D66"/>
      <path d="M0 150 Q30 146 60 150 T120 150 T200 150 V200 H0Z" fill="#1F3A52"/>
      {/* Sun reflection */}
      <ellipse cx="100" cy="125" rx="14" ry="2" fill="#FFD89A" opacity=".8"/>
      <ellipse cx="100" cy="135" rx="20" ry="2.5" fill="#FFD89A" opacity=".5"/>
    </svg>
  );
}

function IllusMokpo({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect width="200" height="200" fill="#E8DCC4"/>
      {/* Distant island */}
      <ellipse cx="170" cy="115" rx="35" ry="12" fill={accent} opacity=".5"/>
      <ellipse cx="40" cy="118" rx="28" ry="9" fill={accent} opacity=".4"/>
      {/* Sea */}
      <rect x="0" y="120" width="200" height="55" fill="#6B8FA8"/>
      <path d="M0 130 Q40 126 80 130 T160 130 T200 130 V175 H0Z" fill="#557A95"/>
      {/* Boat */}
      <path d="M70 145 L85 145 L82 152 L73 152 Z" fill="#3B2E2A"/>
      <rect x="76" y="138" width="2" height="8" fill="#3B2E2A"/>
      <path d="M77 138 L84 144 L77 144 Z" fill="#fff"/>
      {/* Old buildings */}
      <rect x="20" y="85" width="20" height="35" fill="#D4B896"/>
      <rect x="44" y="95" width="14" height="25" fill="#C19A6B"/>
      <rect x="62" y="80" width="22" height="40" fill="#B89070"/>
      <rect x="0" y="175" width="200" height="25" fill="#7A8B7E"/>
    </svg>
  );
}

function IllusYeosu({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ysSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1F2A44"/>
          <stop offset=".7" stopColor="#3D4A6E"/>
          <stop offset="1" stopColor="#6B7A99"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#ysSky)"/>
      {/* Stars */}
      {[[30, 30], [60, 20], [120, 25], [170, 35], [90, 50], [150, 55]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#FFE9A8"/>
      ))}
      <circle cx="40" cy="45" r="14" fill="#FFE9A8" opacity=".95"/>
      {/* City lights silhouette */}
      <path d="M0 130 L20 125 L25 110 L40 115 L50 100 L65 105 L75 115 L90 110 L100 95 L115 105 L130 100 L145 110 L160 105 L180 115 L200 110 V155 H0Z" fill="#0F1729"/>
      {/* Window lights */}
      {[[15, 135], [30, 130], [55, 125], [85, 125], [110, 120], [140, 125], [165, 130]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="2" height="4" fill="#FFD480"/>
      ))}
      {/* Sea reflection */}
      <rect x="0" y="155" width="200" height="45" fill="#1A2745"/>
      <path d="M0 160 Q40 158 80 160 T200 160 V200 H0Z" fill="#0F1A35"/>
      {[[40, 165], [80, 170], [130, 168], [165, 172]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3" ry=".6" fill="#FFD480" opacity=".6"/>
      ))}
    </svg>
  );
}

function IllusBusan({ size = '100%', accent = '#7C9885' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bsSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#A8D4E5"/>
          <stop offset="1" stopColor="#E5C9B5"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bsSky)"/>
      <circle cx="155" cy="50" r="16" fill="#FFB988"/>
      {/* Mountains behind city */}
      <path d="M0 100 L40 70 L90 90 L130 65 L180 95 L200 85 V200 H0Z" fill={accent} opacity=".6"/>
      {/* Buildings */}
      <g>
        <rect x="20" y="100" width="14" height="50" fill="#fff"/>
        <rect x="38" y="85" width="18" height="65" fill="#E8DCC4"/>
        <rect x="60" y="95" width="12" height="55" fill="#fff"/>
        <rect x="76" y="75" width="22" height="75" fill="#D4B896"/>
        <rect x="102" y="90" width="14" height="60" fill="#fff"/>
        <rect x="120" y="80" width="20" height="70" fill="#E8DCC4"/>
        <rect x="144" y="100" width="16" height="50" fill="#fff"/>
        <rect x="164" y="85" width="18" height="65" fill="#D4B896"/>
        {/* Windows */}
        {[[24, 110], [28, 120], [44, 100], [44, 115], [44, 130], [82, 90], [82, 105], [82, 120], [82, 135], [126, 95], [126, 110], [126, 125], [126, 140], [168, 95], [168, 110], [168, 125]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="3" height="3" fill="#3B2E2A" opacity=".4"/>
        ))}
      </g>
      {/* Sea */}
      <rect x="0" y="150" width="200" height="50" fill="#5C8FA8"/>
      <path d="M0 158 Q40 154 80 158 T160 158 T200 158 V200 H0Z" fill="#4A7B95"/>
    </svg>
  );
}

const REGION_ILLUS = {
  jeju: IllusJeju,
  gangneung: IllusGangneung,
  jeonju: IllusJeonju,
  gyeongju: IllusGyeongju,
  donghae: IllusDonghae,
  mokpo: IllusMokpo,
  yeosu: IllusYeosu,
  busan: IllusBusan,
};

// Generic plan/discovery illustration for home hero
function IllusCompass({ accent = '#7C9885' }) {
  return (
    <svg viewBox="0 0 200 160" style={{ display: 'block', width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="160" fill={`${accent}15`}/>
      {/* Decorative cloud lines */}
      <path d="M-10 30 Q15 25 40 30" stroke={`${accent}40`} strokeWidth="2" fill="none"/>
      <path d="M150 18 Q175 13 210 20" stroke={`${accent}40`} strokeWidth="2" fill="none"/>
      {/* Map paper */}
      <rect x="40" y="35" width="120" height="90" rx="6" fill="#fff" stroke={`${accent}60`} strokeWidth="1.5"/>
      {/* Dotted route */}
      <path d="M55 105 Q80 75 110 90 Q140 105 150 60" stroke={accent} strokeWidth="2" strokeDasharray="3 3" fill="none" strokeLinecap="round"/>
      {/* Pin start */}
      <circle cx="55" cy="105" r="4" fill={accent}/>
      <circle cx="55" cy="105" r="2" fill="#fff"/>
      {/* Pin end */}
      <path d="M150 50 C146 50 143 53 143 57 C143 62 150 70 150 70 S157 62 157 57 C157 53 154 50 150 50 Z" fill={accent}/>
      <circle cx="150" cy="57" r="2" fill="#fff"/>
      {/* Compass */}
      <circle cx="100" cy="135" r="14" fill="#fff" stroke={accent} strokeWidth="1.5"/>
      <path d="M100 124 L104 135 L100 132 L96 135 Z" fill={accent}/>
      <path d="M100 146 L96 135 L100 138 L104 135 Z" fill={`${accent}50`}/>
    </svg>
  );
}

window.OPTRIP_ILLUS = { REGION_ILLUS, IllusCompass };
window.IllusCompass = IllusCompass;
