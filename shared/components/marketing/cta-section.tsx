import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Reveal } from "@/shared/components/marketing/reveal";

export function CtaSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-center text-background">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-accent/30 blur-[100px]"
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to build your dream career?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-background/70">
            Scan your resume, build a new one, and start applying — all free, all in your browser.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/resume-scanner">
              Get your free ATS score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
