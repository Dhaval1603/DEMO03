import React from 'react';
import { ServiceOption } from '../types/requirement';
import { SERVICES } from '../data/consultationData';
import { NavigationControls } from './NavigationControls';
import { Check, Sparkles, Layers, Box, Trees, Building2 } from 'lucide-react';

interface StepServicesProps {
  selectedService: ServiceOption | '';
  onSelectService: (service: ServiceOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepServices: React.FC<StepServicesProps> = ({
  selectedService,
  onSelectService,
  onNext,
  onBack,
}) => {
  const getServiceIcon = (id: ServiceOption, isSelected: boolean) => {
    const iconClass = isSelected ? 'text-[#E22026]' : 'text-[#52525B] group-hover:text-[#111111]';
    switch (id) {
      case 'Architecture':
        return <Building2 className={`w-5 h-5 ${iconClass}`} />;
      case 'Interior Design':
        return <Box className={`w-5 h-5 ${iconClass}`} />;
      case 'Landscape Design':
        return <Trees className={`w-5 h-5 ${iconClass}`} />;
      case 'Complete Design (Architecture + Interior + Landscape)':
        return <Sparkles className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Layers className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 02 • Atelier Scope
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          What would you like us to design?
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Choose a focused discipline or combine services for unified architectural and spatial continuity.
        </p>
      </div>

      {/* Services List / Cards */}
      <div className="flex flex-col gap-3.5 max-w-3xl mx-auto">
        {SERVICES.map((serv) => {
          const isSelected = selectedService === serv.id;
          const isComplete = serv.category === 'complete';

          return (
            <div
              key={serv.id}
              onClick={() => onSelectService(serv.id)}
              id={`service-opt-${serv.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`group relative p-5 sm:p-6 rounded-xl cursor-pointer transition-all duration-200 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isSelected
                  ? 'border-[#E22026] ring-1 ring-[#E22026]/30 bg-[#FFFBFB] shadow-sm'
                  : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-[#E22026]/40 bg-[#FFF0F0]'
                      : 'border-[#E5E7EB] bg-[#F4F4F6] group-hover:border-[#D1D5DB]'
                  }`}
                >
                  {getServiceIcon(serv.id, isSelected)}
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3
                      className={`font-display text-lg sm:text-xl font-semibold transition-colors ${
                        isSelected ? 'text-[#E22026]' : 'text-[#111111] group-hover:text-[#E22026]'
                      }`}
                    >
                      {serv.name}
                    </h3>
                    {serv.badge && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${
                          isComplete
                            ? 'bg-[#E22026]/10 text-[#E22026] border-[#E22026]/25'
                            : 'bg-[#F4F4F6] text-[#52525B] border-[#E5E7EB]'
                        }`}
                      >
                        {serv.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#52525B] mt-1 max-w-xl leading-relaxed">
                    {serv.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {serv.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#F4F4F6] text-[#71717A] border border-[#E5E7EB]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radio/Check selector icon */}
              <div className="self-end sm:self-center shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#E22026] bg-[#E22026] text-white shadow-xs'
                      : 'border-[#D1D5DB] bg-white group-hover:border-[#9CA3AF]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={Boolean(selectedService)}
        validationError={!selectedService ? 'Please select a design discipline to proceed' : null}
      />
    </div>
  );
};
