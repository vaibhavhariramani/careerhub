"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { ProgressRing } from "@/shared/components/ui/progress-ring";
import { Avatar } from "@/shared/components/ui/avatar";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { AchievementsGrid } from "@/features/profile/components/achievements-grid";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { profileCompletion } from "@/features/profile/lib/completion";
import { useProfileStore } from "@/features/profile/store";
import { useResumeScannerStore } from "@/features/resume-scanner/store";
import { useJobsStore } from "@/features/jobs/store";
import { useInterviewPrepStore } from "@/features/interview-prep/store";

export default function ProfilePage() {
  const profile = useProfileStore((s) => s.profile);
  const achievements = useProfileStore((s) => s.achievements);
  const activity = useProfileStore((s) => s.activity);
  const scanResult = useResumeScannerStore((s) => s.result ?? s.history[0]);
  const savedJobs = useJobsStore((s) => s.savedJobs);
  const completedQuestions = useInterviewPrepStore((s) => s.completedQuestionIds.length);
  const completion = profileCompletion(profile);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
            <Avatar name={profile.fullName || "Guest"} size={64} />
            <div>
              <p className="text-base font-semibold">{profile.fullName || "Add your name"}</p>
              <p className="text-sm text-muted-foreground">{profile.headline || "Add a headline"}</p>
            </div>
            <ProgressRing value={completion} size={100} strokeWidth={8} label="complete" />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Resume Score", value: scanResult ? `${scanResult.overallScore}` : "—" },
              { label: "Saved Jobs", value: String(savedJobs.length) },
              { label: "Applied", value: String(savedJobs.filter((j) => j.status === "applied").length) },
              { label: "Questions Practiced", value: String(completedQuestions) },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="pt-5 text-center">
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ProfileForm />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AchievementsGrid achievements={achievements} />
        <RecentActivity activity={activity} />
      </div>
    </div>
  );
}
