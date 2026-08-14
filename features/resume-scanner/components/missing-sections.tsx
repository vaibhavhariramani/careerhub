import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import type { ScanResult } from "@/core/types/scan";

export function MissingSections({ result }: { result: ScanResult }) {
  if (!result.missingSections.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Missing Sections
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {result.missingSections.map((s) => (
          <Badge key={s} variant="warning">
            {s}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
