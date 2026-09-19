import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { MessageSquare, Lightbulb } from 'lucide-react';

interface StepRequirementDetailsProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

const INSPIRATION_TAGS = [
  'Abundant Natural Daylighting',
  'Maximizing Concealed Storage',
  'Double-Height Living Volume',
  'Low-Maintenance Sustainable Materials',
  'Vastu / Spatial Orientation Considerations',
  'Seamless Indoor-Outdoor Living',
  'Acoustic Privacy for Home Office',
  'Smart Home Automation & Discreet Lighting',
  'Elderly & Multi-generational Friendly',
  'Pet-Friendly Flooring & Finishes',
];

export const StepRequirementDetails: React.FC<StepRequirementDetailsProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const handleTagClick = (tag: string) => {
    const current = data.additionalRequirements.trim();
    if (!current) {
      onUpdate({ additionalRequirements: tag });
    } else if (!current.includes(tag)) {
      onUpdate({ additionalRequirements: `${current}, ${tag}` });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 06 • Client Aspirations
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Tell us anything else you would like us to know.
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Share your lifestyle nuances, specific architectural must-haves, or ideas that define how you experience your space.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#111111] font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-[#E22026]" />
            <span>Consultation Notes</span>
          </div>
          <span className="text-[11px] text-[#71717A] font-mono">Optional</span>
        </div>

        {/* Text Area */}
        <textarea
          rows={6}
          value={data.additionalRequirements}
          onChange={(e) => onUpdate({ additionalRequirements: e.target.value })}
          placeholder="Example: I want generous concealed storage, dramatic natural daylighting, high ceilings, low-maintenance finishes, and a serene atmosphere suited for private evening hosting..."
          className="w-full p-4 bg-white border border-[#D1D5DB] rounded-xl text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors leading-relaxed resize-y min-h-[160px]"
        />

        {/* Quick Inspiration Tags */}
        <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 text-xs text-[#52525B] font-medium mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-[#E22026]" />
            <span>Tap any priority to append to your notes:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INSPIRATION_TAGS.map((tag) => {
              const isIncluded = data.additionalRequirements.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isIncluded
                      ? 'bg-[#FFF0F0] text-[#E22026] border-[#E22026]/50 font-medium'
                      : 'bg-[#F4F4F6] text-[#52525B] border-[#E5E7EB] hover:border-[#D1D5DB] hover:text-[#111111]'
                  }`}
                >
                  + {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={true}
        nextLabel="Continue to Budget"
      />
    </div>
  );
};
