import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'compact' | 'symbol';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  symbolOnly?: boolean;
}

/**
 * Precision Vector Symbol of M M DESIGN ATELIER
 * Architecturally exact to the studio's geometric drafting logo:
 * - Circumscribed outer circle with dashed left arc
 * - 3x3 grid with architectural hatching in upper-right quadrant
 * - Precise interlocking red angular "M M" motif and triangles
 */
export const LogoSymbol: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
  size,
}) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg
      viewBox="0 0 400 400"
      className={`shrink-0 select-none ${className}`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="M M Design Atelier Architectural Symbol"
    >
      <defs>
        <pattern
          id="symbolDraftHatch"
          width="8"
          height="8"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#8E8E93" strokeWidth="1.2" />
        </pattern>
      </defs>

      {/* Hatched Architectural Quadrant (Row 0 Col 1, Row 0 Col 2, Row 1 Col 2) */}
      <g>
        <rect x="160" y="80" width="80" height="80" fill="#D8D8DC" />
        <rect x="160" y="80" width="80" height="80" fill="url(#symbolDraftHatch)" />
        <rect x="240" y="80" width="80" height="80" fill="#D8D8DC" />
        <rect x="240" y="80" width="80" height="80" fill="url(#symbolDraftHatch)" />
        <rect x="240" y="160" width="80" height="80" fill="#D8D8DC" />
        <rect x="240" y="160" width="80" height="80" fill="url(#symbolDraftHatch)" />
      </g>

      {/* Outer Circumscribed Circle */}
      {/* Left arc (dashed from 225deg to 135deg) */}
      <path
        d="M 80 80 A 169.7056 169.7056 0 0 0 80 320"
        stroke="#111111"
        strokeWidth="4.5"
        strokeDasharray="14 10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Solid main arc */}
      <path
        d="M 80 80 A 169.7056 169.7056 0 1 1 80 320"
        stroke="#111111"
        strokeWidth="4.5"
        fill="none"
      />

      {/* 3x3 Grey Grid */}
      <rect
        x="80"
        y="80"
        width="240"
        height="240"
        fill="none"
        stroke="#B0B0B5"
        strokeWidth="2.5"
      />
      <line x1="160" y1="80" x2="160" y2="320" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="240" y1="80" x2="240" y2="320" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="80" y1="160" x2="320" y2="160" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="80" y1="240" x2="320" y2="240" stroke="#B0B0B5" strokeWidth="2.5" />

      {/* 9 Cell Diagonals */}
      <line x1="80" y1="80" x2="160" y2="160" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="160" y1="80" x2="240" y2="160" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="240" y1="80" x2="320" y2="160" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="80" y1="160" x2="160" y2="240" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="160" y1="160" x2="240" y2="240" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="240" y1="160" x2="320" y2="240" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="80" y1="240" x2="160" y2="320" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="160" y1="240" x2="240" y2="320" stroke="#B0B0B5" strokeWidth="2.5" />
      <line x1="240" y1="240" x2="320" y2="320" stroke="#B0B0B5" strokeWidth="2.5" />

      {/* Bold Architectural Red Motif ("M M" Geometry) */}
      <g stroke="#C8102E" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="80,80 160,80 160,240" fill="none" />
        <polygon points="80,160 160,160 160,240" fill="none" />
        <line x1="160" y1="160" x2="240" y2="160" />
        <line x1="240" y1="160" x2="240" y2="320" />
        <polygon points="160,240 240,240 240,320" fill="none" />
        <line x1="240" y1="240" x2="320" y2="240" />
        <line x1="320" y1="240" x2="320" y2="320" />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  symbolOnly = false,
}) => {
  if (symbolOnly || variant === 'symbol') {
    const symbolSizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-20 h-20',
      xl: 'w-32 h-32',
    };
    return <LogoSymbol className={`${symbolSizes[size]} ${className}`} />;
  }

  // Vertical layout exactly matching Image 3 (Symbol centered on top, typography below)
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Symbol */}
        <LogoSymbol className="w-28 h-28 sm:w-36 sm:h-36 mb-4" />

        {/* Primary Wordmark */}
        <div className="flex items-center justify-center leading-none mt-1">
          <span className="font-['Cinzel',serif] font-bold text-[#C8102E] text-2xl sm:text-3xl tracking-[0.1em] mr-2 sm:mr-2.5">
            M M
          </span>
          <span className="font-['Montserrat',sans-serif] font-bold text-[#111111] text-xl sm:text-2xl tracking-[0.18em]">
            DESIGN ATELIER
          </span>
        </div>

        {/* Subtitle with vertical pipe separators */}
        <div className="font-['Montserrat',sans-serif] font-medium text-[#111111] text-[10px] sm:text-[11.5px] tracking-[0.26em] uppercase mt-2">
          ARCHITECTURE | INTERIOR | LANDSCAPE
        </div>
      </div>
    );
  }

  // Compact horizontal lockup for Header / Navigation
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
        <LogoSymbol className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline leading-none">
            <span className="font-['Cinzel',serif] font-bold text-[#C8102E] text-base sm:text-lg tracking-[0.08em] mr-1.5">
              M M
            </span>
            <span className="font-['Montserrat',sans-serif] font-bold text-[#111111] text-xs sm:text-sm tracking-[0.16em]">
              DESIGN ATELIER
            </span>
          </div>
          <div className="font-['Montserrat',sans-serif] font-medium text-[#111111] text-[7.5px] sm:text-[8.5px] tracking-[0.22em] uppercase mt-1">
            ARCHITECTURE | INTERIOR | LANDSCAPE
          </div>
        </div>
      </div>
    );
  }

  // Standard horizontal lockup (Header large, hero, review dossiers)
  return (
    <div className={`flex items-center gap-3.5 sm:gap-4 select-none ${className}`}>
      <LogoSymbol className="w-11 h-11 sm:w-14 sm:h-14 shrink-0" />
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span className="font-['Cinzel',serif] font-bold text-[#C8102E] text-lg sm:text-2xl tracking-[0.1em] mr-2">
            M M
          </span>
          <span className="font-['Montserrat',sans-serif] font-bold text-[#111111] text-sm sm:text-lg tracking-[0.18em]">
            DESIGN ATELIER
          </span>
        </div>
        <div className="font-['Montserrat',sans-serif] font-medium text-[#111111] text-[8.5px] sm:text-[10.5px] tracking-[0.24em] uppercase mt-1 sm:mt-1.5">
          ARCHITECTURE | INTERIOR | LANDSCAPE
        </div>
      </div>
    </div>
  );
};

export default Logo;
