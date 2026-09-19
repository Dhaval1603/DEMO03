import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { DynamicQuestionField } from './DynamicQuestionField';
import {
  buildEngineContext,
  getGroupedActiveQuestions,
  syncStructuredRequirement,
} from '../services/questionEngine';
import { Trees, Sparkles } from 'lucide-react';

interface StepLandscapeProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepLandscape: React.FC<StepLandscapeProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const context = buildEngineContext(data);
  const groupedSections = getGroupedActiveQuestions(context, 'landscape');

  const handleAnswerChange = (questionId: string, value: any) => {
    const updatedAnswers = {
      ...(data.rawAnswers || {}),
      [questionId]: value,
    };
    const updatedReq: CustomerRequirement = {
      ...data,
      rawAnswers: updatedAnswers,
    };
    const synced = syncStructuredRequirement(updatedReq);
    onUpdate(synced);
  };

  const areasAnswer = data.rawAnswers?.land_areas;
  const hasSelectedAreas = Array.isArray(areasAnswer) && areasAnswer.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] text-[#E22026] text-[11px] font-mono uppercase tracking-wider mb-2 font-medium">
          <Trees className="w-3.5 h-3.5" />
          <span>Landscape Ecology & Flora • {data.projectType || 'Custom Project'}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-1 leading-tight">
          Landscape Realms & Outdoor Living
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Define the outdoor zones, water architecture, biophilic planting, and entertaining terraces
          that frame your building.
        </p>
      </div>

      {/* Sections and Questions */}
      <div className="space-y-8">
        {groupedSections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E22026]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-[#111111] font-semibold">
                {section.title}
              </h3>
            </div>

            <div className="space-y-4">
              {section.questions.map((q) => (
                <DynamicQuestionField
                  key={q.id}
                  question={q}
                  value={data.rawAnswers?.[q.id]}
                  onChange={(val) => handleAnswerChange(q.id, val)}
                  allAnswers={data.rawAnswers}
                />
              ))}
            </div>
          </div>
        ))}

        {groupedSections.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-[#E5E7EB] text-[#71717A] text-sm">
            <Sparkles className="w-8 h-8 text-[#E22026] mx-auto mb-2 opacity-50" />
            <p>No specific landscape questions configured for this selection.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <NavigationControls
        onNext={onNext}
        onBack={onBack}
        nextDisabled={!hasSelectedAreas}
        nextLabel="Continue to Atmosphere"
      />
    </div>
  );
};
