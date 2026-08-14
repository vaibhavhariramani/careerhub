import { ResumeDocument } from "./resume-document";
import type { ResumeData } from "@/core/types/resume";

export function LivePreview({ data }: { data: ResumeData }) {
  return (
    <div className="overflow-auto rounded-lg border border-border bg-muted/40 p-4">
      <div
        className="print-area mx-auto rounded-sm shadow-popover"
        style={{ width: "8.5in", maxWidth: "100%" }}
      >
        <ResumeDocument data={data} />
      </div>
    </div>
  );
}
