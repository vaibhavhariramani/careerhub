"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input, Label } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepEducation() {
  const education = useResumeBuilderStore((s) => s.data.education);
  const addEducation = useResumeBuilderStore((s) => s.addEducation);
  const updateEducation = useResumeBuilderStore((s) => s.updateEducation);
  const removeEducation = useResumeBuilderStore((s) => s.removeEducation);

  return (
    <div className="flex flex-col gap-4">
      {education.map((edu, idx) => (
        <Card key={edu.id}>
          <CardContent className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
            <div className="flex items-center justify-between sm:col-span-2">
              <p className="text-sm font-semibold">Education #{idx + 1}</p>
              <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} aria-label="Remove">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
            <div>
              <Label>School</Label>
              <Input value={edu.school} onChange={(e) => updateEducation(edu.id, { school: e.target.value })} />
            </div>
            <div>
              <Label>Degree</Label>
              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="Bachelor of Science" />
            </div>
            <div>
              <Label>Field of study</Label>
              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} placeholder="Computer Science" />
            </div>
            <div>
              <Label>GPA (optional)</Label>
              <Input value={edu.gpa} onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} />
            </div>
            <div>
              <Label>Start date</Label>
              <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} placeholder="Aug 2019" />
            </div>
            <div>
              <Label>End date</Label>
              <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} placeholder="May 2023" />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-fit">
        <Plus className="h-4 w-4" /> Add education
      </Button>
    </div>
  );
}
