"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input, Label } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepCertifications() {
  const certifications = useResumeBuilderStore((s) => s.data.certifications);
  const addCertification = useResumeBuilderStore((s) => s.addCertification);
  const updateCertification = useResumeBuilderStore((s) => s.updateCertification);
  const removeCertification = useResumeBuilderStore((s) => s.removeCertification);

  return (
    <div className="flex flex-col gap-4">
      {certifications.map((c, idx) => (
        <Card key={c.id}>
          <CardContent className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-3">
            <div className="flex items-center justify-between sm:col-span-3">
              <p className="text-sm font-semibold">Certification #{idx + 1}</p>
              <Button variant="ghost" size="icon" onClick={() => removeCertification(c.id)} aria-label="Remove">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
            <div>
              <Label>Name</Label>
              <Input value={c.name} onChange={(e) => updateCertification(c.id, { name: e.target.value })} />
            </div>
            <div>
              <Label>Issuer</Label>
              <Input value={c.issuer} onChange={(e) => updateCertification(c.id, { issuer: e.target.value })} />
            </div>
            <div>
              <Label>Date</Label>
              <Input value={c.date} onChange={(e) => updateCertification(c.id, { date: e.target.value })} placeholder="Jun 2024" />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addCertification} className="w-fit">
        <Plus className="h-4 w-4" /> Add certification
      </Button>
    </div>
  );
}
