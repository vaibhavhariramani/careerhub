import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Suggestion } from "@/core/types/scan";

export function SuggestionsList({ suggestions }: { suggestions: Suggestion[] }) {
  if (!suggestions.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {suggestions.map((s) => (
          <div key={s.id} className="rounded-md border border-border p-4">
            <p className="flex items-start gap-2 text-sm text-danger">
              <span aria-hidden>❌</span> {s.weak}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-success">
              <span aria-hidden>✅</span> {s.better}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3" /> {s.reason}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
