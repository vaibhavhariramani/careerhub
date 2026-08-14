"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilderStore } from "@/features/resume-builder/store";
import { exportResumeToDocx } from "@/features/resume-builder/lib/export-docx";
import { useProfileStore } from "@/features/profile/store";

export function ExportButtons() {
  const data = useResumeBuilderStore((s) => s.data);
  const { logActivity, unlockAchievement } = useProfileStore();
  const [exporting, setExporting] = useState(false);

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => window.print()}>
        <Download className="h-4 w-4" /> PDF
      </Button>
      <Button
        variant="outline"
        disabled={exporting}
        onClick={async () => {
          setExporting(true);
          try {
            await exportResumeToDocx(data);
            logActivity({ type: "resume", message: "Exported resume as DOCX" });
            unlockAchievement("resume-built");
          } finally {
            setExporting(false);
          }
        }}
      >
        {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        DOCX
      </Button>
    </div>
  );
}
