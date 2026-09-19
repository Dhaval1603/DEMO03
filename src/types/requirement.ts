export type ProjectType =
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Hospitality'
  | 'Healthcare'
  | 'Institutional'
  | 'Retail'
  | 'Office / Corporate'
  | 'Other';

export type ServiceOption =
  | 'Architecture'
  | 'Interior Design'
  | 'Landscape Design'
  | 'Architecture + Interior'
  | 'Architecture + Landscape'
  | 'Interior + Landscape'
  | 'Complete Design (Architecture + Interior + Landscape)';

export type ProjectCondition =
  | 'New Construction'
  | 'Renovation'
  | 'Extension'
  | 'Interior Fit-out'
  | 'Other';

export type RequirementStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'CONSULTATION'
  | 'PROPOSAL'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface UploadedFileRecord {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadStatus?: 'uploaded' | 'pending' | 'failed';
  fileUrl?: string;
  previewUrl?: string;
  dataUrl?: string;
}

export interface StructuredCustomer {
  name: string;
  phone: string;
  email: string;
}

export interface StructuredProject {
  type: ProjectType | '';
  customType?: string;
  location: string;
  area: string;
  areaUnit: 'sq ft' | 'sq yards' | 'sq meters' | 'acres';
  condition: ProjectCondition;
}

export interface StructuredArchitecture {
  purpose?: string;
  propertyType?: string;
  scope?: string[];
  businessType?: string;
  floors?: string;
  familyMembers?: string;
  bedrooms?: string;
  bathrooms?: string;
  parking?: string;
  vastu?: string;
  outdoorElements?: string[];
  specialFeatures?: string[];
  expectedUsers?: string;
  commercialZones?: string[];
  industrialType?: string;
  industrialZones?: string[];
  industrialMachinery?: string[];
  specialRequirements?: string;
  rawAnswers: Record<string, any>;
}

export interface StructuredInterior {
  selectedSpaces: string[];
  customSpaces: string[];
  spaceDetails: Record<string, string[]>; // e.g. { "Living Room": ["Seating", "TV Unit"], "Kitchen": [...] }
  rawAnswers: Record<string, any>;
}

export interface StructuredLandscape {
  selectedAreas: string[];
  customAreas: string[];
  existingOrNew?: string;
  approxArea?: string;
  features: string[];
  specialNeeds: string[];
  rawAnswers: Record<string, any>;
}

export interface StructuredDesignPreferences {
  styles: string[];
  needsGuidance: boolean;
  rawAnswers: Record<string, any>;
}

export interface StructuredBudget {
  range: string;
  investmentType?: string;
}

export interface StructuredTimeline {
  target: string;
  urgency?: string;
}

export interface FinalRequirementRecord {
  requirementId: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  status: RequirementStatus;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  project: {
    type: string;
    customType?: string;
    condition: string;
    location: string;
    area: string;
    areaUnit?: string;
  };

  services: string[];

  architecture?: {
    requirements: string[];
    details: Record<string, any>;
  };

  interior?: {
    spaces: string[];
    requirements: Record<string, any>;
    details: Record<string, any>;
  };

  landscape?: {
    areas: string[];
    requirements: Record<string, any>;
    details: Record<string, any>;
  };

  designPreferences: {
    styles: string[];
    needsGuidance: boolean;
    additionalPreferences: string;
  };

  budget: {
    range?: string;
    investmentType?: string;
  };

  timeline: {
    target?: string;
    urgency?: string;
  };

  additionalRequirements: string;

  attachments: UploadedFileRecord[];
}

export interface CustomerRequirement {
  requirementId: string;
  referenceNumber?: string;
  createdAt: string;
  updatedAt?: string;

  // Unified structured entities for clean future Admin Portal consumption
  customer: StructuredCustomer;
  project: StructuredProject;
  services: ServiceOption | '';
  activeServices: {
    hasArchitecture: boolean;
    hasInterior: boolean;
    hasLandscape: boolean;
  };
  architecture: StructuredArchitecture;
  interior: StructuredInterior;
  landscape: StructuredLandscape;
  designPreferences: StructuredDesignPreferences;
  budgetDetails: StructuredBudget;
  timelineDetails: StructuredTimeline;
  attachments: UploadedFileRecord[];
  additionalRequirements: string;
  rawAnswers: Record<string, any>;
  status: 'draft' | 'submitted';

  // Flat fields maintained for backward-compatibility with UI components & exports
  customerName: string;
  phone: string;
  email: string;
  projectType: ProjectType | '';
  customProjectType?: string;
  projectLocation: string;
  projectArea: string;
  projectAreaUnit: 'sq ft' | 'sq yards' | 'sq meters' | 'acres';
  projectCondition: ProjectCondition;
  selectedSpaces: Record<string, string[]>;
  customSpaces: string[];
  designPreferencesList: string[]; // List of styles
  budget: string;
  timeline: string;
  uploadedFiles: UploadedFileRecord[];
  submissionStatus: 'draft' | 'submitted';
}

export type ConsultationStep =
  | 'welcome'
  | 'projectType'
  | 'service'
  | 'basicDetails'
  | 'architecture' // Dynamic Architecture step
  | 'interior'     // Dynamic Interior space & details step
  | 'landscape'    // Dynamic Landscape areas & features step
  | 'spaces'       // Legacy alias for compatibility
  | 'preferences'  // Design atmosphere / style
  | 'details'      // Client aspirations / special priorities
  | 'budgetTimeline' // Investment & Schedule
  | 'uploads'      // Drawings & file attachments
  | 'summary'      // Smart summary & completeness check
  | 'success';     // Reference ID & Next Steps
