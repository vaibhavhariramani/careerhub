import Link from "next/link";
import { Briefcase, FileEdit, MessagesSquare, ScanSearch } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";

const ACTIONS = [
  { href: "/resume-scanner", label: "Scan Resume", icon: ScanSearch },
  { href: "/resume-builder", label: "Build Resume", icon: FileEdit },
  { href: "/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/interview-prep", label: "Prepare Interview", icon: MessagesSquare },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ACTIONS.map((a) => (
        <Link key={a.href} href={a.href}>
          <Card className="transition-transform hover:-translate-y-0.5">
            <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <a.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium">{a.label}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
