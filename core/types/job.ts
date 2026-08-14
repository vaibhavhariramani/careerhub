export type WorkMode = "remote" | "hybrid" | "onsite";

export interface Job {
  id: string;
  source: "remotive" | "arbeitnow";
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: WorkMode;
  salary?: string;
  visaSponsorship: boolean;
  freshGraduate: boolean;
  internship: boolean;
  tags: string[];
  description: string;
  applyUrl: string;
  postedAt: string;
}

export type JobApplicationStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "rejected"
  | "offer"
  | "accepted";

export interface SavedJob {
  job: Job;
  status: JobApplicationStatus;
  savedAt: string;
  notes?: string;
}

export interface JobFilters {
  keyword: string;
  location: string;
  workMode: WorkMode | "any";
  visaSponsorship: boolean;
  freshGraduate: boolean;
  internship: boolean;
}
