import type { ScanResult } from "@/core/types/scan";

export function ReportPrintArea({ result }: { result: ScanResult }) {
  return (
    <div className="print-area hidden print:block">
      <h1 className="text-2xl font-bold">CareerHub ATS Report</h1>
      <p className="text-sm text-muted-foreground">{result.fileName}</p>
      <h2 className="mt-6 text-lg font-semibold">Overall Score: {result.overallScore} / 100</h2>

      <h3 className="mt-6 text-base font-semibold">Breakdown</h3>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {result.categories.map((c) => (
          <li key={c.id}>
            {c.label}: {Math.round(c.score)}/100 — {c.notes[0]}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-base font-semibold">Missing Sections</h3>
      <p className="text-sm">
        {result.missingSections.length ? result.missingSections.join(", ") : "None detected."}
      </p>

      <h3 className="mt-6 text-base font-semibold">Missing Keywords</h3>
      <p className="text-sm">
        {result.missingKeywords.length ? result.missingKeywords.join(", ") : "None — select a role above for keyword matching."}
      </p>

      <h3 className="mt-6 text-base font-semibold">Suggestions</h3>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {result.suggestions.map((s) => (
          <li key={s.id}>
            Instead of &ldquo;{s.weak}&rdquo; try &ldquo;{s.better}&rdquo;
          </li>
        ))}
      </ul>
    </div>
  );
}
