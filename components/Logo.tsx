export default function Logo({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Thought bubble that keeps intruding into the frame */}
      <circle cx="12" cy="28" r="3" fill="var(--color-accent, #4ade80)" opacity="0.4"/>
      <circle cx="19" cy="22" r="4.5" fill="var(--color-accent, #4ade80)" opacity="0.6"/>
      <circle cx="28" cy="14" r="7" fill="none" stroke="var(--color-accent, #4ade80)" strokeWidth="2" opacity="0.9"/>
      <text x="28" y="18" textAnchor="middle" fontSize="8" fill="var(--color-accent, #4ade80)" fontWeight="900">?</text>
    </svg>
  )
}
