import { DEFAULT_SECTION_ORDER, type ResumeData } from "@/core/types/resume";

export const emptyResumeData: ResumeData = {
  contact: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], languages: [], tools: [] },
  certifications: [],
  achievements: [],
  interests: [],
  templateId: "minimal",
  sectionOrder: DEFAULT_SECTION_ORDER,
};

export function makeId() {
  return crypto.randomUUID();
}
