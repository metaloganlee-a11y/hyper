import React from 'react';

export function LogoSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 62 62" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hyper-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6EE7F9" />
          <stop offset="1" stopColor="#635BFF" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="54" height="54" rx="16" fill="url(#hyper-gradient)" />
      <g stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round">
        <line x1="20" y1="22" x2="42" y2="22" />
        <line x1="20" y1="40" x2="42" y2="40" />
      </g>
      <g fill="#ffffff">
        <circle cx="20" cy="22" r="5.5" />
        <circle cx="42" cy="40" r="5.5" />
      </g>
    </svg>
  );
}

export function LogoText({ className = "", light = false }: { className?: string, light?: boolean }) {
  return (
    <span className={`font-['Sora',_sans-serif] tracking-tight font-bold ${className}`}>
      <span style={{ color: light ? '#FFFFFF' : '#0A2540' }}>hyper</span>
      <span style={{ color: light ? '#94a3b8' : '#7A9CC6', fontWeight: 400 }}>network</span>
    </span>
  );
}
