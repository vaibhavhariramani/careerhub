import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ATS Resume Scanner",
  description:
    "Scan your resume against ATS best practices for free. Get an instant score, missing-section checks, keyword matching against a job description, and rewrite suggestions — all in your browser.",
  alternates: { canonical: "/resume-scanner" },
};

export default function ResumeScannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
