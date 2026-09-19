import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../data/consultationData';
import { NavigationControls } from './NavigationControls';
import { IndianRupee, Calendar, Check } from 'lucide-react';

interface StepBudgetTimelineProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepBudgetTimeline: React.FC<StepBudgetTimelineProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const canProceed = Boolean(data.budget && data.timeline);

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 07 • Financial & Temporal Horizon
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Budget & Timeline
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Indicative parameters guide our specification of structural systems, finishes, and project phasing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Budget Section */}
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E7EB] mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026]">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-lg text-[#111111] font-semibold">
                  Envisioned Budget Range
                </h3>
                <p className="text-xs text-[#71717A]">
                  Overall investment for design, materials & execution
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {BUDGET_OPTIONS.map((item) => {
                const isSelected = data.budget === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onUpdate({ budget: item.id })}
                    id={`budget-${item.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#E22026] bg-[#FFFBFB] ring-1 ring-[#E22026]/30 shadow-xs'
                        : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:bg-[#FAFAFB]'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-[#E22026]' : 'text-[#111111]'
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#71717A] mt-0.5">{item.subtitle}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-[#E22026] bg-[#E22026] text-white shadow-xs'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E7EB] mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-lg text-[#111111] font-semibold">
                  Target Commencement Timeline
                </h3>
                <p className="text-xs text-[#71717A]">
                  When would you like the atelier to initiate design concepts?
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {TIMELINE_OPTIONS.map((item) => {
                const isSelected = data.timeline === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onUpdate({ timeline: item.id })}
                    id={`timeline-${item.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#E22026] bg-[#FFFBFB] ring-1 ring-[#E22026]/30 shadow-xs'
                        : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:bg-[#FAFAFB]'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-[#E22026]' : 'text-[#111111]'
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#71717A] mt-0.5">{item.subtitle}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-[#E22026] bg-[#E22026] text-white shadow-xs'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={canProceed}
        validationError={
          !data.budget
            ? 'Please select a budget range (or "Prefer to discuss in studio")'
            : !data.timeline
            ? 'Please select your target timeline'
            : null
        }
      />
    </div>
  );
};
