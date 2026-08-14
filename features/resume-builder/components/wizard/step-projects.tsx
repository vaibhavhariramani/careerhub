"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input, Label, Textarea } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepProjects() {
  const projects = useResumeBuilderStore((s) => s.data.projects);
  const addProject = useResumeBuilderStore((s) => s.addProject);
  const updateProject = useResumeBuilderStore((s) => s.updateProject);
  const removeProject = useResumeBuilderStore((s) => s.removeProject);

  return (
    <div className="flex flex-col gap-4">
      {projects.map((p, idx) => (
        <Card key={p.id}>
          <CardContent className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
            <div className="flex items-center justify-between sm:col-span-2">
              <p className="text-sm font-semibold">Project #{idx + 1}</p>
              <Button variant="ghost" size="icon" onClick={() => removeProject(p.id)} aria-label="Remove">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
            <div>
              <Label>Project name</Label>
              <Input value={p.name} onChange={(e) => updateProject(p.id, { name: e.target.value })} />
            </div>
            <div>
              <Label>Tech stack</Label>
              <Input value={p.techStack} onChange={(e) => updateProject(p.id, { techStack: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea value={p.description} onChange={(e) => updateProject(p.id, { description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input value={p.github} onChange={(e) => updateProject(p.id, { github: e.target.value })} />
            </div>
            <div>
              <Label>Live demo</Label>
              <Input value={p.liveDemo} onChange={(e) => updateProject(p.id, { liveDemo: e.target.value })} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addProject} className="w-fit">
        <Plus className="h-4 w-4" /> Add project
      </Button>
    </div>
  );
}
