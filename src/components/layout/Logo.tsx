import { Link } from "react-router-dom";

export function LogoMark({ className = "brand__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b1ff" />
          <stop offset="0.55" stopColor="#7c8cff" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#tg)" />
      <path d="M9 10.5h14M16 10.5V23" stroke="#0a0c18" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22.5" cy="21.5" r="2.3" fill="#0a0c18" />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="brand" aria-label="TechOdos home" onClick={onClick}>
      <LogoMark />
      <span>TechOdos</span>
    </Link>
  );
}
