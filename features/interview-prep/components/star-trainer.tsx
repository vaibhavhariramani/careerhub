"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input, Label, Textarea } from "@/shared/components/ui/input";
import { useInterviewPrepStore } from "@/features/interview-prep/store";

const FIELDS: { key: "situation" | "task" | "action" | "result"; label: string; hint: string }[] = [
  { key: "situation", label: "Situation", hint: "What was the context? Set the scene briefly." },
  { key: "task", label: "Task", hint: "What was your specific responsibility or goal?" },
  { key: "action", label: "Action", hint: "What did you specifically do? Use 'I', not 'we'." },
  { key: "result", label: "Result", hint: "What was the measurable outcome? Quantify if possible." },
];

export function StarTrainer() {
  const starEntries = useInterviewPrepStore((s) => s.starEntries);
  const saveStarEntry = useInterviewPrepStore((s) => s.saveStarEntry);
  const deleteStarEntry = useInterviewPrepStore((s) => s.deleteStarEntry);

  const [title, setTitle] = useState("");
  const [values, setValues] = useState({ situation: "", task: "", action: "", result: "" });

  const canSave = title.trim() && Object.values(values).every((v) => v.trim());

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>STAR Method Trainer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Story title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Turned around a failing project" />
          </div>
          {FIELDS.map((f) => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              <p className="mb-1 text-xs text-muted-foreground">{f.hint}</p>
              <Textarea
                rows={3}
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            </div>
          ))}
          <Button
            className="w-fit"
            disabled={!canSave}
            onClick={() => {
              saveStarEntry({ title, ...values });
              setTitle("");
              setValues({ situation: "", task: "", action: "", result: "" });
            }}
          >
            <Save className="h-4 w-4" /> Save story
          </Button>
        </CardContent>
      </Card>

      {starEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved stories ({starEntries.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {starEntries.map((entry) => (
              <div key={entry.id} className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{entry.title}</p>
                  <Button variant="ghost" size="icon" onClick={() => deleteStarEntry(entry.id)} aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-danger" />
                  </Button>
                </div>
                <dl className="mt-2 grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                  <div><dt className="font-medium text-foreground">Situation</dt><dd>{entry.situation}</dd></div>
                  <div><dt className="font-medium text-foreground">Task</dt><dd>{entry.task}</dd></div>
                  <div><dt className="font-medium text-foreground">Action</dt><dd>{entry.action}</dd></div>
                  <div><dt className="font-medium text-foreground">Result</dt><dd>{entry.result}</dd></div>
                </dl>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
