import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";
import type { RoleId } from "@/core/config/roles";
import type { ScanResult } from "@/core/types/scan";

interface ResumeScannerState {
  result: ScanResult | null;
  history: ScanResult[];
  role: RoleId | null;
  jobDescription: string;
  status: "idle" | "parsing" | "scoring" | "done" | "error";
  error: string | null;
  setRole: (role: RoleId | null) => void;
  setJobDescription: (jobDescription: string) => void;
  setStatus: (status: ResumeScannerState["status"]) => void;
  setError: (error: string | null) => void;
  setResult: (result: ScanResult) => void;
  reset: () => void;
}

export const useResumeScannerStore = create<ResumeScannerState>()(
  persist(
    (set) => ({
      result: null,
      history: [],
      role: null,
      jobDescription: "",
      status: "idle",
      error: null,
      setRole: (role) => set({ role }),
      setJobDescription: (jobDescription) => set({ jobDescription }),
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error, status: error ? "error" : "idle" }),
      setResult: (result) =>
        set((s) => ({
          result,
          status: "done",
          error: null,
          history: [result, ...s.history].slice(0, 10),
        })),
      reset: () => set({ result: null, status: "idle", error: null }),
    }),
    {
      name: "careerhub-resume-scanner",
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => ({ history: s.history, role: s.role, jobDescription: s.jobDescription }),
    },
  ),
);
