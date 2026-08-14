"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { buildEnhancedResumeData } from "@/features/resume-scanner/lib/extract-structured";
import { useResumeBuilderStore } from "@/features/resume-builder/store";
import { useProfileStore } from "@/features/profile/store";
import type { ScanResult } from "@/core/types/scan";

function hasExistingDraft(data: ReturnType<typeof useResumeBuilderStore.getState>["data"]) {
  return Boolean(
    data.contact.fullName ||
      data.summary ||
      data.experience.length ||
      data.education.length ||
      data.projects.length,
  );
}

export function EnhanceRebuildButton({ result }: { result: ScanResult }) {
  const router = useRouter();
  const loadResumeData = useResumeBuilderStore((s) => s.loadResumeData);
  const { logActivity, unlockAchievement } = useProfileStore();
  const [working, setWorking] = useState(false);

  const handleClick = () => {
    const existing = useResumeBuilderStore.getState().data;
    if (
      hasExistingDraft(existing) &&
      !window.confirm(
        "This will replace your current Resume Builder draft with an improved version built from this scan. Continue?",
      )
    ) {
      return;
    }

    setWorking(true);
    const enhanced = buildEnhancedResumeData(result);
    loadResumeData(enhanced);
    logActivity({
      type: "resume",
      message: `Rebuilt "${result.fileName}" as an editable, improved CV`,
    });
    unlockAchievement("resume-built");
    router.push("/resume-builder");
  };

  return (
    <Button onClick={handleClick} disabled={working}>
      {working ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
      Enhance & Build Editable CV
    </Button>
  );
}
