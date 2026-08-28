import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Search",
  description:
    "Search live internship and job listings aggregated from Remotive and Arbeitnow, with filters for remote work, visa sponsorship, and fresh-graduate friendly roles.",
  alternates: { canonical: "/jobs" },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
