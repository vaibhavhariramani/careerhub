"use client";

import { Sparkles } from "lucide-react";
import { Label, Textarea } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepSummary() {
  const summary = useResumeBuilderStore((s) => s.data.summary);
  const skills = useResumeBuilderStore((s) => s.data.skills);
  const updateSummary = useResumeBuilderStore((s) => s.updateSummary);

  const generate = () => {
    const topSkills = skills.technical.slice(0, 3).join(", ") || "your core skills";
    updateSummary(
      `I am a motivated professional with hands-on experience in ${topSkills}. I enjoy solving real problems and delivering measurable results, and I'm looking for an opportunity to grow while contributing to a team that values quality and impact.`,
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        A 2-3 sentence pitch. Try: &ldquo;I am a Flutter Developer with...&rdquo;
      </p>
      <Label htmlFor="summary">Career summary</Label>
      <Textarea
        id="summary"
        rows={6}
        placeholder="I am a..."
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
      />
      <Button variant="outline" size="sm" className="w-fit" onClick={generate}>
        <Sparkles className="h-4 w-4" /> Auto-generate a starting point
      </Button>
    </div>
  );
}
