import { CustomerRequirement, ProjectCondition } from '../types/requirement';
import { requirementRepository } from './requirementRepository';

export const INITIAL_REQUIREMENT: CustomerRequirement = {
  requirementId: '',
  referenceNumber: '',
  createdAt: '',
  updatedAt: '',
  customer: {
    name: '',
    phone: '',
    email: '',
  },
  project: {
    type: '',
    customType: '',
    location: '',
    area: '',
    areaUnit: 'sq ft',
    condition: 'New Construction' as ProjectCondition,
  },
  services: '',
  activeServices: {
    hasArchitecture: false,
    hasInterior: false,
    hasLandscape: false,
  },
  architecture: {
    rawAnswers: {},
  },
  interior: {
    selectedSpaces: [],
    customSpaces: [],
    spaceDetails: {},
    rawAnswers: {},
  },
  landscape: {
    selectedAreas: [],
    customAreas: [],
    features: [],
    specialNeeds: [],
    rawAnswers: {},
  },
  designPreferences: {
    styles: [],
    needsGuidance: false,
    rawAnswers: {},
  },
  budgetDetails: {
    range: '',
  },
  timelineDetails: {
    target: '',
  },
  attachments: [],
  additionalRequirements: '',
  rawAnswers: {},
  status: 'draft',

  // Flat aliases for backwards compatibility
  customerName: '',
  phone: '',
  email: '',
  projectType: '',
  customProjectType: '',
  projectLocation: '',
  projectArea: '',
  projectAreaUnit: 'sq ft',
  projectCondition: 'New Construction' as ProjectCondition,
  selectedSpaces: {},
  customSpaces: [],
  designPreferencesList: [],
  budget: '',
  timeline: '',
  uploadedFiles: [],
  submissionStatus: 'draft',
};

export const storageService = {
  loadDraft(): Partial<CustomerRequirement> | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const data = localStorage.getItem('mma_requirement_draft_v2') || localStorage.getItem('mm_atelier_consultation_draft_v1');
      if (!data) return null;
      return JSON.parse(data);
    } catch (err) {
      console.warn('Unable to load consultation draft from local storage', err);
      return null;
    }
  },

  saveDraft(data: Partial<CustomerRequirement>): void {
    requirementRepository.saveDraft(data as CustomerRequirement);
  },

  clearDraft(): void {
    requirementRepository.clearDraft();
  },

  generateReferenceId(): string {
    return requirementRepository.generateReferenceNumber();
  },

  async submitRequirement(data: CustomerRequirement): Promise<{ success: boolean; referenceId: string }> {
    const result = await requirementRepository.submitRequirement(data);
    return {
      success: result.success,
      referenceId: result.referenceNumber,
    };
  },

  getSubmissions(): any[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const raw = localStorage.getItem('mma_requirement_submissions_v2') || localStorage.getItem('mm_atelier_consultation_submissions_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
};
