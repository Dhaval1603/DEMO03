import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { DynamicQuestionField } from './DynamicQuestionField';
import {
  buildEngineContext,
  getGroupedActiveQuestions,
  syncStructuredRequirement,
} from '../services/questionEngine';
import { LayoutGrid, Sparkles, Layers } from 'lucide-react';

interface StepInteriorProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepInterior: React.FC<StepInteriorProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const context = buildEngineContext(data);
  const groupedSections = getGroupedActiveQuestions(context, 'interior');

  const handleAnswerChange = (questionId: string, value: any) => {
    const updatedAnswers = {
      ...(data.rawAnswers || {}),
      [questionId]: value,
    };

    // If spaces selector changed, also sync selectedSpaces array
    let updatedSelectedSpaces = data.selectedSpaces || {};
    if (questionId === 'int_spaces_selector') {
      const spacesArr: string[] = Array.isArray(value) ? value : [];
      updatedSelectedSpaces = {
        'Selected Spaces': spacesArr,
      };
    }

    const updatedReq: CustomerRequirement = {
      ...data,
      rawAnswers: updatedAnswers,
      selectedSpaces: updatedSelectedSpaces,
    };

    const synced = syncStructuredRequirement(updatedReq);
    onUpdate(synced);
  };

  // Check if primary spaces question is answered
  const spacesAnswer = data.rawAnswers?.int_spaces_selector;
  const hasSelectedSpaces =
    Array.isArray(spacesAnswer) && spacesAnswer.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] text-[#E22026] text-[11px] font-mono uppercase tracking-wider mb-2 font-medium">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Interior Architecture & Joinery • {data.projectType || 'Custom Project'}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-1 leading-tight">
          Interior Spaces & Specifications
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Select the spaces you would like us to curate. Detailed questions adapt automatically
          to your exact rooms.
        </p>
      </div>

      {/* Sections and Questions */}
      <div className="space-y-8">
        {groupedSections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E22026]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-[#111111] font-semibold">
                  {section.title}
                </h3>
              </div>
              {section.id.includes('details') && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] px-2 py-0.5 rounded bg-neutral-100">
                  Adaptive Details
                </span>
              )}
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

        {!hasSelectedSpaces && (
          <div className="p-6 text-center bg-[#F9FAFB] rounded-xl border border-dashed border-[#D1D5DB] text-[#71717A] text-xs">
            <Layers className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
            <p>Select one or more interior spaces above to unlock space-specific architectural joinery questions.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <NavigationControls
        onNext={onNext}
        onBack={onBack}
        nextDisabled={!hasSelectedSpaces}
        nextLabel="Continue to Atmosphere"
      />
    </div>
  );
};
