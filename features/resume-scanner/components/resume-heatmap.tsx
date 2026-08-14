import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/cn";
import type { CategoryScore } from "@/core/types/scan";

const bg = {
  green: "bg-success-soft text-success border-success/30",
  yellow: "bg-warning-soft text-warning border-warning/30",
  red: "bg-danger-soft text-danger border-danger/30",
} as const;

export function ResumeHeatmap({ categories }: { categories: CategoryScore[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className={cn(
                "rounded-md border px-3 py-3 text-center text-xs font-medium",
                bg[c.status],
              )}
            >
              {c.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
