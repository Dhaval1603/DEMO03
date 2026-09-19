import React, { useState, useEffect } from 'react';
import { CustomerRequirement, ConsultationStep, ProjectType, ServiceOption } from './types/requirement';
import { storageService, INITIAL_REQUIREMENT } from './services/storageService';
import {
  getDynamicConsultationSteps,
  handleBranchReset,
  syncStructuredRequirement,
} from './services/questionEngine';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { StudioQRModal } from './components/StudioQRModal';
import { StepWelcome } from './components/StepWelcome';
import { StepProjectType } from './components/StepProjectType';
import { StepServices } from './components/StepServices';
import { StepBasicDetails } from './components/StepBasicDetails';
import { StepArchitecture } from './components/StepArchitecture';
import { StepInterior } from './components/StepInterior';
import { StepLandscape } from './components/StepLandscape';
import { StepPreferences } from './components/StepPreferences';
import { StepRequirementDetails } from './components/StepRequirementDetails';
import { StepBudgetTimeline } from './components/StepBudgetTimeline';
import { StepUploads } from './components/StepUploads';
import { StepSummary } from './components/StepSummary';
import { StepSuccess } from './components/StepSuccess';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ConsultationStep>('welcome');
  const [data, setData] = useState<CustomerRequirement>(INITIAL_REQUIREMENT);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedReferenceId, setSubmittedReferenceId] = useState<string>('');
  const [editingFromReview, setEditingFromReview] = useState(false);

  // Dynamically compute the active consultation journey based on current selections
  const activeSteps = getDynamicConsultationSteps(data);

  // Check for existing draft on initial mount
  useEffect(() => {
    const draft = storageService.loadDraft();
    if (draft && draft.customerName) {
      setHasSavedDraft(true);
    }
  }, []);

  // Auto-save draft when data updates (if past welcome and before success)
  useEffect(() => {
    if (currentStep !== 'welcome' && currentStep !== 'success') {
      storageService.saveDraft(data);
    }
  }, [data, currentStep]);

  // Scroll to top on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleUpdate = (fields: Partial<CustomerRequirement>) => {
    setData((prev) => {
      const merged: CustomerRequirement = { ...prev, ...fields };
      return syncStructuredRequirement(merged);
    });
  };

  const handleProjectTypeChange = (type: ProjectType) => {
    if (type !== data.projectType) {
      const updated = handleBranchReset(
        { ...data, projectType: type },
        'projectType'
      );
      setData(updated);
    } else {
      handleUpdate({ projectType: type });
    }
  };

  const handleServiceChange = (service: ServiceOption) => {
    if (service !== data.services) {
      const updated = handleBranchReset(
        { ...data, services: service },
        'services'
      );
      setData(updated);
    } else {
      handleUpdate({ services: service });
    }
  };

  const handleResumeDraft = () => {
    const draft = storageService.loadDraft();
    if (draft) {
      const merged = syncStructuredRequirement({ ...INITIAL_REQUIREMENT, ...draft });
      setData(merged);

      // Determine appropriate step to resume in the dynamic path
      const steps = getDynamicConsultationSteps(merged);
      if (!merged.projectType) setCurrentStep('projectType');
      else if (!merged.services) setCurrentStep('service');
      else if (!merged.customerName || !merged.phone) setCurrentStep('basicDetails');
      else if (steps.includes('architecture') && !merged.rawAnswers?.res_arch_purpose && !merged.rawAnswers?.comm_arch_business_type && !merged.rawAnswers?.ind_arch_type) {
        setCurrentStep('architecture');
      } else if (steps.includes('interior') && (!merged.rawAnswers?.int_spaces_selector || merged.rawAnswers.int_spaces_selector.length === 0)) {
        setCurrentStep('interior');
      } else if (steps.includes('landscape') && (!merged.rawAnswers?.land_areas || merged.rawAnswers.land_areas.length === 0)) {
        setCurrentStep('landscape');
      } else if ((merged.designPreferencesList || []).length === 0 && (!merged.designPreferences?.styles || merged.designPreferences.styles.length === 0)) {
        setCurrentStep('preferences');
      } else if (!merged.budget || !merged.timeline) {
        setCurrentStep('budgetTimeline');
      } else {
        setCurrentStep('summary');
      }
    }
  };

  const handleDiscardDraft = () => {
    storageService.clearDraft();
    setHasSavedDraft(false);
    setData(INITIAL_REQUIREMENT);
  };

  const goToNext = () => {
    if (editingFromReview) {
      setEditingFromReview(false);
      setCurrentStep('summary');
      return;
    }
    const currentIndex = activeSteps.indexOf(currentStep);
    if (currentIndex >= 0 && currentIndex < activeSteps.length - 1) {
      setCurrentStep(activeSteps[currentIndex + 1]);
    } else if (currentStep === 'welcome') {
      setCurrentStep(activeSteps[1] || 'projectType');
    }
  };

  const goToBack = () => {
    if (editingFromReview) {
      setEditingFromReview(false);
      setCurrentStep('summary');
      return;
    }
    const currentIndex = activeSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(activeSteps[currentIndex - 1]);
    }
  };

  const handleEditSection = (step: ConsultationStep) => {
    setEditingFromReview(true);
    if (activeSteps.includes(step)) {
      setCurrentStep(step);
    } else {
      setCurrentStep('basicDetails');
    }
  };

  const handleReturnToReview = () => {
    setEditingFromReview(false);
    setCurrentStep('summary');
  };

  const handleJumpToStep = (step: ConsultationStep) => {
    if (activeSteps.includes(step)) {
      setCurrentStep(step);
    } else {
      setCurrentStep('basicDetails');
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const res = await storageService.submitRequirement(data);
      setSubmittedReferenceId(res.referenceId);
      setCurrentStep('success');
      setHasSavedDraft(false);
    } catch (err: any) {
      console.error('Submission failed', err);
      setSubmissionError(err?.message || "We couldn't submit your requirement right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNew = () => {
    setData(INITIAL_REQUIREMENT);
    setSubmittedReferenceId('');
    setCurrentStep('welcome');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#111111] flex flex-col font-sans selection:bg-[#E22026] selection:text-white">
      {/* Studio Header */}
      <Header
        currentStep={currentStep}
        onOpenQR={() => setIsQRModalOpen(true)}
        onReset={currentStep !== 'welcome' && currentStep !== 'success' ? handleStartNew : undefined}
      />

      {/* Progress tracker dynamically adapts to active steps */}
      <ProgressBar currentStep={currentStep} activeSteps={activeSteps} />

      {/* Review Mode Banner when customer is editing an individual section */}
      {editingFromReview && currentStep !== 'summary' && currentStep !== 'welcome' && currentStep !== 'success' && (
        <div className="bg-[#111111] text-white py-2.5 px-4 sm:px-6 sticky top-0 z-40 shadow-sm animate-fade-in flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#E22026] animate-pulse"></span>
            <span>Editing Section • Your existing information is preserved</span>
          </div>
          <button
            type="button"
            onClick={handleReturnToReview}
            className="px-3.5 py-1.5 rounded-lg bg-[#E22026] hover:bg-[#C81A20] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Return to Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start">
        {currentStep === 'welcome' && (
          <StepWelcome
            onStart={goToNext}
            hasDraft={hasSavedDraft}
            onResumeDraft={handleResumeDraft}
            onDiscardDraft={handleDiscardDraft}
          />
        )}

        {currentStep === 'projectType' && (
          <StepProjectType
            selectedType={data.projectType}
            customType={data.customProjectType || ''}
            onSelectType={handleProjectTypeChange}
            onChangeCustomType={(text) => handleUpdate({ customProjectType: text })}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'service' && (
          <StepServices
            selectedService={data.services}
            onSelectService={handleServiceChange}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'basicDetails' && (
          <StepBasicDetails
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {/* Dynamic Step 1: Architecture Brief (if service includes Architecture) */}
        {currentStep === 'architecture' && (
          <StepArchitecture
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {/* Dynamic Step 2: Interior Spaces & Details (if service includes Interior) */}
        {(currentStep === 'interior' || currentStep === 'spaces') && (
          <StepInterior
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {/* Dynamic Step 3: Landscape Realms & Flora (if service includes Landscape) */}
        {currentStep === 'landscape' && (
          <StepLandscape
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'preferences' && (
          <StepPreferences
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'details' && (
          <StepRequirementDetails
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'budgetTimeline' && (
          <StepBudgetTimeline
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'uploads' && (
          <StepUploads
            data={data}
            onUpdate={handleUpdate}
            onNext={goToNext}
            onBack={goToBack}
          />
        )}

        {currentStep === 'summary' && (
          <StepSummary
            data={data}
            onEditSection={handleEditSection}
            onSubmit={handleSubmit}
            onBack={goToBack}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
            onRetrySubmit={handleSubmit}
          />
        )}

        {currentStep === 'success' && (
          <StepSuccess
            referenceNumber={submittedReferenceId || 'MMA-2026-0001'}
            data={data}
            onReset={handleStartNew}
          />
        )}
      </main>

      {/* Studio Footer */}
      <footer className="w-full border-t border-[#E5E7EB] bg-white py-6 px-4 sm:px-6 text-center select-none mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-['Cinzel',serif] font-bold text-[#C8102E] text-sm tracking-[0.08em]">
              M M
            </span>
            <span className="font-['Montserrat',sans-serif] font-bold text-[#111111] text-xs tracking-[0.16em]">
              DESIGN ATELIER
            </span>
            <span className="text-[#D1D5DB] mx-1">|</span>
            <span className="font-['Montserrat',sans-serif] font-medium text-[#71717A] text-[10px] tracking-[0.22em] uppercase">
              ARCHITECTURE | INTERIOR | LANDSCAPE
            </span>
          </div>
          <div className="text-[11px] text-[#A1A1AA]">
            Client Requirement Experience • Studio Confidential
          </div>
        </div>
      </footer>

      {/* Reception / Client QR Portal Modal */}
      <StudioQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}
