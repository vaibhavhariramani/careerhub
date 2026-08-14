"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { UploadDropzone } from "@/features/resume-scanner/components/upload-dropzone";
import { ScoreGauge } from "@/features/resume-scanner/components/score-gauge";
import { CategoryBreakdown } from "@/features/resume-scanner/components/category-breakdown";
import { ResumeHeatmap } from "@/features/resume-scanner/components/resume-heatmap";
import { AtsChecklist } from "@/features/resume-scanner/components/ats-checklist";
import { SuggestionsList } from "@/features/resume-scanner/components/suggestions-list";
import { KeywordScanner } from "@/features/resume-scanner/components/keyword-scanner";
import { MissingSections } from "@/features/resume-scanner/components/missing-sections";
import { ExportReportButton } from "@/features/resume-scanner/components/export-report-button";
import { ReportPrintArea } from "@/features/resume-scanner/components/report-print-area";
import { EnhanceRebuildCard } from "@/features/resume-scanner/components/enhance-rebuild-card";
import { useResumeScannerStore } from "@/features/resume-scanner/store";

export default function ResumeScannerPage() {
  const { result, error, reset } = useResumeScannerStore();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ATS Resume Scanner</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Free, private, and instant — your file is parsed entirely in your browser.
          </p>
        </div>
        {result && (
          <div className="flex flex-wrap gap-2 print:hidden">
            <ExportReportButton />
            <Button variant="ghost" onClick={reset}>
              Scan another
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 rounded-md border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 print:hidden"
          >
            <UploadDropzone />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 gap-5 print:hidden lg:grid-cols-3"
          >
            <div className="flex flex-col gap-5 lg:col-span-1">
              <ScoreGauge result={result} />
              <EnhanceRebuildCard result={result} />
              <MissingSections result={result} />
              <KeywordScanner result={result} />
            </div>
            <div className="flex flex-col gap-5 lg:col-span-2">
              <CategoryBreakdown categories={result.categories} />
              <ResumeHeatmap categories={result.categories} />
              <AtsChecklist result={result} />
              <SuggestionsList suggestions={result.suggestions} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {result && <ReportPrintArea result={result} />}
    </div>
  );
}
