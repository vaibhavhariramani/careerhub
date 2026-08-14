"use client";

import { cn } from "@/shared/lib/cn";
import type { QuestionCategory } from "@/core/types/question";

const CATEGORIES: { value: QuestionCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "hr", label: "HR" },
  { value: "scenario", label: "Scenario" },
  { value: "leadership", label: "Leadership" },
  { value: "system-design", label: "System Design" },
  { value: "coding", label: "Coding" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
];

export function CategoryFilter({
  value,
  onChange,
}: {
  value: QuestionCategory | "all";
  onChange: (value: QuestionCategory | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            value === c.value
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-muted-foreground hover:bg-muted/50",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
