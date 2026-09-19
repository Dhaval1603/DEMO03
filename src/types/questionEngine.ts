import { ProjectType, ServiceOption, ProjectCondition } from './requirement';

export type QuestionType =
  | 'single_select'
  | 'multi_select'
  | 'text'
  | 'long_text'
  | 'number'
  | 'range'
  | 'date'
  | 'boolean'
  | 'image_select'
  | 'file_upload';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  tag?: string;
  isGuidance?: boolean;
}

export interface EngineContext {
  projectType: ProjectType | '' | string;
  customProjectType?: string;
  services: ServiceOption | '' | string;
  hasArchitecture: boolean;
  hasInterior: boolean;
  hasLandscape: boolean;
  selectedSpaces: string[];
  answers: Record<string, any>;
}

export interface QuestionConfig {
  id: string;
  section: string;
  category: 'architecture' | 'interior' | 'landscape' | 'general' | 'preferences';
  question: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  multipleSelection?: boolean;
  conditionalRules?: (context: EngineContext) => boolean;
  service?: string[] | string;
  projectType?: string[] | string;
  placeholder?: string;
  helpText?: string; // "Why are we asking this?"
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  allowCustomInput?: boolean;
  customInputPlaceholder?: string;
  parentSpaceId?: string; // For room-specific interior questions e.g. 'Living Room', 'Kitchen', 'Bedroom'
  guidanceValue?: string | string[];
}

export interface QuestionSectionGroup {
  id: string;
  title: string;
  description?: string;
  questions: QuestionConfig[];
}
