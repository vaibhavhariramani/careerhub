"use client";

import { Input, Label } from "@/shared/components/ui/input";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepInterests() {
  const interests = useResumeBuilderStore((s) => s.data.interests);
  const setInterests = useResumeBuilderStore((s) => s.setInterests);

  return (
    <div>
      <Label>Interests</Label>
      <p className="mb-2 text-sm text-muted-foreground">Separate each interest with a comma.</p>
      <Input
        defaultValue={interests.join(", ")}
        placeholder="Photography, Chess, Open Source"
        onBlur={(e) =>
          setInterests(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
      />
    </div>
  );
}
