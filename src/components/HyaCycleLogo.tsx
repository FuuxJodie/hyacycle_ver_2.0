import React from 'react';

interface HyaCycleLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  variant?: 'light' | 'dark' | 'emerald';
}

export const HyaCycleLogo: React.FC<HyaCycleLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'SUSTAINABLE MOVEMENT',
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px] tracking-[0.2em]' },
    md: { icon: 'w-8 h-8', text: 'text-2xl', sub: 'text-[10px] tracking-[0.24em]' },
    lg: { icon: 'w-11 h-11', text: 'text-3xl', sub: 'text-xs tracking-[0.28em]' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Botanical Water Cycle Leaf Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.icon}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
        >
          {/* Circular water ripple / cycle ring */}
          <circle
            cx="32"
            cy="32"
            r="27"
            stroke="url(#cycleGrad)"
            strokeWidth="3.5"
            strokeDasharray="140 30"
            strokeLinecap="round"
            className="opacity-85"
          />
          {/* Secondary inward loop */}
          <path
            d="M17 38C17 28 26 18 36 21C42 22.8 45 27 43 33C41 39 33 41 29 44"
            stroke="url(#cycleGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-50"
          />
          {/* Water hyacinth leaf bud sprout */}
          <path
            d="M32 14C32 14 39 20 38 29C37 36 30 40 25 41C22 41.5 24 35 27 30C30 25 32 14 32 14Z"
            fill="url(#leafGrad)"
          />
          {/* Water droplet / stem node */}
          <path
            d="M36 24C36 24 43 27 43 32C43 36 39 39 35 38C34 35 37 32 37 28C37 25 36 24 36 24Z"
            fill="#34D399"
          />
          <circle cx="32" cy="46" r="2.5" fill="#10B981" />

          <defs>
            <linearGradient id="cycleGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="0.5" stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="24" y1="14" x2="38" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.7" stopColor="#059669" />
              <stop offset="1" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight font-sans ${sizeClasses.text} ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <span className="text-emerald-400">hya</span>
          <span className={isLight ? 'text-slate-800' : 'text-slate-100'}>cycle</span>
        </span>
        {showSubtitle && (
          <span
            className={`font-mono font-semibold uppercase mt-0.5 ${sizeClasses.sub} ${
              isLight ? 'text-emerald-700' : 'text-emerald-400/90'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
