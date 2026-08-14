import type { Job } from "@/core/types/job";
import type { JobSource } from "./types";
import {
  detectFreshGraduate,
  detectInternship,
  detectVisaSponsorship,
  detectWorkMode,
  stripHtml,
} from "../normalize";

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

interface RemotiveResponse {
  jobs: RemotiveJob[];
}

export const remotiveSource: JobSource = {
  id: "remotive",
  async fetchJobs() {
    const res = await fetch("https://remotive.com/api/remote-jobs?limit=80", {
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as RemotiveResponse;

    return data.jobs.map((j): Job => {
      const description = stripHtml(j.description).slice(0, 600);
      const haystack = `${j.title} ${j.tags.join(" ")} ${description}`;
      return {
        id: `remotive-${j.id}`,
        source: "remotive",
        title: j.title,
        company: j.company_name,
        companyLogo: j.company_logo,
        location: j.candidate_required_location || "Remote",
        workMode: detectWorkMode(haystack, true),
        salary: j.salary || undefined,
        visaSponsorship: detectVisaSponsorship(haystack),
        freshGraduate: detectFreshGraduate(haystack),
        internship: detectInternship(haystack),
        tags: j.tags.slice(0, 8),
        description,
        applyUrl: j.url,
        postedAt: j.publication_date,
      };
    });
  },
};
