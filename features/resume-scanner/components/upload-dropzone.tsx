"use client";

import { useCallback, useRef, useState } from "react";
import { FileUp, Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { parseResumeFile, UnsupportedFileError } from "@/features/resume-scanner/lib/parse-resume";
import { scoreResume } from "@/features/resume-scanner/lib/scoring";
import { useResumeScannerStore } from "@/features/resume-scanner/store";
import { useProfileStore } from "@/features/profile/store";

const ACCEPTED = [".pdf", ".docx", ".txt"];

export function UploadDropzone() {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { role, jobDescription, status, setStatus, setResult, setError } = useResumeScannerStore();
  const { logActivity, unlockAchievement } = useProfileStore();

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setStatus("parsing");
      try {
        const rawText = await parseResumeFile(file);
        if (!rawText.trim()) {
          throw new Error("We couldn't extract any text from this file. Try a different export.");
        }
        setStatus("scoring");
        const result = scoreResume(rawText, file.name, role, jobDescription);
        setResult(result);
        logActivity({ type: "scan", message: `Scanned "${file.name}" — scored ${result.overallScore}/100` });
        unlockAchievement("first-scan");
      } catch (err) {
        const message =
          err instanceof UnsupportedFileError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Something went wrong while scanning your resume.";
        setError(message);
      }
    },
    [role, jobDescription, setError, setStatus, setResult, logActivity, unlockAchievement],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const busy = status === "parsing" || status === "scoring";

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => !busy && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-16 text-center transition-colors",
        dragging ? "border-accent bg-accent-soft" : "border-border hover:border-accent/50 hover:bg-muted/40",
        busy && "pointer-events-none opacity-70",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
      {busy ? (
        <>
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="mt-4 text-sm font-medium">
            {status === "parsing" ? "Reading your resume…" : "Scoring against ATS best practices…"}
          </p>
        </>
      ) : (
        <>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <UploadCloud className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-semibold">Drag & drop your resume here</p>
          <p className="mt-1 text-xs text-muted-foreground">or click to browse — PDF, DOCX, or TXT</p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileUp className="h-3.5 w-3.5" /> Nothing leaves your browser
          </div>
        </>
      )}
    </div>
  );
}
