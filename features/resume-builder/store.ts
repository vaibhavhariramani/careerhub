import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";
import type {
  CertificationEntry,
  ContactInfo,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  ResumeData,
  ResumeSectionId,
  ResumeTemplateId,
  SkillGroup,
} from "@/core/types/resume";
import { emptyResumeData, makeId } from "./lib/default-resume";

export const WIZARD_STEPS = [
  "personal",
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
  "certifications",
  "achievements",
  "interests",
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];

interface ResumeBuilderState {
  data: ResumeData;
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateContact: (patch: Partial<ContactInfo>) => void;
  updateSummary: (summary: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;
  updateSkills: (patch: Partial<SkillGroup>) => void;
  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;
  setAchievements: (achievements: string[]) => void;
  setInterests: (interests: string[]) => void;
  setTemplate: (templateId: ResumeTemplateId) => void;
  reorderSections: (order: ResumeSectionId[]) => void;
  loadResumeData: (data: ResumeData) => void;
  reset: () => void;
}

export const useResumeBuilderStore = create<ResumeBuilderState>()(
  persist(
    (set) => ({
      data: emptyResumeData,
      step: 0,
      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, WIZARD_STEPS.length - 1) })),
      prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),

      updateContact: (patch) => set((s) => ({ data: { ...s.data, contact: { ...s.data.contact, ...patch } } })),
      updateSummary: (summary) => set((s) => ({ data: { ...s.data, summary } })),

      addEducation: () =>
        set((s) => ({
          data: {
            ...s.data,
            education: [
              ...s.data.education,
              { id: makeId(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
            ],
          },
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          data: { ...s.data, education: s.data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)) },
        })),
      removeEducation: (id) =>
        set((s) => ({ data: { ...s.data, education: s.data.education.filter((e) => e.id !== id) } })),

      addExperience: () =>
        set((s) => ({
          data: {
            ...s.data,
            experience: [
              ...s.data.experience,
              { id: makeId(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, achievements: [""] },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((s) => ({
          data: { ...s.data, experience: s.data.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)) },
        })),
      removeExperience: (id) =>
        set((s) => ({ data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) } })),

      addProject: () =>
        set((s) => ({
          data: {
            ...s.data,
            projects: [...s.data.projects, { id: makeId(), name: "", techStack: "", description: "", github: "", liveDemo: "" }],
          },
        })),
      updateProject: (id, patch) =>
        set((s) => ({
          data: { ...s.data, projects: s.data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) },
        })),
      removeProject: (id) =>
        set((s) => ({ data: { ...s.data, projects: s.data.projects.filter((p) => p.id !== id) } })),

      updateSkills: (patch) => set((s) => ({ data: { ...s.data, skills: { ...s.data.skills, ...patch } } })),

      addCertification: () =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: [...s.data.certifications, { id: makeId(), name: "", issuer: "", date: "" }],
          },
        })),
      updateCertification: (id, patch) =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.map((c) => (c.id === id ? { ...c, ...patch } : c)),
          },
        })),
      removeCertification: (id) =>
        set((s) => ({ data: { ...s.data, certifications: s.data.certifications.filter((c) => c.id !== id) } })),

      setAchievements: (achievements) => set((s) => ({ data: { ...s.data, achievements } })),
      setInterests: (interests) => set((s) => ({ data: { ...s.data, interests } })),
      setTemplate: (templateId) => set((s) => ({ data: { ...s.data, templateId } })),
      reorderSections: (sectionOrder) => set((s) => ({ data: { ...s.data, sectionOrder } })),

      loadResumeData: (data) => set({ data, step: 0 }),
      reset: () => set({ data: emptyResumeData, step: 0 }),
    }),
    { name: "careerhub-resume-builder", storage: createJSONStorage(() => idbStorage) },
  ),
);
