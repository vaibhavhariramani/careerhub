import { Star } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Avatar } from "@/shared/components/ui/avatar";
import { Reveal } from "@/shared/components/marketing/reveal";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "New Grad, Computer Science",
    quote:
      "The scanner caught three missing sections I didn't even know ATS systems looked for. My interview callback rate doubled.",
  },
  {
    name: "Daniel Ortiz",
    role: "Career Switcher → Data Analyst",
    quote:
      "The resume builder made it painless to go from a blank page to a polished, ATS-friendly resume in one sitting.",
  },
  {
    name: "Amaka Obi",
    role: "Frontend Developer Intern",
    quote:
      "The STAR method trainer alone was worth it — I walked into my interview actually prepared for behavioral questions.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by job seekers</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Illustrative feedback from early users of the CareerHub workflow.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <Card className="h-full">
              <CardContent className="pt-5">
                <div className="mb-3 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={t.name} size={36} />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
