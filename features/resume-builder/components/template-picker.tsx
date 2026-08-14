"use client";

import { Check } from "lucide-react";
import { TEMPLATES } from "@/features/resume-builder/lib/templates-config";
import { useResumeBuilderStore } from "@/features/resume-builder/store";
import { cn } from "@/shared/lib/cn";

export function TemplatePicker() {
  const templateId = useResumeBuilderStore((s) => s.data.templateId);
  const setTemplate = useResumeBuilderStore((s) => s.setTemplate);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {TEMPLATES.map((t) => {
        const active = t.id === templateId;
        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={cn(
              "flex flex-col items-start gap-1 rounded-md border p-3 text-left transition-colors",
              active ? "border-accent bg-accent-soft" : "border-border hover:bg-muted/50",
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: t.accent }}
                aria-hidden
              />
              {active && <Check className="h-3.5 w-3.5 text-accent" />}
            </div>
            <span className="text-xs font-semibold">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
