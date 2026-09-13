const toneMap = {
  timber: { base: "#C9A987", line: "#5E3E27" },
  sage: { base: "#C7D0C4", line: "#4E5A4C" },
  ink: { base: "#B9C2C7", line: "#1E2A32" },
  brass: { base: "#E3D3B2", line: "#7A5E33" },
};

// A quiet, hand-drawn-feeling silhouette standing in for product photography.
// Swap the <img> in ProductCard for a real Cloudinary photo once uploaded.
export default function ProductArt({ tone = "timber", className = "" }) {
  const c = toneMap[tone] || toneMap.timber;
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={c.base} opacity="0.35" />
      <ellipse cx="200" cy="245" rx="140" ry="14" fill={c.line} opacity="0.12" />
      <path
        d="M90 190 Q90 120 200 120 Q310 120 310 190 L310 220 Q310 235 295 235 L280 235 L280 220 L120 220 L120 235 L105 235 Q90 235 90 220 Z"
        fill="none"
        stroke={c.line}
        strokeWidth="3"
        opacity="0.65"
      />
      <line x1="120" y1="220" x2="120" y2="245" stroke={c.line} strokeWidth="3" opacity="0.65" />
      <line x1="280" y1="220" x2="280" y2="245" stroke={c.line} strokeWidth="3" opacity="0.65" />
    </svg>
  );
}
