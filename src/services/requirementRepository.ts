import {
  CustomerRequirement,
  FinalRequirementRecord,
  RequirementStatus,
  UploadedFileRecord,
} from '../types/requirement';

/**
 * Storage keys for local persistence abstraction.
 * When a real cloud database (e.g. Firestore or Cloud SQL) is connected,
 * this repository will interface with the backend API / Firestore SDK
 * without requiring any changes in the customer UI layer.
 */
const DRAFT_STORAGE_KEY = 'mma_requirement_draft_v2';
const SUBMISSIONS_STORAGE_KEY = 'mma_requirement_submissions_v2';
const SEQUENCE_STORAGE_KEY = 'mma_requirement_sequence_v2';
const IDEMPOTENCY_STORAGE_KEY = 'mma_requirement_idempotency_v2';

// In-memory submission lock for double-click protection
let isSubmittingLock = false;

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const requirementRepository = {
  /**
   * Save unfinished consultation brief locally
   */
  async saveDraft(data: Partial<CustomerRequirement>): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
      }
    } catch (err) {
      console.warn('[RequirementRepository] Could not save draft', err);
    }
  },

  /**
   * Load stored draft if exists
   */
  async loadDraft(): Promise<CustomerRequirement | null> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      }
      return null;
    } catch (err) {
      console.warn('[RequirementRepository] Could not load draft', err);
      return null;
    }
  },

  /**
   * Clear active draft after successful submission or explicit user reset
   */
  async clearDraft(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    } catch (err) {
      console.warn('[RequirementRepository] Could not clear draft', err);
    }
  },

  /**
   * Generates a unique, friendly reference number (e.g. MMA-2026-0001)
   */
  generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    let nextNum = 1;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(SEQUENCE_STORAGE_KEY);
        if (stored) {
          const parsed = parseInt(stored, 10);
          if (!isNaN(parsed) && parsed > 0) {
            nextNum = parsed + 1;
          }
        }
        localStorage.setItem(SEQUENCE_STORAGE_KEY, nextNum.toString());
      }
    } catch {
      nextNum = Math.floor(1000 + Math.random() * 9000);
    }

    const paddedSeq = String(nextNum).padStart(4, '0');
    return `MMA-${year}-${paddedSeq}`;
  },

  /**
   * Validates mandatory customer data before submission
   */
  validateForSubmission(data: CustomerRequirement): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    const name = data.customer?.name || data.customerName;
    if (!name || !name.trim()) {
      errors.push('Client name is required');
    }

    const phone = data.customer?.phone || data.phone;
    if (!phone || !phone.trim()) {
      errors.push('Phone number is required');
    }

    const email = data.customer?.email || data.email;
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push('Please enter a valid email address');
      }
    }

    const projectType = data.project?.type || data.projectType;
    if (!projectType) {
      errors.push('Project type is required');
    }

    const services = data.services;
    if (!services) {
      errors.push('Service selection is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Build the complete structured final record conforming to Section 9 schema
   */
  buildFinalRecord(
    data: CustomerRequirement,
    referenceNumber: string,
    requirementId: string
  ): FinalRequirementRecord {
    const timestamp = new Date().toISOString();

    // Determine services list
    const servicesList: string[] = [];
    if (data.services) {
      if (data.services === 'Complete Design (Architecture + Interior + Landscape)') {
        servicesList.push('Architecture', 'Interior Design', 'Landscape Design');
      } else if (data.services === 'Architecture + Interior') {
        servicesList.push('Architecture', 'Interior Design');
      } else if (data.services === 'Architecture + Landscape') {
        servicesList.push('Architecture', 'Landscape Design');
      } else if (data.services === 'Interior + Landscape') {
        servicesList.push('Interior Design', 'Landscape Design');
      } else {
        servicesList.push(data.services);
      }
    }

    const hasArchitecture = servicesList.includes('Architecture');
    const hasInterior = servicesList.includes('Interior Design');
    const hasLandscape = servicesList.includes('Landscape Design');

    // Architecture section
    let architecture: FinalRequirementRecord['architecture'] = undefined;
    if (hasArchitecture) {
      const archRequirements: string[] = [];
      if (data.architecture?.purpose) archRequirements.push(`Purpose: ${data.architecture.purpose}`);
      if (data.architecture?.propertyType) archRequirements.push(`Property: ${data.architecture.propertyType}`);
      if (data.architecture?.floors) archRequirements.push(`Floors: ${data.architecture.floors}`);
      if (data.architecture?.bedrooms) archRequirements.push(`Bedrooms: ${data.architecture.bedrooms}`);
      if (data.architecture?.bathrooms) archRequirements.push(`Bathrooms: ${data.architecture.bathrooms}`);
      if (data.architecture?.vastu) archRequirements.push(`Vastu: ${data.architecture.vastu}`);
      if (data.architecture?.businessType) archRequirements.push(`Business Type: ${data.architecture.businessType}`);
      if (data.architecture?.industrialType) archRequirements.push(`Industrial: ${data.architecture.industrialType}`);
      if (data.architecture?.scope && data.architecture.scope.length > 0) {
        archRequirements.push(`Scope: ${data.architecture.scope.join(', ')}`);
      }

      architecture = {
        requirements: archRequirements,
        details: {
          ...data.architecture,
          rawAnswers: data.architecture?.rawAnswers || {},
        },
      };
    }

    // Interior section
    let interior: FinalRequirementRecord['interior'] = undefined;
    if (hasInterior) {
      const selectedSpaces =
        data.interior?.selectedSpaces?.length > 0
          ? data.interior.selectedSpaces
          : Array.isArray(data.rawAnswers?.int_spaces_selector)
          ? data.rawAnswers.int_spaces_selector
          : [];

      interior = {
        spaces: selectedSpaces,
        requirements: {
          spaceDetails: data.interior?.spaceDetails || {},
          customSpaces: data.interior?.customSpaces || [],
        },
        details: {
          ...data.interior,
          rawAnswers: data.interior?.rawAnswers || {},
        },
      };
    }

    // Landscape section
    let landscape: FinalRequirementRecord['landscape'] = undefined;
    if (hasLandscape) {
      const selectedAreas =
        data.landscape?.selectedAreas?.length > 0
          ? data.landscape.selectedAreas
          : Array.isArray(data.rawAnswers?.land_areas)
          ? data.rawAnswers.land_areas
          : [];

      landscape = {
        areas: selectedAreas,
        requirements: {
          features: data.landscape?.features || data.rawAnswers?.land_features || [],
          specialNeeds: data.landscape?.specialNeeds || data.rawAnswers?.land_lifestyle_priorities || [],
        },
        details: {
          ...data.landscape,
          rawAnswers: data.landscape?.rawAnswers || {},
        },
      };
    }

    // Design Preferences
    const stylesList: string[] = Array.isArray(data.designPreferences)
      ? (data.designPreferences as unknown as string[])
      : data.designPreferences?.styles || data.designPreferencesList || [];

    const needsGuidance =
      stylesList.includes('Not Sure') ||
      stylesList.some((s) => s.toLowerCase().includes('guidance')) ||
      Boolean(data.designPreferences?.needsGuidance);

    // Clean attachments metadata
    const attachments: UploadedFileRecord[] = (data.uploadedFiles || data.attachments || []).map((file) => ({
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadStatus: 'uploaded',
      fileUrl: file.fileUrl || undefined,
      previewUrl: file.previewUrl || undefined,
    }));

    const finalRecord: FinalRequirementRecord = {
      requirementId,
      referenceNumber,
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp,
      status: 'NEW' as RequirementStatus,

      customer: {
        name: data.customer?.name || data.customerName || '',
        phone: data.customer?.phone || data.phone || '',
        email: data.customer?.email || data.email || '',
      },

      project: {
        type: data.project?.type || data.projectType || '',
        customType: data.project?.customType || data.customProjectType || undefined,
        condition: data.project?.condition || data.projectCondition || 'New Construction',
        location: data.project?.location || data.projectLocation || '',
        area: data.project?.area || data.projectArea || '',
        areaUnit: data.project?.areaUnit || data.projectAreaUnit || 'sq ft',
      },

      services: servicesList,

      architecture,
      interior,
      landscape,

      designPreferences: {
        styles: stylesList,
        needsGuidance,
        additionalPreferences: '',
      },

      budget: {
        range: data.budget || data.budgetDetails?.range || '',
        investmentType: data.budgetDetails?.investmentType || undefined,
      },

      timeline: {
        target: data.timeline || data.timelineDetails?.target || '',
        urgency: data.timelineDetails?.urgency || undefined,
      },

      additionalRequirements: data.additionalRequirements || '',

      attachments,
    };

    return finalRecord;
  },

  /**
   * Submit Requirement with idempotency and double-click lock
   */
  async submitRequirement(
    data: CustomerRequirement,
    idempotencyKey?: string
  ): Promise<{ success: boolean; record: FinalRequirementRecord; referenceNumber: string }> {
    // Check duplicate lock
    if (isSubmittingLock) {
      throw new Error('Submission in progress. Please wait.');
    }

    // Check idempotency cache if key provided
    const key = idempotencyKey || `idem_${data.customerName}_${data.phone}`;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const cached = localStorage.getItem(`${IDEMPOTENCY_STORAGE_KEY}_${key}`);
        if (cached) {
          const parsed = JSON.parse(cached) as FinalRequirementRecord;
          return {
            success: true,
            record: parsed,
            referenceNumber: parsed.referenceNumber,
          };
        }
      } catch {
        // ignore
      }
    }

    // Validate
    const validation = this.validateForSubmission(data);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    try {
      isSubmittingLock = true;

      // Simulate a short realistic network/storage round-trip for premium feel
      await new Promise((resolve) => setTimeout(resolve, 900));

      const requirementId = `req_${generateUUID()}`;
      const referenceNumber = this.generateReferenceNumber();

      const finalRecord = this.buildFinalRecord(data, referenceNumber, requirementId);

      // Persist to submissions collection
      if (typeof window !== 'undefined' && window.localStorage) {
        const existingRaw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
        const list: FinalRequirementRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
        const updatedList = [finalRecord, ...list.filter((r) => r.requirementId !== requirementId)];
        localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updatedList));

        // Store idempotency key for 1 hour
        try {
          localStorage.setItem(`${IDEMPOTENCY_STORAGE_KEY}_${key}`, JSON.stringify(finalRecord));
        } catch {
          // ignore
        }
      }

      // Clear draft after successful submission
      await this.clearDraft();

      return {
        success: true,
        record: finalRecord,
        referenceNumber,
      };
    } catch (err: any) {
      console.error('[RequirementRepository] Submission failed:', err);
      throw err;
    } finally {
      isSubmittingLock = false;
    }
  },

  /**
   * Future Admin Portal integration: retrieve submitted requirements
   */
  async getAllSubmissions(): Promise<FinalRequirementRecord[]> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      }
      return [];
    } catch (err) {
      console.warn('[RequirementRepository] Could not get submissions', err);
      return [];
    }
  },

  /**
   * Future Admin Portal: retrieve submission by friendly reference
   */
  async getSubmissionByReference(referenceNumber: string): Promise<FinalRequirementRecord | null> {
    const list = await this.getAllSubmissions();
    return list.find((item) => item.referenceNumber === referenceNumber) || null;
  },

  /**
   * Future Admin Portal: retrieve submission by internal DB requirement ID
   */
  async getSubmissionById(requirementId: string): Promise<FinalRequirementRecord | null> {
    const list = await this.getAllSubmissions();
    return list.find((item) => item.requirementId === requirementId) || null;
  },
};
