import type { ResumeTemplateId } from "@/core/types/resume";

export interface TemplateConfig {
  id: ResumeTemplateId;
  label: string;
  description: string;
  headingFont: string;
  bodyFont: string;
  accent: string;
  headingStyle: "uppercase-bar" | "underline" | "plain" | "pill";
  align: "left" | "center";
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean, grayscale, generous whitespace.",
    headingFont: "font-sans",
    bodyFont: "font-sans",
    accent: "#111111",
    headingStyle: "underline",
    align: "left",
  },
  {
    id: "professional",
    label: "Professional",
    description: "Navy accents, classic business structure.",
    headingFont: "font-sans font-semibold",
    bodyFont: "font-sans",
    accent: "#1e3a8a",
    headingStyle: "uppercase-bar",
    align: "left",
  },
  {
    id: "classic",
    label: "Classic",
    description: "Traditional serif, centered header.",
    headingFont: "font-serif",
    bodyFont: "font-serif",
    accent: "#3f3f46",
    headingStyle: "underline",
    align: "center",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Bold headers with a violet accent bar.",
    headingFont: "font-sans font-bold",
    bodyFont: "font-sans",
    accent: "#6d28d9",
    headingStyle: "uppercase-bar",
    align: "left",
  },
  {
    id: "tech",
    label: "Tech",
    description: "Sharp headers, teal accent, tag-style skills.",
    headingFont: "font-sans font-bold",
    bodyFont: "font-sans",
    accent: "#0f766e",
    headingStyle: "pill",
    align: "left",
  },
  {
    id: "student",
    label: "Student",
    description: "Friendly layout leading with education & projects.",
    headingFont: "font-sans font-semibold",
    bodyFont: "font-sans",
    accent: "#0369a1",
    headingStyle: "pill",
    align: "left",
  },
  {
    id: "executive",
    label: "Executive",
    description: "Elegant serif with a gold accent, formal tone.",
    headingFont: "font-serif font-semibold",
    bodyFont: "font-serif",
    accent: "#92400e",
    headingStyle: "underline",
    align: "center",
  },
];

export function getTemplate(id: ResumeTemplateId): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]!;
}

export const SECTION_ORDER_FOR_TEMPLATE: Partial<Record<ResumeTemplateId, string[]>> = {
  student: ["summary", "education", "projects", "experience", "skills", "certifications", "achievements", "interests"],
};
