import type { Job } from "@/core/types/job";

export interface JobSource {
  id: Job["source"];
  fetchJobs(): Promise<Job[]>;
}
