"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ScanSearch, FileEdit, MessagesSquare, Briefcase } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const ctas = [
  { label: "Upload Resume", href: "/resume-scanner", icon: ScanSearch, primary: true },
  { label: "Build Resume", href: "/resume-builder", icon: FileEdit },
  { label: "Find Jobs", href: "/jobs", icon: Briefcase },
  { label: "Prepare Interview", href: "/interview-prep", icon: MessagesSquare },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 lg:px-8 lg:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center"
      >
        <div className="h-[420px] w-[720px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Free ATS resume scanner — no sign-up required
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Build Your Dream Career.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          Everything you need to land your next internship or job in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {ctas.map((cta) => (
            <Button
              key={cta.href}
              asChild
              size="lg"
              variant={cta.primary ? "primary" : "outline"}
            >
              <Link href={cta.href}>
                <cta.icon className="h-4 w-4" />
                {cta.label}
                {cta.primary && <ArrowRight className="h-4 w-4" />}
              </Link>
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
