import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/cn";
import type { Achievement } from "@/core/types/profile";

export function AchievementsGrid({ achievements }: { achievements: Achievement[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={cn(
              "flex flex-col items-center gap-2 rounded-md border p-4 text-center",
              a.unlockedAt ? "border-accent/30 bg-accent-soft" : "border-border opacity-50",
            )}
          >
            <Award className={cn("h-6 w-6", a.unlockedAt ? "text-accent" : "text-muted-foreground")} />
            <p className="text-xs font-semibold">{a.label}</p>
            <p className="text-[11px] text-muted-foreground">{a.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
