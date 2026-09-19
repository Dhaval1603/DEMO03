/**
 * Centralized Design Token System for M M DESIGN ATELIER
 * Based on the authoritative logo visual identity:
 * - Primary: Brand Logo Red (#E22026)
 * - Secondary: Deep Architectural Black (#111111)
 * - Supporting: Pure White (#FFFFFF), Architectural Greys (#F4F4F6, #E5E7EB, #D1D5DB, #71717A)
 */

export const BRAND_ASSETS = {
  logoFull: '/assets/mm-design-atelier-logo.svg',
  logoCompact: '/assets/mm-logo-compact.svg',
  logoVertical: '/assets/mm-logo-vertical.svg',
  logoSymbol: '/assets/mm-logo-symbol.svg',
  logoAlt: 'M M DESIGN ATELIER - Architecture | Interior | Landscape',
};

export const BRAND_COLORS = {
  red: '#C8102E',
  redHover: '#A80D26',
  redLight: 'rgba(200, 16, 46, 0.04)',
  redTint: 'rgba(200, 16, 46, 0.08)',
  redBorder: 'rgba(200, 16, 46, 0.35)',
  black: '#111111',
  blackSoft: '#1C1C1E',
  greyDark: '#3F3F46',
  greyMedium: '#71717A',
  greyBorder: '#E5E7EB',
  greyBorderLight: '#F0F1F3',
  greySubtle: '#F4F4F6',
  white: '#FFFFFF',
  bgBase: '#FAFAFB',
};

export const BRAND_UI = {
  // Buttons
  btnPrimary:
    'bg-[#E22026] text-white hover:bg-[#C81A20] active:scale-[0.99] transition-all font-medium rounded-lg text-sm px-6 py-3.5 tracking-wide shadow-sm flex items-center justify-center gap-2 cursor-pointer',
  btnSecondary:
    'bg-white text-[#111111] hover:bg-[#F4F4F6] border border-[#D1D5DB] hover:border-[#111111] active:scale-[0.99] transition-all font-medium rounded-lg text-sm px-5 py-3 tracking-wide flex items-center justify-center gap-2 cursor-pointer',
  btnBack:
    'text-[#52525B] hover:text-[#111111] bg-white hover:bg-[#F4F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all rounded-lg text-sm font-medium px-5 py-3 flex items-center justify-center gap-2 cursor-pointer',

  // Cards
  cardBase:
    'bg-white border border-[#E5E7EB] hover:border-[#A1A1AA] rounded-xl transition-all duration-200 shadow-sm',
  cardSelected:
    'bg-[#FFFBFB] border-[#E22026] ring-1 ring-[#E22026]/25 rounded-xl transition-all duration-200 shadow-sm',

  // Form inputs
  inputField:
    'w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors',
  inputError:
    'border-[#E22026] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]',

  // Selection Checkmark Badge
  badgeSelected:
    'w-5 h-5 rounded-full bg-[#E22026] text-white flex items-center justify-center shrink-0 shadow-sm',
  badgeUnselected:
    'w-5 h-5 rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center shrink-0',

  // Typography
  displayTitle:
    'font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] tracking-tight leading-[1.12]',
  sectionHeading:
    'font-display text-xl sm:text-2xl font-medium text-[#111111] tracking-tight',
  subheading:
    'text-sm text-[#52525B] leading-relaxed max-w-xl',
  stepEyebrow:
    'text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold',
};
