import React from 'react';
import { CustomerRequirement } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { DynamicQuestionField } from './DynamicQuestionField';
import {
  buildEngineContext,
  getGroupedActiveQuestions,
  syncStructuredRequirement,
} from '../services/questionEngine';
import { Compass, Sparkles } from 'lucide-react';

interface StepArchitectureProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepArchitecture: React.FC<StepArchitectureProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const context = buildEngineContext(data);
  const groupedSections = getGroupedActiveQuestions(context, 'architecture');

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

  // Determine if all required questions in this step are answered
  const requiredQuestions = groupedSections.flatMap((s) => s.questions).filter((q) => q.required);
  const isComplete = requiredQuestions.every((q) => {
    const val = data.rawAnswers?.[q.id];
    return val !== undefined && val !== null && val !== '' && !(Array.isArray(val) && val.length === 0);
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] text-[#E22026] text-[11px] font-mono uppercase tracking-wider mb-2 font-medium">
          <Compass className="w-3.5 h-3.5" />
          <span>Architectural Directorship • {data.projectType || 'Custom Project'}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-1 leading-tight">
          Architectural Scope & Volume
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Tell us about your structural aspirations, spatial scale, and operational requirements. Our
          atelier will engineer the envelope to these parameters.
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
            <p>No specific architectural questions required for this configuration.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <NavigationControls
        onNext={onNext}
        onBack={onBack}
        nextDisabled={!isComplete}
        nextLabel="Continue to Next Step"
      />
    </div>
  );
};
