"use client";

import { Briefcase, MessagesSquare, ScanSearch, UserRound } from "lucide-react";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { useResumeScannerStore } from "@/features/resume-scanner/store";
import { useJobsStore } from "@/features/jobs/store";
import { useInterviewPrepStore } from "@/features/interview-prep/store";
import { useProfileStore } from "@/features/profile/store";
import { profileCompletion } from "@/features/profile/lib/completion";
import { INDUSTRIES } from "@/features/interview-prep/data/industries";

const TOTAL_MOCK_QUESTIONS = INDUSTRIES.reduce(
  (sum, i) => sum + i.behavioral.length + i.technical.length + i.hr.length,
  0,
);

export default function DashboardPage() {
  const scanResult = useResumeScannerStore((s) => s.result ?? s.history[0]);
  const savedJobs = useJobsStore((s) => s.savedJobs);
  const completedQuestions = useInterviewPrepStore((s) => s.completedQuestionIds.length);
  const profile = useProfileStore((s) => s.profile);
  const activity = useProfileStore((s) => s.activity);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold tracking-tight">
        {profile.fullName ? `Welcome back, ${profile.fullName.split(" ")[0]}` : "Welcome to CareerHub"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Here&apos;s where your job search stands today.</p>

      <div className="mt-6">
        <QuickActions />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={ScanSearch}
          label="Resume Score"
          value={scanResult ? `${scanResult.overallScore}/100` : "—"}
          hint={scanResult ? scanResult.fileName : "Scan a resume to get started"}
        />
        <StatCard
          icon={Briefcase}
          label="Saved Jobs"
          value={String(savedJobs.length)}
          hint={`${savedJobs.filter((j) => j.status === "applied").length} applied`}
        />
        <StatCard
          icon={MessagesSquare}
          label="Interview Progress"
          value={`${completedQuestions}/${TOTAL_MOCK_QUESTIONS}`}
          hint="Mock questions practiced"
        />
        <StatCard
          icon={UserRound}
          label="Profile Completion"
          value={`${profileCompletion(profile)}%`}
          hint="Keep your profile up to date"
        />
      </div>

      <div className="mt-6">
        <RecentActivity activity={activity} />
      </div>
    </div>
  );
}
