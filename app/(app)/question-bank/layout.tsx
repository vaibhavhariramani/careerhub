import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Question Bank",
  description:
    "A searchable, bookmarkable database of technical, behavioral, and role-specific interview questions.",
  alternates: { canonical: "/question-bank" },
};

export default function QuestionBankLayout({ children }: { children: React.ReactNode }) {
  return children;
}
