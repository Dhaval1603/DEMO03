import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { ATMOSPHERE_OPTIONS } from '../data/consultationData';
import { NavigationControls } from './NavigationControls';
import { Check, Compass } from 'lucide-react';

interface StepPreferencesProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const currentStyles: string[] = Array.isArray(data.designPreferences)
    ? (data.designPreferences as unknown as string[])
    : data.designPreferences?.styles || data.designPreferencesList || [];

  const isNotSureSelected = currentStyles.includes('Not Sure');

  const togglePreference = (styleName: string) => {
    let updated: string[];

    if (styleName === 'Not Sure') {
      // If "Not sure" selected, clear others or toggle it
      updated = isNotSureSelected ? [] : ['Not Sure'];
    } else {
      // If selecting a regular style, remove "Not sure"
      const withoutNotSure = currentStyles.filter((p) => p !== 'Not Sure');
      if (withoutNotSure.includes(styleName)) {
        updated = withoutNotSure.filter((p) => p !== styleName);
      } else {
        updated = [...withoutNotSure, styleName];
      }
    }

    onUpdate({
      designPreferencesList: updated,
      designPreferences: {
        styles: updated,
        needsGuidance: updated.includes('Not Sure'),
        rawAnswers: data.rawAnswers || {},
      },
    });
  };

  const canProceed = currentStyles.length > 0;

  // Filter regular style options (leaving the guidance card as top showcase)
  const regularOptions = ATMOSPHERE_OPTIONS.filter((opt) => !opt.isGuidance);

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 05 • Spatial Mood & Aesthetics
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          What atmosphere resonates with you?
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Select one or more visual atmospheres that capture the sensation of light, texture, and materiality you desire.
        </p>
      </div>

      {/* Dignified "I'm Not Sure — Need Studio Guidance" Card */}
      <div className="mb-6 max-w-4xl mx-auto">
        <div
          onClick={() => togglePreference('Not Sure')}
          id="pref-not-sure-guidance"
          className={`p-4 sm:p-5 rounded-xl border cursor-pointer select-none transition-all duration-200 flex items-center justify-between gap-4 ${
            isNotSureSelected
              ? 'border-[#E22026] ring-1 ring-[#E22026]/30 bg-[#FFFBFB] shadow-sm'
              : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:bg-[#FAFAFB]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                isNotSureSelected
                  ? 'bg-[#E22026] text-white'
                  : 'bg-[#F4F4F6] text-[#71717A] border border-[#E5E7EB]'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm sm:text-base font-semibold text-[#111111]">
                  I'm not sure yet — I would like studio guidance
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4F4F6] text-[#71717A] border border-[#E5E7EB] hidden sm:inline">
                  Atelier Recommendation
                </span>
              </div>
              <p className="text-xs text-[#52525B] mt-0.5">
                Our principal architects will assess your site orientation, natural light, and lifestyle to curate bespoke moodboards for you.
              </p>
            </div>
          </div>

          <div
            className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
              isNotSureSelected
                ? 'border-[#E22026] bg-[#E22026] text-white shadow-xs'
                : 'border-[#D1D5DB] bg-white'
            }`}
          >
            {isNotSureSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </div>
        </div>
      </div>

      {/* Grid of Atmosphere cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {regularOptions.map((style) => {
          const isSelected = currentStyles.includes(style.name);

          return (
            <div
              key={style.id}
              onClick={() => togglePreference(style.name)}
              id={`style-opt-${style.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? 'border-[#E22026] ring-1 ring-[#E22026]/35 bg-[#FFFBFB] shadow-md'
                  : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4] hover:shadow-sm'
              }`}
            >
              {/* Photo */}
              <div className="relative h-44 w-full overflow-hidden bg-[#F4F4F6]">
                <img
                  src={style.moodImage}
                  alt={style.name}
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

              {/* Text info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`font-display text-base font-semibold transition-colors ${
                      isSelected ? 'text-[#E22026]' : 'text-[#111111] group-hover:text-[#E22026]'
                    }`}
                  >
                    {style.name}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                    {style.descriptor}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {style.palette.split(', ').slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#F4F4F6] text-[#71717A] border border-[#E5E7EB]"
                    >
                      {item}
                    </span>
                  ))}
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
        canNext={canProceed}
        validationError={
          !canProceed
            ? 'Please choose at least one atmosphere or select "I would like studio guidance"'
            : null
        }
      />
    </div>
  );
};
