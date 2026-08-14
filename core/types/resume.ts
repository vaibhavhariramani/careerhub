export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photoDataUrl?: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  techStack: string;
  description: string;
  github?: string;
  liveDemo?: string;
}

export interface SkillGroup {
  technical: string[];
  soft: string[];
  languages: string[];
  tools: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export type ResumeSectionId =
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "achievements"
  | "interests";

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup;
  certifications: CertificationEntry[];
  achievements: string[];
  interests: string[];
  templateId: ResumeTemplateId;
  sectionOrder: ResumeSectionId[];
}

export type ResumeTemplateId =
  | "minimal"
  | "professional"
  | "classic"
  | "modern"
  | "tech"
  | "student"
  | "executive";

export const DEFAULT_SECTION_ORDER: ResumeSectionId[] = [
  "summary",
  "experience",
  "projects",
  "education",
  "skills",
  "certifications",
  "achievements",
  "interests",
];
