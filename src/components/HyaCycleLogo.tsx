import React from 'react';

interface HyaCycleLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  isDark?: boolean;
}

export const HyaCycleLogo: React.FC<HyaCycleLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'SUSTAINABLE MOVEMENT',
  isDark = false,
}) => {
  // Teal color matching the attached Logo HyaCycle.png (#38b8a6 / #3dbb9f / rgb(56, 184, 166))
  const tealColor = isDark ? '#4ade80' : '#38b8a6';

  const sizeClasses = {
    sm: { width: 140, height: 42, className: 'h-8' },
    md: { width: 180, height: 54, className: 'h-10' },
    lg: { width: 240, height: 72, className: 'h-14' },
    xl: { width: 320, height: 96, className: 'h-20' },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses.className} w-auto`}
        style={{ color: '#38b8a6' }}
      >
        {/* Letter 'h' */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 18,12 L 18,65" />
          <path d="M 18,36 C 24,24 45,24 45,40 L 45,65" />
        </g>

        {/* Letter 'y' (first y) */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 59,28 L 74,60" />
          <path d="M 89,28 L 68,76" />
        </g>

        {/* Letter 'a' */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Circular bowl */}
          <circle cx="116" cy="46" r="18" />
          {/* Right vertical stem */}
          <path d="M 134,30 L 134,65" />
        </g>

        {/* Letter 'c' (first c) */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" fill="none">
          <path d="M 175,34 C 170,27 159,26 153,32 C 144,40 144,53 153,60 C 160,66 171,65 175,59" />
        </g>

        {/* Letter 'y' (second y with the iconic curved leaf loop descender & leaf sprout) */}
        <g fill="none">
          {/* Upper left arm of y */}
          <path
            d="M 187,28 L 202,52"
            stroke="#38b8a6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Upper right arm of y going down into the stem */}
          <path
            d="M 217,28 L 202,52"
            stroke="#38b8a6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Main stem curving down and forming the circular loop to the left */}
          <path
            d="M 202,50 C 202,64 195,78 184,84 C 175,89 164,83 166,73 C 167,65 178,61 187,69"
            stroke="#38b8a6"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* Botanical leaf sprout emerging from the right of the stem */}
          <path
            d="M 204,64 C 208,60 216,56 226,58 C 228,62 227,70 220,74 C 213,76 206,71 204,64 Z"
            fill="none"
            stroke="#38b8a6"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Center delicate leaf vein */}
          <path
            d="M 206,66 L 223,65"
            stroke="#38b8a6"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Letter 'c' (second c) */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" fill="none">
          <path d="M 264,34 C 259,27 248,26 242,32 C 233,40 233,53 242,60 C 249,66 260,65 264,59" />
        </g>

        {/* Letter 'l' */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" fill="none">
          <path d="M 279,12 L 279,65" />
        </g>

        {/* Letter 'e' */}
        <g stroke="#38b8a6" strokeWidth="8" strokeLinecap="round" fill="none">
          {/* Crossbar */}
          <path d="M 296,46 L 328,46" />
          {/* Top curve and bottom arc */}
          <path d="M 328,46 C 328,34 319,27 308,27 C 297,27 291,37 291,48 C 291,58 299,66 311,66 C 322,66 326,60 328,57" />
        </g>

        {/* Subtitle: "SUSTAINABLE MOVEMENT" */}
        {showSubtitle && (
          <text
            x="170"
            y="96"
            textAnchor="middle"
            fill="#38b8a6"
            fontSize="14.5"
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="0.48em"
          >
            {subtitleText}
          </text>
        )}
      </svg>
    </div>
  );
};
