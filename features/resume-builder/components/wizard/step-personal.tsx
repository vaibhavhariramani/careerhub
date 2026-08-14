"use client";

import { Input, Label } from "@/shared/components/ui/input";
import { useResumeBuilderStore } from "@/features/resume-builder/store";

export function StepPersonal() {
  const contact = useResumeBuilderStore((s) => s.data.contact);
  const updateContact = useResumeBuilderStore((s) => s.updateContact);

  const fields: { key: keyof typeof contact; label: string; type?: string; placeholder: string }[] = [
    { key: "fullName", label: "Full name", placeholder: "Jane Doe" },
    { key: "email", label: "Email", type: "email", placeholder: "jane@email.com" },
    { key: "phone", label: "Phone", type: "tel", placeholder: "+1 555 123 4567" },
    { key: "location", label: "Location", placeholder: "San Francisco, CA" },
    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/janedoe" },
    { key: "github", label: "GitHub", placeholder: "github.com/janedoe" },
    { key: "portfolio", label: "Portfolio", placeholder: "janedoe.dev" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.key === "fullName" ? "sm:col-span-2" : undefined}>
          <Label htmlFor={f.key}>{f.label}</Label>
          <Input
            id={f.key}
            type={f.type ?? "text"}
            placeholder={f.placeholder}
            value={contact[f.key] ?? ""}
            onChange={(e) => updateContact({ [f.key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
