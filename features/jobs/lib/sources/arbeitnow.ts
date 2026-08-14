import type { Job } from "@/core/types/job";
import type { JobSource } from "./types";
import {
  detectFreshGraduate,
  detectInternship,
  detectVisaSponsorship,
  detectWorkMode,
  stripHtml,
} from "../normalize";

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

interface ArbeitnowResponse {
  data: ArbeitnowJob[];
}

export const arbeitnowSource: JobSource = {
  id: "arbeitnow",
  async fetchJobs() {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ArbeitnowResponse;

    return data.data.map((j): Job => {
      const description = stripHtml(j.description).slice(0, 600);
      const haystack = `${j.title} ${j.tags.join(" ")} ${j.job_types.join(" ")} ${description}`;
      return {
        id: `arbeitnow-${j.slug}`,
        source: "arbeitnow",
        title: j.title,
        company: j.company_name,
        location: j.location || "Not specified",
        workMode: detectWorkMode(haystack, j.remote),
        visaSponsorship: detectVisaSponsorship(haystack),
        freshGraduate: detectFreshGraduate(haystack),
        internship: detectInternship(haystack),
        tags: [...j.tags, ...j.job_types].slice(0, 8),
        description,
        applyUrl: j.url,
        postedAt: new Date(j.created_at * 1000).toISOString(),
      };
    });
  },
};
