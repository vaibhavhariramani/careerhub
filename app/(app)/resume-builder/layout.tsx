import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder",
  description:
    "Build a professional, ATS-friendly resume with a guided step-by-step wizard, live preview, multiple templates, and PDF/DOCX export.",
  alternates: { canonical: "/resume-builder" },
};

export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
