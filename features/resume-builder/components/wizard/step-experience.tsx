"use client";

import { Plus, Trash2, X } from "lucide-react";
import { Input, Label } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepExperience() {
  const experience = useResumeBuilderStore((s) => s.data.experience);
  const addExperience = useResumeBuilderStore((s) => s.addExperience);
  const updateExperience = useResumeBuilderStore((s) => s.updateExperience);
  const removeExperience = useResumeBuilderStore((s) => s.removeExperience);

  return (
    <div className="flex flex-col gap-4">
      {experience.map((exp, idx) => (
        <Card key={exp.id}>
          <CardContent className="flex flex-col gap-3 pt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Experience #{idx + 1}</p>
              <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} aria-label="Remove">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label>Company</Label>
                <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={exp.location} onChange={(e) => updateExperience(exp.id, { location: e.target.value })} />
              </div>
              <div className="flex items-end gap-2 pb-2">
                <Checkbox
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                />
                <span className="text-sm">I currently work here</span>
              </div>
              <div>
                <Label>Start date</Label>
                <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="Jan 2022" />
              </div>
              {!exp.current && (
                <div>
                  <Label>End date</Label>
                  <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Dec 2023" />
                </div>
              )}
            </div>

            <div>
              <Label>Achievements (bullet points)</Label>
              <div className="flex flex-col gap-2">
                {exp.achievements.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={line}
                      placeholder="Built a feature that increased X by Y%..."
                      onChange={(e) => {
                        const next = [...exp.achievements];
                        next[i] = e.target.value;
                        updateExperience(exp.id, { achievements: next });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateExperience(exp.id, {
                          achievements: exp.achievements.filter((_, idx2) => idx2 !== i),
                        })
                      }
                      aria-label="Remove line"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit"
                  onClick={() => updateExperience(exp.id, { achievements: [...exp.achievements, ""] })}
                >
                  <Plus className="h-4 w-4" /> Add bullet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-fit">
        <Plus className="h-4 w-4" /> Add experience
      </Button>
    </div>
  );
}
