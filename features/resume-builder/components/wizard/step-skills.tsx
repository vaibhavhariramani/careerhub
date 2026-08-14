"use client";

import { Input, Label } from "@/shared/components/ui/input";
import { useResumeBuilderStore } from "@/features/resume-builder/store";
import type { SkillGroup } from "@/core/types/resume";

const GROUPS: { key: keyof SkillGroup; label: string; placeholder: string }[] = [
  { key: "technical", label: "Technical Skills", placeholder: "React, TypeScript, Node.js" },
  { key: "tools", label: "Tools", placeholder: "Git, Docker, Figma" },
  { key: "languages", label: "Languages", placeholder: "English, Spanish" },
  { key: "soft", label: "Soft Skills", placeholder: "Communication, Leadership" },
];

export function StepSkills() {
  const skills = useResumeBuilderStore((s) => s.data.skills);
  const updateSkills = useResumeBuilderStore((s) => s.updateSkills);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Separate each skill with a comma.</p>
      {GROUPS.map((g) => (
        <div key={g.key}>
          <Label>{g.label}</Label>
          <Input
            defaultValue={skills[g.key].join(", ")}
            placeholder={g.placeholder}
            onBlur={(e) =>
              updateSkills({
                [g.key]: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
