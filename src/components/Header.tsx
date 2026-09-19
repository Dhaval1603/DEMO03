import React from 'react';
import { QrCode, RotateCcw } from 'lucide-react';
import { ConsultationStep } from '../types/requirement';
import { Logo } from './Logo';

interface HeaderProps {
  currentStep: ConsultationStep;
  onOpenQR: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onOpenQR, onReset }) => {
  const isWelcome = currentStep === 'welcome';
  const isSuccess = currentStep === 'success';

  return (
    <header className="w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand identity: authoritative M M DESIGN ATELIER logo asset */}
        <div
          onClick={onReset}
          className={`flex items-center gap-3 select-none ${
            onReset && !isWelcome ? 'cursor-pointer group' : ''
          }`}
          title={onReset && !isWelcome ? 'Return to consultation welcome' : undefined}
        >
          {/* Exact Logo Lockup with authoritative fonts */}
          <div className="hidden sm:block">
            <Logo variant="horizontal" className="group-hover:opacity-90 transition-opacity" />
          </div>
          <div className="block sm:hidden">
            <Logo variant="compact" className="group-hover:opacity-90 transition-opacity" />
          </div>
        </div>

        {/* Right actions: Studio QR Portal & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenQR}
            id="open-studio-qr-button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#111111] bg-white border border-[#E5E7EB] hover:border-[#A1A1AA] hover:bg-[#F4F4F6] transition-all shadow-xs"
            title="Open Studio Reception QR Code for client phones"
          >
            <QrCode className="w-3.5 h-3.5 text-[#E22026]" />
            <span className="hidden sm:inline">Studio QR</span>
          </button>

          {!isWelcome && !isSuccess && onReset && (
            <button
              type="button"
              onClick={onReset}
              id="header-restart-btn"
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#71717A] hover:text-[#111111] hover:bg-[#F4F4F6] transition-colors"
              title="Start a new brief"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {!isWelcome && !isSuccess && (
            <div className="text-[11px] uppercase tracking-wider text-[#71717A] px-2.5 py-1 rounded bg-[#F4F4F6] border border-[#E5E7EB] font-mono font-medium">
              Brief In Progress
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
