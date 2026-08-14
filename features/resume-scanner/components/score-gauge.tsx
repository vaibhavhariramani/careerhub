import { Card, CardContent } from "@/shared/components/ui/card";
import { ProgressRing } from "@/shared/components/ui/progress-ring";
import type { ScanResult } from "@/core/types/scan";

export function ScoreGauge({ result }: { result: ScanResult }) {
  const verdict =
    result.overallScore >= 80
      ? "Great shape — minor polish left."
      : result.overallScore >= 50
        ? "Good start — a few gaps to close."
        : "Needs work before you apply.";

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
        <ProgressRing value={result.overallScore} size={148} strokeWidth={12} label="/ 100" />
        <div>
          <p className="text-lg font-semibold">Overall ATS Score</p>
          <p className="mt-1 text-sm text-muted-foreground">{verdict}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {result.fileName} · {result.wordCount} words
        </p>
      </CardContent>
    </Card>
  );
}
