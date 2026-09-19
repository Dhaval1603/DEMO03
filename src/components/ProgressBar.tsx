import React from 'react';
import { ConsultationStep } from '../types/requirement';

interface ProgressBarProps {
  currentStep: ConsultationStep;
  activeSteps?: ConsultationStep[];
}

const STEP_TITLES: Record<ConsultationStep, string> = {
  welcome: 'Welcome',
  projectType: 'Typology',
  service: 'Discipline',
  basicDetails: 'Site & Contact',
  architecture: 'Architecture',
  interior: 'Interior Spaces',
  landscape: 'Landscape',
  spaces: 'Spaces',
  preferences: 'Atmosphere',
  details: 'Aspirations',
  budgetTimeline: 'Investment',
  uploads: 'Drawings & Files',
  summary: 'Dossier Review',
  success: 'Confirmed',
};

const DEFAULT_STEPS: ConsultationStep[] = [
  'projectType',
  'service',
  'basicDetails',
  'architecture',
  'interior',
  'landscape',
  'preferences',
  'details',
  'budgetTimeline',
  'uploads',
  'summary',
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  activeSteps = DEFAULT_STEPS,
}) => {
  if (currentStep === 'welcome' || currentStep === 'success') {
    return null;
  }

  // Filter out welcome and success from progress measurement
  const navigableSteps = activeSteps.filter((s) => s !== 'welcome' && s !== 'success');
  const currentIndex = navigableSteps.indexOf(currentStep);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const totalSteps = navigableSteps.length;
  const progressPercent = Math.round(((safeIndex + 1) / totalSteps) * 100);

  const stepTitle = STEP_TITLES[currentStep] || 'Consultation';
  const stepNumber = safeIndex + 1;

  // High-level journey milestones
  const getMilestonePhase = (step: ConsultationStep): string => {
    switch (step) {
      case 'projectType':
      case 'service':
        return 'Project Typology & Disciplines';
      case 'basicDetails':
        return 'Site Scale & Client Profile';
      case 'architecture':
      case 'interior':
      case 'landscape':
      case 'spaces':
        return 'Design Requirements & Spaces';
      case 'preferences':
      case 'details':
        return 'Atmosphere & Aspirations';
      case 'budgetTimeline':
      case 'uploads':
        return 'Investment & Drawings';
      case 'summary':
        return 'Dossier Review & Submission';
      default:
        return 'Design Consultation';
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-2.5 select-none transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-1.5">
        {/* Step Header info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#E22026] tracking-wider font-bold">
              {String(stepNumber).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
            <span className="text-[#D1D5DB]">|</span>
            <span className="text-[#111111] font-semibold tracking-wide uppercase text-[11px]">
              {stepTitle}
            </span>
            <span className="hidden md:inline-block text-[#9CA3AF] text-[11px] font-normal">
              • {getMilestonePhase(currentStep)}
            </span>
          </div>
          <span className="text-[#71717A] text-[11px] font-mono font-medium">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Step Micro-Segments: Dynamic bar matching exact active step count */}
        <div
          className="grid gap-1.5 w-full"
          style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
        >
          {navigableSteps.map((stepItem, idx) => {
            const isCompleted = idx < safeIndex;
            const isCurrent = idx === safeIndex;

            return (
              <div
                key={stepItem}
                className={`h-1 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#E22026]'
                    : isCompleted
                    ? 'bg-[#111111]'
                    : 'bg-[#E5E7EB]'
                }`}
                title={`Step ${idx + 1}: ${STEP_TITLES[stepItem]}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
