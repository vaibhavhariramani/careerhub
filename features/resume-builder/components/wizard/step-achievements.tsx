"use client";

import { Plus, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepAchievements() {
  const achievements = useResumeBuilderStore((s) => s.data.achievements);
  const setAchievements = useResumeBuilderStore((s) => s.setAchievements);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">Awards, recognitions, or notable wins.</p>
      {achievements.map((a, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={a}
            placeholder="Winner, University Hackathon 2023"
            onChange={(e) => {
              const next = [...achievements];
              next[i] = e.target.value;
              setAchievements(next);
            }}
          />
          <Button variant="ghost" size="icon" onClick={() => setAchievements(achievements.filter((_, idx) => idx !== i))} aria-label="Remove">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-fit" onClick={() => setAchievements([...achievements, ""])}>
        <Plus className="h-4 w-4" /> Add achievement
      </Button>
    </div>
  );
}
