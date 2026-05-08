// OpTrip — logo wordmark
// Bold "OpTrip" with a coral map-pin replacing the dot on the "i"
// Sizes: pass `height` (px). Width auto-scales.

function OpTripLogo({ height = 32, color = '#111111', pinColor = '#F26B5E', dark = false }) {
  // Source viewBox 220 × 80 — text + pin baseline aligned
  const wordColor = dark ? '#fff' : color;
  return (
    <svg viewBox="0 0 220 80" height={height} style={{ display: 'block', height, width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <text
        x="0" y="64"
        fontFamily="Inter, -apple-system, system-ui, sans-serif"
        fontWeight="900"
        fontSize="68"
        letterSpacing="-3"
        fill={wordColor}
      >OpTr</text>
      {/* "i" body */}
      <rect x="148" y="34" width="11" height="32" rx="1" fill={wordColor} />
      <text
        x="159" y="64"
        fontFamily="Inter, -apple-system, system-ui, sans-serif"
        fontWeight="900"
        fontSize="68"
        letterSpacing="-3"
        fill={wordColor}
      >p</text>
      {/* Map pin replacing the dot of "i" */}
      <g transform="translate(140, 0)">
        <path
          d="M14 0 C21.7 0 28 6.1 28 13.6 C28 23.5 14 32 14 32 C14 32 0 23.5 0 13.6 C0 6.1 6.3 0 14 0 Z"
          fill={pinColor}
        />
        <circle cx="14" cy="13.6" r="5" fill="#fff" />
      </g>
    </svg>
  );
}

window.OpTripLogo = OpTripLogo;
