import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { EnhanceRebuildButton } from "./enhance-rebuild-button";
import type { ScanResult } from "@/core/types/scan";

export function EnhanceRebuildCard({ result }: { result: ScanResult }) {
  return (
    <Card className="border-accent/30 bg-accent-soft/40">
      <CardContent className="flex flex-col gap-3 pt-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <p className="text-sm font-semibold">Turn this into a better resume</p>
        </div>
        <p className="text-xs text-muted-foreground">
          We&apos;ll pre-fill the Resume Builder with your content, applying the suggestions
          above — weak bullets rewritten with strong action verbs, sections organized, and a
          starter summary if yours was missing. Nothing is invented: review and adjust everything
          before exporting.
        </p>
        <EnhanceRebuildButton result={result} />
      </CardContent>
    </Card>
  );
}
