import React from 'react';
import { ProjectType } from '../types/requirement';
import { PROJECT_TYPES } from '../data/consultationData';
import { NavigationControls } from './NavigationControls';
import { Check } from 'lucide-react';

interface StepProjectTypeProps {
  selectedType: ProjectType | '';
  customType: string;
  onSelectType: (type: ProjectType) => void;
  onChangeCustomType: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepProjectType: React.FC<StepProjectTypeProps> = ({
  selectedType,
  customType,
  onSelectType,
  onChangeCustomType,
  onNext,
  onBack,
}) => {
  const canProceed = Boolean(
    selectedType && (selectedType !== 'Other' || customType.trim().length > 0)
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 01 • Typology
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          What are you planning to create?
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Select the architectural category that most accurately describes your envisioned development.
        </p>
      </div>

      {/* Grid of large visual cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {PROJECT_TYPES.map((type) => {
          const isSelected = selectedType === type.id;

          return (
            <div
              key={type.id}
              onClick={() => onSelectType(type.id)}
              id={`project-type-${type.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? 'border-[#E22026] ring-1 ring-[#E22026]/35 bg-[#FFFBFB] shadow-md'
                  : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:shadow-sm'
              }`}
            >
              {/* Image banner */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-[#F4F4F6]">
                <img
                  src={type.imageUrl}
                  alt={type.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Selected Indicator badge */}
                <div
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#E22026] text-white shadow-sm'
                      : 'bg-white/80 backdrop-blur-xs border border-white/60 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`font-display text-lg font-semibold tracking-tight transition-colors ${
                      isSelected ? 'text-[#E22026]' : 'text-[#111111] group-hover:text-[#E22026]'
                    }`}
                  >
                    {type.title}
                  </h3>
                  <p className="text-xs text-[#71717A] font-medium tracking-wide mt-0.5">
                    {type.subtitle}
                  </p>
                  <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom project type input if "Other" is chosen */}
      {selectedType === 'Other' && (
        <div className="mt-6 p-5 sm:p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-sm max-w-xl mx-auto animate-fade-in">
          <label
            htmlFor="custom-project-type"
            className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            Please specify your bespoke project typology:
          </label>
          <input
            id="custom-project-type"
            type="text"
            value={customType}
            onChange={(e) => onChangeCustomType(e.target.value)}
            placeholder="e.g., Heritage Restoration, Art Pavilion, Eco-Retreat..."
            className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors"
          />
        </div>
      )}

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={canProceed}
        validationError={
          !selectedType
            ? 'Please select a project typology to proceed'
            : selectedType === 'Other' && !customType.trim()
            ? 'Please describe your bespoke project type'
            : null
        }
      />
    </div>
  );
};
