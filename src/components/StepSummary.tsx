import React, { useState } from 'react';
import { CustomerRequirement, ConsultationStep } from '../types/requirement';
import { Logo } from './Logo';
import { getActiveServiceComponents } from '../services/questionEngine';
import {
  Building2,
  Layers,
  MapPin,
  Maximize2,
  Palette,
  IndianRupee,
  Calendar,
  MessageSquare,
  FileText,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Compass,
  LayoutGrid,
  Trees,
  Loader2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface StepSummaryProps {
  data: CustomerRequirement;
  onEditSection: (step: ConsultationStep) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  submissionError?: string | null;
  onRetrySubmit?: () => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  data,
  onEditSection,
  onSubmit,
  onBack,
  isSubmitting,
  submissionError,
  onRetrySubmit,
}) => {
  // Simple confirmation required by prompt
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Active disciplines
  const { hasArchitecture, hasInterior, hasLandscape } = getActiveServiceComponents(data.services);

  // Styles list helper
  const selectedStyles: string[] = Array.isArray(data.designPreferences)
    ? (data.designPreferences as unknown as string[])
    : data.designPreferences?.styles || data.designPreferencesList || [];

  const needsGuidance =
    selectedStyles.includes('Not Sure') ||
    selectedStyles.some((s) => s.toLowerCase().includes('guidance')) ||
    Boolean(data.designPreferences?.needsGuidance);

  const cleanStyles = selectedStyles.filter((s) => !s.includes('Not Sure'));

  // Interior answers
  const interiorSpaces: string[] =
    data.interior?.selectedSpaces?.length > 0
      ? data.interior.selectedSpaces
      : Array.isArray(data.rawAnswers?.int_spaces_selector)
      ? data.rawAnswers.int_spaces_selector
      : [];

  const spaceDetails = data.interior?.spaceDetails || {};

  // Landscape answers
  const landscapeAreas: string[] =
    data.landscape?.selectedAreas?.length > 0
      ? data.landscape.selectedAreas
      : Array.isArray(data.rawAnswers?.land_areas)
      ? data.rawAnswers.land_areas
      : [];

  const landscapeFeatures: string[] =
    data.landscape?.features?.length > 0
      ? data.landscape.features
      : Array.isArray(data.rawAnswers?.land_features)
      ? data.rawAnswers.land_features
      : [];

  const landscapeNeeds: string[] =
    data.landscape?.specialNeeds?.length > 0
      ? data.landscape.specialNeeds
      : Array.isArray(data.rawAnswers?.land_lifestyle_priorities)
      ? data.rawAnswers.land_lifestyle_priorities
      : [];

  // Check which sections have content to show
  const customerName = data.customer?.name || data.customerName;
  const customerPhone = data.customer?.phone || data.phone;
  const customerEmail = data.customer?.email || data.email;

  const projectTypeDisplay =
    data.projectType === 'Other' && data.customProjectType
      ? `${data.customProjectType} (Bespoke)`
      : data.projectType;

  const hasCustomerInfo = Boolean(customerName || customerPhone || customerEmail);
  const hasProjectInfo = Boolean(projectTypeDisplay || data.projectCondition || data.projectLocation || data.projectArea);
  const hasServicesInfo = Boolean(data.services);

  const hasArchitectureContent =
    hasArchitecture &&
    Boolean(
      data.architecture?.purpose ||
        data.architecture?.propertyType ||
        data.architecture?.floors ||
        data.architecture?.bedrooms ||
        data.architecture?.bathrooms ||
        data.architecture?.parking ||
        data.architecture?.vastu ||
        data.architecture?.businessType ||
        data.architecture?.industrialType ||
        (data.architecture?.scope && data.architecture.scope.length > 0) ||
        (data.architecture?.outdoorElements && data.architecture.outdoorElements.length > 0)
    );

  const hasInteriorContent =
    hasInterior &&
    (interiorSpaces.length > 0 || Object.keys(spaceDetails).length > 0);

  const hasLandscapeContent =
    hasLandscape &&
    (landscapeAreas.length > 0 || landscapeFeatures.length > 0 || landscapeNeeds.length > 0);

  const hasPreferencesContent = selectedStyles.length > 0 || needsGuidance;
  const hasBudgetContent = Boolean(data.budget || data.budgetDetails?.range);
  const hasTimelineContent = Boolean(data.timeline || data.timelineDetails?.target);
  const hasNotesContent = Boolean(data.additionalRequirements && data.additionalRequirements.trim());
  const filesList = data.uploadedFiles || data.attachments || [];
  const hasAttachmentsContent = filesList.length > 0;

  // Basic validation check
  const isFormValid = Boolean(customerName && customerPhone && data.projectType && data.services);

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed || !isFormValid || isSubmitting) return;
    onSubmit();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* 1. Customer Requirement Finalization Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="mb-4 inline-flex justify-center">
          <Logo variant="compact" />
        </div>
        <div className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Final Review • Atelier Dossier
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Review Your Project
        </h2>
        <p className="text-sm sm:text-base text-[#52525B] mt-2.5 max-w-xl mx-auto leading-relaxed">
          Please review the information below before sending your requirements to M M Design Atelier.
        </p>
      </div>

      {/* 13. Submission Error Banner (if error occurred) */}
      {submissionError && (
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-2xs">
          <div className="flex items-start sm:items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#E22026] shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#B91C1C]">
                We couldn't submit your requirement right now.
              </h4>
              <p className="text-xs text-[#991B1B] mt-0.5">
                Your entered information is safe and has not been lost. Please try again.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetrySubmit || onSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-[#E22026] hover:bg-[#C81A20] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 5. Short Premium Loading Overlay / Banner */}
      {isSubmitting && (
        <div className="mb-8 p-6 rounded-xl bg-white border border-[#E22026]/30 shadow-md text-center flex flex-col items-center justify-center animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-[#FFF0F0] border border-[#E22026]/20 flex items-center justify-center mb-3">
            <Loader2 className="w-6 h-6 text-[#E22026] animate-spin" />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#111111]">
            Preparing your project brief...
          </h3>
          <p className="text-xs text-[#71717A] mt-1 max-w-sm">
            Structuring your design parameters, spaces, and preferences for the atelier directors.
          </p>
        </div>
      )}

      {/* 2. Main Review Dossier Card (Shows only sections that contain information) */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs divide-y divide-[#E5E7EB]">
        {/* SECTION: CUSTOMER (Name, Phone, Email) */}
        {hasCustomerInfo && (
          <div className="p-5 sm:p-6 bg-[#FAFAFB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold">
                Customer Details
              </span>
              <button
                type="button"
                onClick={() => onEditSection('basicDetails')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Customer Details"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#71717A] block font-mono text-[10px] uppercase">Name</span>
                <span className="font-semibold text-[#111111] text-sm mt-0.5 block">
                  {customerName || 'Private Client'}
                </span>
              </div>
              <div>
                <span className="text-[#71717A] block font-mono text-[10px] uppercase">Phone</span>
                <span className="font-semibold text-[#111111] text-sm mt-0.5 block">
                  {customerPhone || 'Not set'}
                </span>
              </div>
              {customerEmail && (
                <div>
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Email</span>
                  <span className="font-medium text-[#111111] text-sm mt-0.5 block">
                    {customerEmail}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: PROJECT (Project Type, New/Renovation, Location, Approximate Area) */}
        {hasProjectInfo && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Project Parameters</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('projectType')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Project Details"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#71717A] block font-mono text-[10px] uppercase">Project Type</span>
                <span className="font-semibold text-[#111111] text-sm mt-0.5 block">
                  {projectTypeDisplay || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-[#71717A] block font-mono text-[10px] uppercase">Condition</span>
                <span className="font-semibold text-[#E22026] text-sm mt-0.5 block">
                  {data.projectCondition || 'New Construction'}
                </span>
              </div>
              {data.projectLocation && (
                <div>
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Project Location</span>
                  <span className="font-medium text-[#111111] text-sm mt-0.5 block truncate">
                    {data.projectLocation}
                  </span>
                </div>
              )}
              {data.projectArea && (
                <div>
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Approximate Area</span>
                  <span className="font-semibold text-[#111111] text-sm mt-0.5 block">
                    {data.projectArea} {data.projectAreaUnit || 'sq ft'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: SERVICES (Architecture, Interior, Landscape, Selected combinations) */}
        {hasServicesInfo && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Services In Scope</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('service')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Services"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div>
              <p className="font-display text-lg text-[#111111] font-semibold">
                {data.services}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {hasArchitecture && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F0] text-[#E22026] text-xs font-medium border border-[#E22026]/20">
                    Architecture
                  </span>
                )}
                {hasInterior && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F0] text-[#E22026] text-xs font-medium border border-[#E22026]/20">
                    Interior Design
                  </span>
                )}
                {hasLandscape && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F0] text-[#E22026] text-xs font-medium border border-[#E22026]/20">
                    Landscape Architecture
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: ARCHITECTURE REQUIREMENTS (Show only if Architecture is selected) */}
        {hasArchitectureContent && (
          <div className="p-5 sm:p-6 bg-[#FAFAFB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#111111] font-semibold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#E22026]" />
                <span>Architecture Requirements</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('architecture')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Architecture"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {data.architecture?.purpose && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Purpose</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.purpose}</span>
                </div>
              )}
              {data.architecture?.propertyType && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Property Type</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.propertyType}</span>
                </div>
              )}
              {data.architecture?.businessType && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Commercial Type</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.businessType}</span>
                </div>
              )}
              {data.architecture?.industrialType && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Industrial Facility</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.industrialType}</span>
                </div>
              )}
              {data.architecture?.floors && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Floors / Levels</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.floors}</span>
                </div>
              )}
              {data.architecture?.bedrooms && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Bedrooms</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.bedrooms}</span>
                </div>
              )}
              {data.architecture?.bathrooms && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Bathrooms</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.bathrooms}</span>
                </div>
              )}
              {data.architecture?.parking && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Parking Bays</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.parking}</span>
                </div>
              )}
              {data.architecture?.vastu && (
                <div className="p-3 bg-white rounded-lg border border-[#E5E7EB]">
                  <span className="text-[#71717A] block font-mono text-[10px] uppercase">Vastu Shastra</span>
                  <span className="font-semibold text-[#111111] mt-0.5 block">{data.architecture.vastu}</span>
                </div>
              )}
            </div>

            {data.architecture?.scope && data.architecture.scope.length > 0 && (
              <div className="mt-3">
                <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1">
                  Deliverables in Scope:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.architecture.scope.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white border border-[#E5E7EB] text-[11px] text-[#111111]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION: INTERIOR REQUIREMENTS (Show only if Interior is selected) */}
        {hasInteriorContent && (
          <div className="p-5 sm:p-6 bg-[#FAFAFB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#111111] font-semibold flex items-center gap-1.5">
                <LayoutGrid className="w-4 h-4 text-[#E22026]" />
                <span>Interior Requirements</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('interior')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Interior"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            {interiorSpaces.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1.5">
                  Spaces in Scope ({interiorSpaces.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {interiorSpaces.map((room) => (
                    <span
                      key={room}
                      className="px-2.5 py-1 rounded bg-white border border-[#E5E7EB] text-xs text-[#111111] font-medium"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(spaceDetails).length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#E5E7EB]/70 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#71717A] block">
                  Space-Specific Specifications:
                </span>
                {Object.entries(spaceDetails).map(([room, items]) => (
                  <div key={room} className="p-2.5 bg-white rounded-lg border border-[#E5E7EB] text-xs">
                    <span className="font-semibold text-[#111111] block mb-1">{room}:</span>
                    <div className="flex flex-wrap gap-1">
                      {items.map((it) => (
                        <span key={it} className="px-2 py-0.5 rounded bg-[#F4F4F6] text-[11px] text-[#374151]">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION: LANDSCAPE REQUIREMENTS (Show only if Landscape is selected) */}
        {hasLandscapeContent && (
          <div className="p-5 sm:p-6 bg-[#FAFAFB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#111111] font-semibold flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-[#E22026]" />
                <span>Landscape Requirements</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('landscape')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Landscape"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="space-y-3">
              {landscapeAreas.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1">
                    Landscape Areas ({landscapeAreas.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {landscapeAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded bg-white border border-[#E5E7EB] text-xs text-[#111111] font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {landscapeFeatures.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1">
                    Features & Flora:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {landscapeFeatures.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded bg-white border border-[#E5E7EB] text-[11px] text-[#374151]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {landscapeNeeds.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1">
                    Maintenance & Priorities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {landscapeNeeds.map((need) => (
                      <span key={need} className="px-2 py-0.5 rounded bg-[#FEF2F2] border border-[#FEE2E2] text-[11px] text-[#E22026]">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: DESIGN PREFERENCES */}
        {hasPreferencesContent && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Design Preferences</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('preferences')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Preferences"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {cleanStyles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 rounded-md bg-[#FFF0F0] border border-[#E22026]/30 text-[#E22026] text-xs font-medium"
                >
                  {style}
                </span>
              ))}
              {needsGuidance && (
                <span className="px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                  Studio Guidance Requested
                </span>
              )}
            </div>
          </div>
        )}

        {/* SECTION: BUDGET (Show selected budget) */}
        {hasBudgetContent && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Budget Range</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('budgetTimeline')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Budget"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <p className="font-display text-lg text-[#111111] font-semibold">
              {data.budget || data.budgetDetails?.range}
            </p>
          </div>
        )}

        {/* SECTION: TIMELINE (Show selected timeline) */}
        {hasTimelineContent && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Timeline</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('budgetTimeline')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Timeline"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <p className="font-display text-lg text-[#111111] font-semibold">
              {data.timeline || data.timelineDetails?.target}
            </p>
          </div>
        )}

        {/* SECTION: ADDITIONAL REQUIREMENTS (Show customer notes) */}
        {hasNotesContent && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Additional Requirements & Notes</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('details')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Notes"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed italic bg-[#FAFAFB] p-4 rounded-lg border border-[#E5E7EB]">
              "{data.additionalRequirements}"
            </p>
          </div>
        )}

        {/* SECTION: ATTACHMENTS (Show uploaded files/images) */}
        {hasAttachmentsContent && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#71717A] font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Attachments ({filesList.length})</span>
              </span>
              <button
                type="button"
                onClick={() => onEditSection('uploads')}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F4F4F6] text-[#111111] border border-[#D1D5DB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Edit Attachments"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E22026]" />
                <span>Edit</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {filesList.map((file) => (
                <div
                  key={file.id}
                  className="px-3 py-2 rounded-lg bg-[#F4F4F6] border border-[#E5E7EB] text-xs text-[#52525B] flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E22026] shrink-0" />
                  <span className="truncate max-w-[200px] font-medium text-[#111111]">{file.name}</span>
                  <span className="text-[10px] text-[#A1A1AA]">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Simple Confirmation Checkbox */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex items-start sm:items-center gap-3.5">
        <input
          id="confirm-accurate-checkbox"
          type="checkbox"
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          className="mt-0.5 sm:mt-0 h-4 w-4 rounded border-[#D1D5DB] text-[#E22026] focus:ring-[#E22026] cursor-pointer"
        />
        <label
          htmlFor="confirm-accurate-checkbox"
          className="text-xs sm:text-sm text-[#374151] cursor-pointer select-none font-medium leading-relaxed"
        >
          I confirm that the information provided is correct.
        </label>
      </div>

      {/* Navigation & Submit Action Controls */}
      <div className="w-full mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold uppercase tracking-wider text-[#71717A] hover:bg-[#F4F4F6] hover:text-[#111111] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={!isConfirmed || !isFormValid || isSubmitting}
          id="submit-requirement-button"
          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-200 ${
            isConfirmed && isFormValid && !isSubmitting
              ? 'bg-[#E22026] text-white hover:bg-[#C81A20] shadow-sm cursor-pointer active:scale-[0.99]'
              : 'bg-[#F4F4F6] text-[#A1A1AA] border border-[#E5E7EB] cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Preparing your project brief...</span>
            </>
          ) : (
            <>
              <span>Submit Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
