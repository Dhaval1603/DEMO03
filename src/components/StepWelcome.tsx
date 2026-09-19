import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { Logo } from './Logo';

interface StepWelcomeProps {
  onStart: () => void;
  hasDraft: boolean;
  onResumeDraft?: () => void;
  onDiscardDraft?: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({
  onStart,
  hasDraft,
  onResumeDraft,
  onDiscardDraft,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 px-4 sm:px-6 flex flex-col items-center text-center animate-fade-in">
      {/* Authoritative Studio Logo Asset (Image 3 Vertical Lockup) */}
      <div className="mb-8 p-6 sm:p-8 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs inline-flex flex-col items-center">
        <Logo variant="vertical" />
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4F4F6] border border-[#E5E7EB] text-[#71717A] text-[11px] uppercase tracking-[0.25em] mb-4 font-mono font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#E22026]" />
        <span>Client Consultation Portal</span>
      </div>

      {/* Main Headline & Supporting Text */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] tracking-tight leading-[1.08] max-w-3xl">
        Let's understand your project.
      </h1>

      <p className="mt-4 text-base sm:text-lg text-[#52525B] max-w-xl font-normal leading-relaxed">
        Tell us about your vision, your space, and what you would like to create.
      </p>

      {/* Draft Notification if previously saved */}
      {hasDraft && (
        <div className="mt-8 p-4 rounded-xl border border-[#E5E7EB] bg-white shadow-xs max-w-lg w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-left animate-fade-in">
          <div>
            <div className="text-xs font-semibold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E22026]" />
              <span>Continue your requirement</span>
            </div>
            <p className="text-xs text-[#71717A] mt-0.5">
              An in-progress requirement was saved from your previous session.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onResumeDraft}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#E22026] text-white text-xs font-semibold rounded-lg hover:bg-[#C81A20] transition-colors cursor-pointer"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={onDiscardDraft}
              className="px-3 py-2 text-xs font-medium text-[#71717A] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Start New Requirement
            </button>
          </div>
        </div>
      )}

      {/* Primary CTA with Brand Red */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button
          type="button"
          onClick={onStart}
          id="start-project-button"
          className="w-full sm:w-auto min-w-[260px] px-8 py-4 rounded-lg bg-[#E22026] hover:bg-[#C81A20] text-white font-semibold text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-3 transition-all duration-200 shadow-sm active:scale-[0.99] cursor-pointer"
        >
          <span>Start Your Project</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Architectural Studio Pillars */}
      <div className="mt-16 pt-10 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl text-left">
        <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026] mb-3">
            <Building2 className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-display text-[#111111] font-semibold tracking-wide">
            3 Disciplines
          </h4>
          <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
            Architecture, interior design, and landscape masterplanning united under one singular atelier vision.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026] mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-display text-[#111111] font-semibold tracking-wide">
            3–4 Minutes
          </h4>
          <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
            A visual, thoughtful consultation brief that captures your aspirations without unnecessary complexity.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026] mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-display text-[#111111] font-semibold tracking-wide">
            Confidential
          </h4>
          <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
            Your spatial concepts, site specifics, and investment ranges remain strictly confidential to our partners.
          </p>
        </div>
      </div>
    </div>
  );
};
