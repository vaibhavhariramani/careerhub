import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/cn";
import type { ScanResult } from "@/core/types/scan";

function scoreOf(result: ScanResult, id: string) {
  return result.categories.find((c) => c.id === id)?.score ?? 0;
}

export function AtsChecklist({ result }: { result: ScanResult }) {
  const items = [
    { label: "Contact details", pass: scoreOf(result, "contactInfo") >= 75 },
    { label: "Projects section", pass: !result.missingSections.includes("Projects") },
    { label: "Quantified metrics", pass: scoreOf(result, "achievements") >= 50 },
    { label: "Skills section", pass: !result.missingSections.includes("Technical Skills") },
    { label: "Strong action verbs", pass: scoreOf(result, "actionVerbs") >= 60 },
    { label: "Role-matched keywords", pass: scoreOf(result, "keywords") >= 50 },
    { label: "No parsing issues (text extracted cleanly)", pass: result.wordCount > 100 },
    { label: "ATS-friendly length", pass: scoreOf(result, "length") >= 70 },
    { label: "Clear section headings", pass: scoreOf(result, "formatting") >= 60 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>ATS Checklist</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                item.pass ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
              )}
            >
              {item.pass ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            </span>
            <span className={item.pass ? "text-foreground" : "text-muted-foreground"}>
              {item.label}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
