"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";
import { useResumeBuilderStore } from "@/features/resume-builder/store";
import { cn } from "@/shared/lib/cn";

const LABELS: Record<string, string> = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  achievements: "Achievements",
  interests: "Interests",
};

export function SectionReorder() {
  const sectionOrder = useResumeBuilderStore((s) => s.data.sectionOrder);
  const reorderSections = useResumeBuilderStore((s) => s.reorderSections);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...sectionOrder];
    const [moved] = next.splice(dragIndex, 1);
    if (moved) next.splice(targetIndex, 0, moved);
    reorderSections(next);
    setDragIndex(null);
  };

  return (
    <ul className="flex flex-col gap-1.5">
      {sectionOrder.map((id, index) => (
        <li
          key={id}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          className={cn(
            "flex cursor-grab items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm active:cursor-grabbing",
            dragIndex === index && "opacity-50",
          )}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          {LABELS[id] ?? id}
        </li>
      ))}
    </ul>
  );
}
