import type { RoleId } from "@/core/config/roles";

export type ScoreCategoryId =
  | "formatting"
  | "keywords"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "grammar"
  | "actionVerbs"
  | "achievements"
  | "readability"
  | "length"
  | "contactInfo";

export interface CategoryScore {
  id: ScoreCategoryId;
  label: string;
  score: number; // 0-100
  weight: number; // fraction of overall score
  status: "green" | "yellow" | "red";
  notes: string[];
}

export interface DetectedContact {
  email: boolean;
  phone: boolean;
  linkedin: boolean;
  github: boolean;
  portfolio: boolean;
  location: boolean;
}

export type MissingSection =
  | "Summary"
  | "Projects"
  | "Certifications"
  | "Achievements"
  | "Technical Skills"
  | "Languages"
  | "Awards"
  | "Volunteer Work"
  | "Publications"
  | "Leadership";

export interface Suggestion {
  id: string;
  category: ScoreCategoryId;
  weak: string;
  better: string;
  reason: string;
}

export interface ScanResult {
  fileName: string;
  rawText: string;
  wordCount: number;
  overallScore: number;
  categories: CategoryScore[];
  contact: DetectedContact;
  missingSections: MissingSection[];
  suggestions: Suggestion[];
  matchedKeywords: string[];
  missingKeywords: string[];
  role: RoleId | null;
  scannedAt: string;
}

export interface HeatmapSegment {
  section: string;
  status: "green" | "yellow" | "red";
  text: string;
}
