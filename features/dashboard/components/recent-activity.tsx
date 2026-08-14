import { Briefcase, FileEdit, Library, MessagesSquare, ScanSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { ActivityEntry } from "@/core/types/profile";
import { timeAgo } from "@/shared/lib/format-date";

const ICONS: Record<ActivityEntry["type"], typeof ScanSearch> = {
  scan: ScanSearch,
  resume: FileEdit,
  interview: MessagesSquare,
  job: Briefcase,
  question: Library,
};

export function RecentActivity({ activity }: { activity: ActivityEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing yet — scan a resume, save a job, or run a mock interview to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {activity.slice(0, 8).map((entry) => {
              const Icon = ICONS[entry.type];
              return (
                <li key={entry.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{entry.message}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(entry.at)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
