import { Upload, BarChart3, Sparkles } from "lucide-react";
import { Reveal } from "@/shared/components/marketing/reveal";

const steps = [
  {
    icon: Upload,
    title: "Upload or build",
    description: "Drop in your existing resume or start fresh with the guided builder.",
  },
  {
    icon: BarChart3,
    title: "Get scored instantly",
    description: "See your ATS score, missing sections, and role-matched keywords in seconds.",
  },
  {
    icon: Sparkles,
    title: "Apply with confidence",
    description: "Fix what matters, prep for interviews, then find and track real job openings.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-card">
                <s.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
