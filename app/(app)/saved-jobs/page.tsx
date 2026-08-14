"use client";

import { SavedJobCard } from "@/features/jobs/components/saved-job-card";
import { useJobsStore } from "@/features/jobs/store";
import type { JobApplicationStatus } from "@/core/types/job";

const COLUMNS: { status: JobApplicationStatus; label: string }[] = [
  { status: "saved", label: "Saved" },
  { status: "applied", label: "Applied" },
  { status: "interviewing", label: "Interviewing" },
  { status: "offer", label: "Offer" },
  { status: "accepted", label: "Accepted" },
  { status: "rejected", label: "Rejected" },
];

export default function SavedJobsPage() {
  const savedJobs = useJobsStore((s) => s.savedJobs);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold tracking-tight">Saved Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">Track your applications from saved to offer.</p>

      {savedJobs.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          You haven&apos;t saved any jobs yet. Browse the{" "}
          <a href="/jobs" className="text-accent underline">
            Jobs
          </a>{" "}
          page to get started.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {COLUMNS.map((col) => {
            const items = savedJobs.filter((sj) => sj.status === col.status);
            return (
              <div key={col.status} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  {col.label} ({items.length})
                </p>
                <div className="flex flex-col gap-3">
                  {items.map((sj) => (
                    <SavedJobCard key={sj.job.id} savedJob={sj} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
