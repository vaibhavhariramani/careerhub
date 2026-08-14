"use client";

import { Download } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function ExportReportButton() {
  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Download className="h-4 w-4" />
      Export Report (PDF)
    </Button>
  );
}
