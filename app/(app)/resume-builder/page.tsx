"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { WizardShell } from "@/features/resume-builder/components/wizard/wizard-shell";
import { LivePreview } from "@/features/resume-builder/components/live-preview";
import { TemplatePicker } from "@/features/resume-builder/components/template-picker";
import { SectionReorder } from "@/features/resume-builder/components/section-reorder";
import { ExportButtons } from "@/features/resume-builder/components/export-buttons";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export default function ResumeBuilderPage() {
  const data = useResumeBuilderStore((s) => s.data);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the guided steps — your resume updates live on the right.
          </p>
        </div>
        <ExportButtons />
      </div>

      <div className="mt-6 flex flex-col gap-5 print:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Template</CardTitle>
          </CardHeader>
          <CardContent>
            <TemplatePicker />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <WizardShell />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Section order</CardTitle>
              </CardHeader>
              <CardContent>
                <SectionReorder />
              </CardContent>
            </Card>
            <div>
              <p className="mb-2 text-sm font-semibold">Live preview</p>
              <LivePreview data={data} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        <LivePreview data={data} />
      </div>
    </div>
  );
}
