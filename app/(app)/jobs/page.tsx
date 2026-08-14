"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { FiltersPanel } from "@/features/jobs/components/filters-panel";
import { JobCard } from "@/features/jobs/components/job-card";
import { useJobs } from "@/features/jobs/hooks/use-jobs";
import type { JobFilters } from "@/core/types/job";

const DEFAULT_FILTERS: JobFilters = {
  keyword: "",
  location: "",
  workMode: "any",
  visaSponsorship: false,
  freshGraduate: false,
  internship: false,
};

export default function JobsPage() {
  const { jobs, status } = useJobs();
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const kw = filters.keyword.trim().toLowerCase();
    const loc = filters.location.trim().toLowerCase();
    return jobs.filter((job) => {
      if (kw && !`${job.title} ${job.company}`.toLowerCase().includes(kw)) return false;
      if (loc && !job.location.toLowerCase().includes(loc)) return false;
      if (filters.workMode !== "any" && job.workMode !== filters.workMode) return false;
      if (filters.visaSponsorship && !job.visaSponsorship) return false;
      if (filters.freshGraduate && !job.freshGraduate) return false;
      if (filters.internship && !job.internship) return false;
      return true;
    });
  }, [jobs, filters]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Live listings aggregated from Remotive and Arbeitnow.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-4">
        <Card className="h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersPanel filters={filters} onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-3">
          {status === "loading" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="rounded-md border border-danger/30 bg-danger-soft p-4 text-sm text-danger">
              Couldn&apos;t load jobs right now. Please try again shortly.
            </p>
          )}

          {status === "done" && (
            <>
              <p className="text-sm text-muted-foreground">{filtered.length} jobs found</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  No jobs match your filters. Try broadening your search.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
