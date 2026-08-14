import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";
import type { IndustryId } from "@/core/types/question";

export interface StarEntry {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  createdAt: string;
}

interface InterviewPrepState {
  selectedIndustry: IndustryId;
  completedQuestionIds: string[];
  starEntries: StarEntry[];
  setIndustry: (id: IndustryId) => void;
  markCompleted: (id: string) => void;
  saveStarEntry: (entry: Omit<StarEntry, "id" | "createdAt">) => void;
  deleteStarEntry: (id: string) => void;
}

export const useInterviewPrepStore = create<InterviewPrepState>()(
  persist(
    (set) => ({
      selectedIndustry: "software-engineering",
      completedQuestionIds: [],
      starEntries: [],
      setIndustry: (id) => set({ selectedIndustry: id }),
      markCompleted: (id) =>
        set((s) => ({
          completedQuestionIds: s.completedQuestionIds.includes(id)
            ? s.completedQuestionIds
            : [...s.completedQuestionIds, id],
        })),
      saveStarEntry: (entry) =>
        set((s) => ({
          starEntries: [
            { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...s.starEntries,
          ],
        })),
      deleteStarEntry: (id) => set((s) => ({ starEntries: s.starEntries.filter((e) => e.id !== id) })),
    }),
    { name: "careerhub-interview-prep", storage: createJSONStorage(() => idbStorage) },
  ),
);
