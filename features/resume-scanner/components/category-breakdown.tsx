import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/cn";
import type { CategoryScore } from "@/core/types/scan";

const statusVariant = {
  green: "success",
  yellow: "warning",
  red: "danger",
} as const;

const barColor = {
  green: "bg-success",
  yellow: "bg-warning",
  red: "bg-danger",
} as const;

export function CategoryBreakdown({ categories }: { categories: CategoryScore[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {categories.map((c) => (
          <div key={c.id}>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{c.label}</span>
              <Badge variant={statusVariant[c.status]}>{Math.round(c.score)}/100</Badge>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all duration-700", barColor[c.status])}
                style={{ width: `${c.score}%` }}
              />
            </div>
            {c.notes[0] ? (
              <p className="mt-1.5 text-xs text-muted-foreground">{c.notes[0]}</p>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
