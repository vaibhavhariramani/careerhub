"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ROLES } from "@/core/config/roles";
import { useResumeScannerStore } from "@/features/resume-scanner/store";
import { scoreResume } from "@/features/resume-scanner/lib/scoring";
import type { ScanResult } from "@/core/types/scan";

export function KeywordScanner({ result }: { result: ScanResult }) {
  const { role, setRole, jobDescription, setJobDescription, setResult } = useResumeScannerStore();
  const [jdDraft, setJdDraft] = useState(jobDescription);

  const applyJobDescription = (value: string) => {
    setJobDescription(value);
    setResult(scoreResume(result.rawText, result.fileName, role, value));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Scanner</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Paste a job description for precise keyword matching
          </span>
          <Textarea
            value={jdDraft}
            onChange={(e) => setJdDraft(e.target.value)}
            placeholder="Paste the full job posting here…"
            className="min-h-32"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              disabled={jdDraft.trim() === jobDescription.trim()}
              onClick={() => applyJobDescription(jdDraft)}
            >
              Match against this description
            </Button>
            {jobDescription && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setJdDraft("");
                  applyJobDescription("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {jobDescription ? "Or compare against a role instead" : "Target role"}
          </span>
          <Select
            value={role ?? undefined}
            onValueChange={(value) => {
              setRole(value as typeof role);
              setResult(scoreResume(result.rawText, result.fileName, value as typeof role, jobDescription));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role to compare against" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {jobDescription && (
            <p className="text-xs text-muted-foreground">
              A job description is active, so keyword matching uses it instead of the role list.
            </p>
          )}
        </div>

        {result.matchedKeywords.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Matched ({result.matchedKeywords.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedKeywords.map((k) => (
                <Badge key={k} variant="success">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {result.missingKeywords.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Missing ({result.missingKeywords.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.missingKeywords.slice(0, 20).map((k) => (
                <Badge key={k} variant="danger">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
