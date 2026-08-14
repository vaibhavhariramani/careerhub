"use client";

import { Bookmark, Clock, ExternalLink, MapPin } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Avatar } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/cn";
import { timeAgo } from "@/shared/lib/format-date";
import { useJobsStore } from "@/features/jobs/store";
import { useProfileStore } from "@/features/profile/store";
import type { Job } from "@/core/types/job";

export function JobCard({ job }: { job: Job }) {
  const isSaved = useJobsStore((s) => s.isSaved(job.id));
  const saveJob = useJobsStore((s) => s.saveJob);
  const removeSavedJob = useJobsStore((s) => s.removeSavedJob);
  const { logActivity, unlockAchievement } = useProfileStore();

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-5">
        <div className="flex items-start gap-3">
          <Avatar name={job.company} src={job.companyLogo} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{job.title}</p>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Save job"
            onClick={() => {
              if (isSaved) {
                removeSavedJob(job.id);
              } else {
                saveJob(job);
                logActivity({ type: "job", message: `Saved "${job.title}" at ${job.company}` });
                unlockAchievement("first-save");
              }
            }}
          >
            <Bookmark className={cn("h-4 w-4", isSaved && "fill-accent text-accent")} />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {timeAgo(job.postedAt)}
          </span>
          {job.salary && <span>{job.salary}</span>}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">{job.workMode}</Badge>
          {job.visaSponsorship && <Badge variant="success">Visa sponsorship</Badge>}
          {job.freshGraduate && <Badge variant="default">Fresh grad friendly</Badge>}
          {job.internship && <Badge variant="warning">Internship</Badge>}
        </div>

        <p className="line-clamp-2 text-xs text-muted-foreground">{job.description}</p>

        <Button asChild size="sm" variant="outline" className="w-fit">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
