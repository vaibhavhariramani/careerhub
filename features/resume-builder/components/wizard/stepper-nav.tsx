"use client";

import { Check } from "lucide-react";
import { WIZARD_STEPS, useResumeBuilderStore } from "@/features/resume-builder/store";
import { cn } from "@/shared/lib/cn";

const LABELS: Record<(typeof WIZARD_STEPS)[number], string> = {
  personal: "Personal",
  summary: "Summary",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
  achievements: "Achievements",
  interests: "Interests",
};

export function StepperNav() {
  const step = useResumeBuilderStore((s) => s.step);
  const setStep = useResumeBuilderStore((s) => s.setStep);

  return (
    <ol className="flex flex-wrap gap-1.5">
      {WIZARD_STEPS.map((key, i) => {
        const state = i < step ? "done" : i === step ? "current" : "upcoming";
        return (
          <li key={key}>
            <button
              onClick={() => setStep(i)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                state === "current" && "border-accent bg-accent-soft text-accent",
                state === "done" && "border-success/40 bg-success-soft text-success",
                state === "upcoming" && "border-border text-muted-foreground hover:bg-muted/50",
              )}
            >
              {state === "done" ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              {LABELS[key]}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
