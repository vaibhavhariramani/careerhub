import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";

interface QuestionBankState {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

export const useQuestionBankStore = create<QuestionBankState>()(
  persist(
    (set) => ({
      bookmarks: [],
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((b) => b !== id)
            : [...s.bookmarks, id],
        })),
    }),
    { name: "careerhub-question-bank", storage: createJSONStorage(() => idbStorage) },
  ),
);
