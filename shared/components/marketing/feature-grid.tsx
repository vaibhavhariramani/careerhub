import {
  ScanSearch,
  FileEdit,
  MessagesSquare,
  Library,
  Briefcase,
  Moon,
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Reveal } from "@/shared/components/marketing/reveal";

const features = [
  {
    icon: ScanSearch,
    title: "ATS Resume Scanner",
    description:
      "Upload a PDF, DOCX, or TXT resume and get an instant 0–100 ATS score with a full breakdown — free, fully client-side, no AI API.",
  },
  {
    icon: FileEdit,
    title: "Resume Builder",
    description:
      "A guided, beginner-friendly wizard with 7 ATS-friendly templates, live preview, and PDF/DOCX export.",
  },
  {
    icon: MessagesSquare,
    title: "Interview Prep",
    description:
      "Industry-specific guides, mock interviews, and an interactive STAR method trainer across 10 industries.",
  },
  {
    icon: Library,
    title: "Question Bank",
    description:
      "A huge, searchable, bookmarkable database of technical, behavioral, and HR interview questions.",
  },
  {
    icon: Briefcase,
    title: "Job Search",
    description:
      "Real listings aggregated from free, public job APIs — filter by remote, visa sponsorship, and more.",
  },
  {
    icon: Moon,
    title: "Built for focus",
    description:
      "A fast, distraction-free, offline-friendly interface with full dark mode — inspired by the tools you already love.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything for your job search, in one app
        </h2>
        <p className="mt-3 text-muted-foreground">
          No clutter, no paid tiers gating the essentials — just the tools that move your
          application forward.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Card className="h-full transition-transform hover:-translate-y-1">
              <CardContent className="pt-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
