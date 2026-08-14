"use client";

import { ExternalLink, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useJobsStore } from "@/features/jobs/store";
import type { JobApplicationStatus, SavedJob } from "@/core/types/job";

const STATUS_OPTIONS: { value: JobApplicationStatus; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export function SavedJobCard({ savedJob }: { savedJob: SavedJob }) {
  const updateStatus = useJobsStore((s) => s.updateStatus);
  const removeSavedJob = useJobsStore((s) => s.removeSavedJob);
  const { job, status } = savedJob;

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-5">
        <div className="flex items-start gap-3">
          <Avatar name={job.company} src={job.companyLogo} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{job.title}</p>
            <p className="text-xs text-muted-foreground">{job.company}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => removeSavedJob(job.id)}>
            <Trash2 className="h-4 w-4 text-danger" />
          </Button>
        </div>

        <Select value={status} onValueChange={(v) => updateStatus(job.id, v as JobApplicationStatus)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button asChild size="sm" variant="outline" className="w-fit">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            View listing <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
