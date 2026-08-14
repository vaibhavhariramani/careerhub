import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "@/shared/lib/idb-storage";
import type { Job, JobApplicationStatus, SavedJob } from "@/core/types/job";

interface JobsState {
  savedJobs: SavedJob[];
  saveJob: (job: Job) => void;
  removeSavedJob: (id: string) => void;
  updateStatus: (id: string, status: JobApplicationStatus) => void;
  isSaved: (id: string) => boolean;
}

export const useJobsStore = create<JobsState>()(
  persist(
    (set, get) => ({
      savedJobs: [],
      saveJob: (job) =>
        set((s) =>
          s.savedJobs.some((sj) => sj.job.id === job.id)
            ? s
            : { savedJobs: [{ job, status: "saved", savedAt: new Date().toISOString() }, ...s.savedJobs] },
        ),
      removeSavedJob: (id) => set((s) => ({ savedJobs: s.savedJobs.filter((sj) => sj.job.id !== id) })),
      updateStatus: (id, status) =>
        set((s) => ({
          savedJobs: s.savedJobs.map((sj) => (sj.job.id === id ? { ...sj, status } : sj)),
        })),
      isSaved: (id) => get().savedJobs.some((sj) => sj.job.id === id),
    }),
    { name: "careerhub-jobs", storage: createJSONStorage(() => idbStorage) },
  ),
);
