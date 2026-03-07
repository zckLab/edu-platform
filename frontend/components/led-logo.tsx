export function LedLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LED Logo"
    >
      <rect width="120" height="40" rx="8" fill="#00A859" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        LED
      </text>
    </svg>
  )
}
