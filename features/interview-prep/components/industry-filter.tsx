"use client";

import { INDUSTRIES } from "@/features/interview-prep/data/industries";
import { useInterviewPrepStore } from "@/features/interview-prep/store";
import { cn } from "@/shared/lib/cn";

export function IndustryFilter() {
  const selected = useInterviewPrepStore((s) => s.selectedIndustry);
  const setIndustry = useInterviewPrepStore((s) => s.setIndustry);

  return (
    <div className="flex flex-wrap gap-2">
      {INDUSTRIES.map((industry) => (
        <button
          key={industry.id}
          onClick={() => setIndustry(industry.id)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            selected === industry.id
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-muted-foreground hover:bg-muted/50",
          )}
        >
          {industry.label}
        </button>
      ))}
    </div>
  );
}
