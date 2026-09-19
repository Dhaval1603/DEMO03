import {
  CustomerRequirement,
  ConsultationStep,
  ServiceOption,
  StructuredArchitecture,
  StructuredInterior,
  StructuredLandscape,
  StructuredDesignPreferences,
} from '../types/requirement';
import { EngineContext, QuestionConfig, QuestionSectionGroup } from '../types/questionEngine';
import { QUESTION_REGISTRY } from '../data/questionRegistry';

/**
 * Decomposes selected service into discrete architectural disciplines.
 */
export function getActiveServiceComponents(service: ServiceOption | '' | string): {
  hasArchitecture: boolean;
  hasInterior: boolean;
  hasLandscape: boolean;
} {
  if (!service) {
    return { hasArchitecture: false, hasInterior: false, hasLandscape: false };
  }
  const s = service.toLowerCase();
  const hasArchitecture = s.includes('architecture') || s.includes('complete');
  const hasInterior = s.includes('interior') || s.includes('complete');
  const hasLandscape = s.includes('landscape') || s.includes('complete');

  return { hasArchitecture, hasInterior, hasLandscape };
}

/**
 * Builds the runtime engine context for rule evaluation.
 */
export function buildEngineContext(req: CustomerRequirement): EngineContext {
  const activeServices = getActiveServiceComponents(req.services);

  // Compile selected spaces from both structured & flat store
  const allSelectedSpaces: string[] = [
    ...(req.interior?.selectedSpaces || []),
    ...(req.rawAnswers?.int_spaces_selector || []),
    ...Object.values(req.selectedSpaces || {}).flat(),
    ...(req.customSpaces || []),
  ];

  const uniqueSpaces = Array.from(new Set(allSelectedSpaces.filter(Boolean)));

  return {
    projectType: req.projectType,
    customProjectType: req.customProjectType,
    services: req.services,
    hasArchitecture: activeServices.hasArchitecture,
    hasInterior: activeServices.hasInterior,
    hasLandscape: activeServices.hasLandscape,
    selectedSpaces: uniqueSpaces,
    answers: req.rawAnswers || {},
  };
}

/**
 * Evaluates active questions according to the current selections and context.
 */
export function getActiveQuestions(
  context: EngineContext,
  category?: QuestionConfig['category']
): QuestionConfig[] {
  return QUESTION_REGISTRY.filter((q) => {
    // If category filter provided, check it
    if (category && q.category !== category) {
      return false;
    }

    // Evaluate dynamic conditional rule
    if (q.conditionalRules) {
      return q.conditionalRules(context);
    }

    // Default: visible
    return true;
  });
}

/**
 * Groups active questions into visual section blocks.
 */
export function getGroupedActiveQuestions(
  context: EngineContext,
  category?: QuestionConfig['category']
): QuestionSectionGroup[] {
  const activeQuestions = getActiveQuestions(context, category);
  const groups: Record<string, QuestionConfig[]> = {};

  activeQuestions.forEach((q) => {
    const sec = q.section || 'General Specifications';
    if (!groups[sec]) {
      groups[sec] = [];
    }
    groups[sec].push(q);
  });

  return Object.entries(groups).map(([sectionTitle, questions]) => ({
    id: sectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: sectionTitle,
    questions,
  }));
}

/**
 * Computes the dynamic consultation step sequence for the customer.
 */
export function getDynamicConsultationSteps(req: CustomerRequirement): ConsultationStep[] {
  const steps: ConsultationStep[] = ['welcome', 'projectType', 'service', 'basicDetails'];
  const { hasArchitecture, hasInterior, hasLandscape } = getActiveServiceComponents(req.services);

  if (hasArchitecture) {
    steps.push('architecture');
  }
  if (hasInterior) {
    steps.push('interior');
  }
  if (hasLandscape) {
    steps.push('landscape');
  }

  steps.push('preferences');
  steps.push('details');
  steps.push('budgetTimeline');
  steps.push('uploads');
  steps.push('summary');
  steps.push('success');

  return steps;
}

/**
 * Synchronizes raw question answers into structured typed entities
 * ensuring backwards compatibility with existing UI.
 */
export function syncStructuredRequirement(req: CustomerRequirement): CustomerRequirement {
  const activeServices = getActiveServiceComponents(req.services);
  const answers = req.rawAnswers || {};

  // 1. Architecture structured data
  const archPurpose = answers.res_arch_purpose || answers.comm_arch_purpose || '';
  const archPropertyType = answers.res_arch_property_type || '';
  const archScope = answers.res_arch_scope || [];
  const archFloors = answers.res_arch_floors || '';
  const archFamilyMembers = answers.res_arch_family_members || '';
  const archBedrooms = answers.res_arch_bedrooms || '';
  const archBathrooms = answers.res_arch_bathrooms || '';
  const archParking = answers.res_arch_parking || answers.comm_arch_parking || '';
  const archVastu = answers.res_arch_vastu || '';
  const archOutdoorElements = answers.res_arch_outdoor_elements || [];
  const archSpecialFeatures = answers.res_arch_special_features || [];

  const commBusinessType = answers.comm_arch_business_type || '';
  const commUsers = answers.comm_arch_users || '';
  const commZones = answers.comm_arch_zones || [];

  const indType = answers.ind_arch_type || '';
  const indZones = answers.ind_arch_zones || [];
  const indMachinery = answers.ind_arch_machinery_logistics || [];

  const structuredArch: StructuredArchitecture = {
    purpose: archPurpose,
    propertyType: archPropertyType,
    scope: Array.isArray(archScope) ? archScope : archScope ? [archScope] : [],
    businessType: commBusinessType,
    floors: archFloors,
    familyMembers: archFamilyMembers,
    bedrooms: archBedrooms,
    bathrooms: archBathrooms,
    parking: archParking,
    vastu: archVastu,
    outdoorElements: Array.isArray(archOutdoorElements) ? archOutdoorElements : [],
    specialFeatures: Array.isArray(archSpecialFeatures) ? archSpecialFeatures : [],
    expectedUsers: commUsers,
    commercialZones: Array.isArray(commZones) ? commZones : [],
    industrialType: indType,
    industrialZones: Array.isArray(indZones) ? indZones : [],
    industrialMachinery: Array.isArray(indMachinery) ? indMachinery : [],
    rawAnswers: answers,
  };

  // 2. Interior structured data
  const rawInteriorSpaces = answers.int_spaces_selector || [];
  const selectedInteriorSpaces = Array.isArray(rawInteriorSpaces)
    ? rawInteriorSpaces
    : rawInteriorSpaces
    ? [rawInteriorSpaces]
    : [];

  const spaceDetails: Record<string, string[]> = {};
  if (answers.int_details_living_room) {
    spaceDetails['Living Room'] = Array.isArray(answers.int_details_living_room)
      ? answers.int_details_living_room
      : [answers.int_details_living_room];
  }
  if (answers.int_details_kitchen) {
    spaceDetails['Kitchen & Pantry'] = Array.isArray(answers.int_details_kitchen)
      ? answers.int_details_kitchen
      : [answers.int_details_kitchen];
  }
  if (answers.int_details_bedroom) {
    spaceDetails['Bedroom Suites'] = Array.isArray(answers.int_details_bedroom)
      ? answers.int_details_bedroom
      : [answers.int_details_bedroom];
  }
  if (answers.int_details_bathroom) {
    spaceDetails['Bathrooms'] = Array.isArray(answers.int_details_bathroom)
      ? answers.int_details_bathroom
      : [answers.int_details_bathroom];
  }
  if (answers.int_details_office) {
    spaceDetails['Office & Workstations'] = Array.isArray(answers.int_details_office)
      ? answers.int_details_office
      : [answers.int_details_office];
  }

  const structuredInterior: StructuredInterior = {
    selectedSpaces: selectedInteriorSpaces,
    customSpaces: req.customSpaces || [],
    spaceDetails,
    rawAnswers: answers,
  };

  // 3. Landscape structured data
  const rawLandscapeAreas = answers.land_areas || [];
  const selectedLandscapeAreas = Array.isArray(rawLandscapeAreas)
    ? rawLandscapeAreas
    : rawLandscapeAreas
    ? [rawLandscapeAreas]
    : [];

  const landCondition = answers.land_condition || '';
  const landFeatures = answers.land_features || [];
  const landLifestyle = answers.land_lifestyle_priorities || [];

  const structuredLandscape: StructuredLandscape = {
    selectedAreas: selectedLandscapeAreas,
    customAreas: [],
    existingOrNew: landCondition,
    features: Array.isArray(landFeatures) ? landFeatures : [],
    specialNeeds: Array.isArray(landLifestyle) ? landLifestyle : [],
    rawAnswers: answers,
  };

  // 4. Design Preferences
  const isGuidance = (req.designPreferencesList || []).includes('Not Sure');
  const structuredPreferences: StructuredDesignPreferences = {
    styles: req.designPreferencesList || [],
    needsGuidance: isGuidance,
    rawAnswers: answers,
  };

  return {
    ...req,
    customer: {
      name: req.customerName,
      phone: req.phone,
      email: req.email,
    },
    project: {
      type: req.projectType,
      customType: req.customProjectType,
      location: req.projectLocation,
      area: req.projectArea,
      areaUnit: req.projectAreaUnit || 'sq ft',
      condition: req.projectCondition,
    },
    activeServices,
    architecture: structuredArch,
    interior: structuredInterior,
    landscape: structuredLandscape,
    designPreferences: structuredPreferences,
    budgetDetails: {
      range: req.budget,
    },
    timelineDetails: {
      target: req.timeline,
    },
    attachments: req.uploadedFiles || [],
    status: req.submissionStatus || 'draft',
  };
}

export interface ValidationItem {
  field: string;
  label: string;
  step: ConsultationStep;
  reason?: string;
}

/**
 * Validates requirement completeness prior to final submission.
 */
export function validateRequirementCompleteness(req: CustomerRequirement): {
  isComplete: boolean;
  missingItems: ValidationItem[];
  message: string;
} {
  const missingItems: ValidationItem[] = [];

  // 1. Basic details check
  if (!req.customerName || !req.customerName.trim()) {
    missingItems.push({
      field: 'customerName',
      label: 'Full Name',
      step: 'basicDetails',
      reason: 'Needed for client identification and portfolio directorship',
    });
  }

  if (!req.phone || !req.phone.trim()) {
    missingItems.push({
      field: 'phone',
      label: 'Primary Phone / WhatsApp',
      step: 'basicDetails',
      reason: 'Needed for scheduling architectural studio consultations',
    });
  }

  if (!req.projectType) {
    missingItems.push({
      field: 'projectType',
      label: 'Project Typology',
      step: 'projectType',
      reason: 'Required to curate relevant questions and design standards',
    });
  }

  if (!req.services) {
    missingItems.push({
      field: 'services',
      label: 'Atelier Disciplines',
      step: 'service',
      reason: 'Select Architecture, Interior, Landscape or a combination',
    });
  }

  // 2. Dynamic Required Question Checks
  const context = buildEngineContext(req);
  const activeQuestions = getActiveQuestions(context);

  activeQuestions.forEach((q) => {
    if (q.required) {
      const val = req.rawAnswers?.[q.id];
      const isEmpty =
        val === undefined ||
        val === null ||
        val === '' ||
        (Array.isArray(val) && val.length === 0);

      if (isEmpty) {
        let step: ConsultationStep = 'basicDetails';
        if (q.category === 'architecture') step = 'architecture';
        else if (q.category === 'interior') step = 'interior';
        else if (q.category === 'landscape') step = 'landscape';

        missingItems.push({
          field: q.id,
          label: q.question,
          step,
          reason: 'Required design specification',
        });
      }
    }
  });

  const isComplete = missingItems.length === 0;
  const message = isComplete
    ? 'Your requirement brief is complete and ready for atelier directorship review.'
    : 'Please complete these details before transmitting your consultation dossier:';

  return { isComplete, missingItems, message };
}

/**
 * Cleanses stale or orphaned answers when the customer navigates back
 * and changes their Project Type or Selected Services.
 */
export function handleBranchReset(
  req: CustomerRequirement,
  changedField: 'projectType' | 'services'
): CustomerRequirement {
  const context = buildEngineContext(req);
  const validQuestions = getActiveQuestions(context);
  const validIds = new Set(validQuestions.map((q) => q.id));

  // Retain only answers for questions that remain active
  const filteredAnswers: Record<string, any> = {};
  Object.entries(req.rawAnswers || {}).forEach(([k, v]) => {
    if (validIds.has(k)) {
      filteredAnswers[k] = v;
    }
  });

  // Re-synchronize
  return syncStructuredRequirement({
    ...req,
    rawAnswers: filteredAnswers,
  });
}
