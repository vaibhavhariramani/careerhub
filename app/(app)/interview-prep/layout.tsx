import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "Industry-specific interview guides, a mock interview runner, and a STAR method trainer to help you prepare for your next interview.",
  alternates: { canonical: "/interview-prep" },
};

export default function InterviewPrepLayout({ children }: { children: React.ReactNode }) {
  return children;
}
